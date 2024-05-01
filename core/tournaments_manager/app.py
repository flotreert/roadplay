from fastapi import FastAPI

from core.tournaments_manager import db as tournaments_db
from core.tournaments_manager import schemas

app = FastAPI()

@app.get('/')
def read_root():
    return {'message': 'Welcome to the Tournament Manager API!'}

@app.get('/tournaments')
def get_tournaments():
    return tournaments_db.get_tournaments()    

@app.get('/tournaments/{tournament_id}')
def get_tournament(tournament_id: int):
    return tournaments_db.get_tournament_by_id(tournament_id)

@app.post('/tournaments')
def create_tournament(schema: schemas.TournamentCreate):
    tournaments_db.add_tournament(schema)
    return {'message': 'Tournament created!'}

@app.put('/tournaments/{tournament_id}')
def update_tournament(tournament_id: int):
    tournaments_db.update_tournament(tournament_id)
    pass

@app.delete('/tournaments/{tournament_id}')
def delete_tournament(tournament_id: int):
    tournaments_db.delete_tournament(tournament_id)
    return {'message': 'Tournament deleted!'}

@app.post('/tournaments/{tournament_id}/fill')
def fill_tournament(tournament_id: int):
    tournament = tournaments_db.fill_tournament(tournament_id)
    return {'message': f'Tournament {tournament.name} : {tournament.current_teams}/{tournament.max_teams} teams filled!'}

@app.post('/tournaments/{tournament_id}/remove_team')
def remove_team(tournament_id: int):
    tournament = tournaments_db.remove_team(tournament_id)
    return {'message': f'Team removed from tournament {tournament.name}! {tournament.current_teams}/{tournament.max_teams}'}