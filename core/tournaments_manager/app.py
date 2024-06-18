"""Tournament Manager API"""
import fastapi
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy.orm as orm

from core.tournaments_manager import db as tournaments_db
from core.tournaments_manager import schemas
from common import auth as auth_lib
from common import db as db_lib
from common import custom_logging
from common import images

logger = custom_logging.custom_logging(__name__)

app = fastapi.FastAPI(
    title='Tournament Manager API',
    prefix='/api/tournaments',
    root_path='/api/tournaments',
)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def read_root():
    """Root endpoint
    Returns:
        dict: Welcome message
    """
    return {'message': 'Welcome to the Tournament Manager API!'}


@app.get('/tournaments')
def get_tournaments(
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> list[schemas.Tournament]:
    """Get all tournaments
    Args:
        sess (orm.Session): Database session
    Returns:
        list[schemas.Tournament]: List of tournaments
    """
    #TODO: Figure out how to get images
    tournaments = tournaments_db.get_tournaments(session=sess)
    for tournament in tournaments:
        tournament.images = [images.upload(image) for image in tournament.images]
    return tournaments

@app.get('/tournaments/{tournament_id}')
def get_tournament(
    tournament_id: int,
    db: orm.Session = fastapi.Depends(db_lib.get_db),
) -> schemas.Tournament | None:
    """Get a tournament by ID
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    Returns:
        schemas.Tournament: Tournament object
    """

    tournament = tournaments_db.get_tournament_by_id(db, tournament_id)
    tournament.images = [images.upload(image) for image in tournament.images]
    return tournament


@app.post('/tournaments')
def create_tournament(
        schema: schemas.TournamentDisplay,
        db: orm.Session = fastapi.Depends(db_lib.get_db),
        organizer_id: int = fastapi.Depends(auth_lib.get_user_id),
):
    """Create a new tournament
    Args:
        schema (schemas.TournamentDisplay): Tournament data
        db (orm.Session): Database session
        organizer_id (int): Organizer ID
    Returns:
        dict: Success message
    """
    #Download data if needed
    if schema.images:
        schema.images = [images.download(image) for image in schema.images]
    tournament = schemas.TournamentCreate(organizer_id=organizer_id,
                                          **schema.model_dump())
    tournaments_db.add_tournament(db, tournament)
    return {'message': f'Tournament created! {schema.images}'}


@app.patch('/tournaments/{tournament_id}')
def update_tournament(tournament_id: int,
                      schema: schemas.TournamentDisplay,
                      db: orm.Session = fastapi.Depends(db_lib.get_db),
                      user_id: int = fastapi.Depends(auth_lib.get_user_id)):
    """Update a tournament
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    """
    tournament = tournaments_db.update_tournament(session=db,
                                                  tournament_id=tournament_id,
                                                  new_tournament=schema,
                                                  user_id=user_id)
    return ({
        'message': f'Tournament {tournament_id} updated!'
    } if tournament else {
        'message':
        f'Tournament {tournament_id} not found or user {user_id} is not the organizer'
    })


@app.delete('/tournaments/{tournament_id}')
def delete_tournament(
        tournament_id: int,
        db: orm.Session = fastapi.Depends(db_lib.get_db),
        user_id: int = fastapi.Depends(auth_lib.get_user_id),
):
    """Delete a tournament
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    Returns:
        dict: Success message
    """
    tournaments_db.delete_tournament(
        db,
        tournament_id,
        user_id=user_id,
    )
    return {'message': 'Tournament deleted!'}


### Tournament status ###


@app.put('/tournaments/{tournament_id}/fill', tags=['status'])
def fill_tournament(
        tournament_id: int,
        user_id: int = fastapi.Depends(auth_lib.get_user_id),
        db: orm.Session = fastapi.Depends(db_lib.get_db),
):
    """Fill tournament teams
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    Returns:
        dict: Success message
    """
    tournament = tournaments_db.fill_tournament(
        db,
        tournament_id,
        user_id=user_id,
    )
    return ({
        'message': f'Tournament {tournament_id} teams {user_id} filled!'
    } if tournament else {
        'message':
        f'Error: adding user {user_id} in tournament {tournament_id}.'
    })


@app.put('/tournaments/{tournament_id}/remove_team', tags=['status'])
def remove_team(
        tournament_id: int,
        user_id: int = fastapi.Depends(auth_lib.get_user_id),
        db: orm.Session = fastapi.Depends(db_lib.get_db),
):
    """Remove a team from a tournament
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    Returns:
        dict: Success message
    """
    #TODO: Get team from user_id
    tournament = tournaments_db.remove_team(db, tournament_id, user_id)
    if tournament is None:
        return {'message': f'Error user {user_id} cannot be removed'}
    return {
        'message':
        f'Participant {user_id} removed from tournament {tournament_id}!'
    }
