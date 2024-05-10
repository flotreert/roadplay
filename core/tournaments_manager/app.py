import logging

import fastapi
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy.orm as orm

from core.tournaments_manager import db as tournaments_db
from core.tournaments_manager import schemas
from common import db
#TODO: move it to common
from auth import router as auth_router
from common import auth as auth_lib


app = fastapi.FastAPI(title='Tournament Manager API', tags=['tournament'])

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
    return {'message': 'Welcome to the Tournament Manager API!'}

@app.get('/tournaments')
def get_tournaments(sess: orm.Session = fastapi.Depends(db.get_db)) -> list[schemas.Tournament]:
    return tournaments_db.get_tournaments(session=sess)    

@app.get('/tournaments/{tournament_id}')
def get_tournament(tournament_id: int, db: orm.Session = fastapi.Depends(db.get_db)) -> schemas.Tournament:
    return tournaments_db.get_tournament_by_id(db, tournament_id)

@app.post('/tournaments')
def create_tournament(schema: schemas.TournamentDisplay, 
                      db: orm.Session = fastapi.Depends(db.get_db),
                      organizer_id: int = fastapi.Depends(auth_lib.get_user_id)):
    logging.info(f"Adding tournament: {schema.name} first")
    tournament = schemas.TournamentCreate(organizer_id=organizer_id, **schema.model_dump())
    tournaments_db.add_tournament(db, tournament)
    return {'message': 'Tournament created!'}

@app.put('/tournaments/{tournament_id}')
def update_tournament(tournament_id: int, db: orm.Session = fastapi.Depends(db.get_db)):
    tournaments_db.update_tournament(db, tournament_id)
    pass

@app.delete('/tournaments/{tournament_id}')
def delete_tournament(tournament_id: int, db: orm.Session = fastapi.Depends(db.get_db)):
    tournaments_db.delete_tournament(db, tournament_id)
    return {'message': 'Tournament deleted!'}

@app.post('/tournaments/{tournament_id}/fill')
def fill_tournament(tournament_id: int, db: orm.Session = fastapi.Depends(db.get_db)):
    tournaments_db.fill_tournament(db, tournament_id)
    return {'message': f'Tournament teams filled!'}

@app.post('/tournaments/{tournament_id}/remove_team')
def remove_team(tournament_id: int, db: orm.Session = fastapi.Depends(db.get_db)):
    tournament = tournaments_db.remove_team(db, tournament_id)
    return {'message': f'Team removed from tournament {tournament.name}! {tournament.current_teams}/{tournament.max_teams}'}