"""This module contains functions to interact with the database."""
from core.tournaments_manager import init_db
from core.tournaments_manager import model
from core.tournaments_manager import schemas


### TOURNAMENTS ###

def add_tournament(tournament: schemas.TournamentDisplay) -> None:
    """Creates tournament."""
    tournament = model.Tournament(**tournament.model_dump())
    session = init_db.get_session()
    session.add(tournament)
    session.commit()
    session.close()
    
def get_tournaments() -> list[model.Tournament]:
    """Get all tournaments"""
    session = init_db.get_session()
    tournaments = session.query(model.Tournament).all()
    session.close()
    return tournaments

def get_tournament_by_id(tournament_id) -> model.Tournament:
    """Gets tournament by id."""
    session = init_db.get_session()
    tournament = session.query(model.Tournament).filter(model.Tournament.id == tournament_id).first()
    session.close()
    return tournament

def update_tournament(id: int, tournament: schemas.Tournament) -> None:
    """Updates tournament."""
    session = init_db.get_session()
    existing_tournament = session.query(model.Tournament).filter(model.Tournament.id == id).first()
    existing_tournament.name = tournament.name if tournament.name else tournament.name
    existing_tournament.start_date = tournament.start_date if tournament.start_date else tournament.start_date
    existing_tournament.end_date = tournament.end_date if tournament.end_date else tournament.end_date
    existing_tournament.location = tournament.location if tournament.location else tournament.location
    existing_tournament.description = tournament.description if tournament.description else tournament.description
    existing_tournament.fees = tournament.fees if tournament.fees else tournament.fees
    existing_tournament.age_group = tournament.age_group if tournament.age_group else tournament.age_group
    existing_tournament.number_of_teams = tournament.number_of_teams if tournament.number_of_teams else tournament.number_of_teams
    session.commit()
    session.close()


#TODO: Delete tournament if organizer deleted
def delete_tournament(tournament_id) -> None:
    """Deletes tournament."""
    session = init_db.get_session()
    tournament = session.query(model.Tournament).filter(model.Tournament.id == tournament_id).first()
    session.delete(tournament)
    session.commit()
    session.close()
    

    
### TOURNAMENT STATUS ###


# TODO: Add team to tournament
def fill_tournament(tournament_id: int) -> model.Tournament:
    """Fills tournament."""
    session = init_db.get_session()
    tournament = session.query(model.Tournament).filter(model.Tournament.id == tournament_id).first()
    if tournament.is_full:
        return tournament
    tournament.current_teams += 1
    if tournament.current_teams == tournament.number_of_teams:
        tournament.is_full = True
    session.commit()
    session.close()
    return tournament

def remove_team(tournament_id: int) -> model.Tournament:
    """Removes team from tournament."""
    session = init_db.get_session()
    tournament = session.query(model.Tournament).filter(model.Tournament.id == tournament_id).first()
    tournament.current_teams -= 1
    if tournament.current_teams < tournament.number_of_teams:
        tournament.is_full = False
    session.commit()
    session.close()
    return tournament


