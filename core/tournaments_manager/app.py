"""Tournament Manager API"""
import fastapi
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy.orm as orm

from core.tournaments_manager import db as tournaments_db
from core.tournaments_manager import schemas
from common import db as db_lib
from common import auth as auth_lib


app = fastapi.FastAPI(title='Tournament Manager API',
                      tags=['tournament'],
                      prefix='/api/tournaments',
                      openapi_prefix='/api/tournaments',
                      docs_prefix='/api/tournaments',
                      )

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
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
def get_tournaments(sess: orm.Session = fastapi.Depends(db_lib.get_db)) -> list[schemas.Tournament]:
    """Get all tournaments
    Args:
        sess (orm.Session): Database session
    Returns:
        list[schemas.Tournament]: List of tournaments
    """
    return tournaments_db.get_tournaments(session=sess)

@app.get('/tournaments/{tournament_id}')
def get_tournament(
        tournament_id: int,
        db: orm.Session = fastapi.Depends(db_lib.get_db),
) -> schemas.Tournament:
    """Get a tournament by ID
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    Returns:
        schemas.Tournament: Tournament object
    """
    return tournaments_db.get_tournament_by_id(db, tournament_id)

@app.post('/tournaments')
def create_tournament(schema: schemas.TournamentDisplay,
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
    tournament = schemas.TournamentCreate(organizer_id=organizer_id, **schema.model_dump())
    tournaments_db.add_tournament(db, tournament)
    return {'message': 'Tournament created!'}

@app.put('/tournaments/{tournament_id}')
def update_tournament(
        tournament_id: int,
        schema: schemas.TournamentDisplay,
        db: orm.Session = fastapi.Depends(db_lib.get_db),
):
    """Update a tournament
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    """
    tournaments_db.update_tournament(session=db,
                                     tournament_id=tournament_id,
                                     tournament=schema,
                                    )
    return {'message': f'Tournament {tournament_id} updated!'}

@app.delete('/tournaments/{tournament_id}')
def delete_tournament(tournament_id: int, db: orm.Session = fastapi.Depends(db_lib.get_db)):
    """Delete a tournament
    Args:
        tournament_id (int): Tournament ID
        db (orm.Session): Database session
    Returns:
        dict: Success message
    """
    tournaments_db.delete_tournament(db, tournament_id)
    return {'message': 'Tournament deleted!'}

@app.post('/tournaments/{tournament_id}/fill')
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
    tournaments_db.fill_tournament(
        db,
        tournament_id,
        user_id=user_id,
    )
    return {'message': f'Tournament teams {user_id} filled!'}

@app.post('/tournaments/{tournament_id}/remove_team')
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
    #TODO: Add user_id / team_id
    del user_id
    tournament = tournaments_db.remove_team(db, tournament_id)
    return {
        'message': (f'Team removed from tournament {tournament.name}! '
                    f'{tournament.current_teams}/{tournament.max_teams}')
    }
