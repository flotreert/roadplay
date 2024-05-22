"""This module contains functions to interact with the database."""
import logging

import sqlalchemy as sa

from core.tournaments_manager import model
from core.tournaments_manager import schemas

### TOURNAMENTS ###


def add_tournament(
    session: sa.orm.Session,
    tournament: schemas.TournamentDisplay,
) -> None:
    """Creates tournament."""
    tournament = model.Tournament(**tournament.model_dump())
    session.add(tournament)
    session.commit()
    session.close()


def get_tournaments(session: sa.orm.Session) -> list[model.Tournament]:
    """Get all tournaments"""
    tournaments = session.query(model.Tournament).all()
    session.close()
    return tournaments


def get_tournament_by_id(session: sa.orm.Session,
                         tournament_id: int) -> model.Tournament:
    """Gets tournament by id."""
    tournament = (session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first())
    session.close()
    return tournament


def update_tournament(
    session: sa.orm.Session,
    tournament_id: int,
    tournament: schemas.Tournament,
    user_id: int,
) -> None:
    """Updates tournament."""
    existing_tournament = (session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first())
    if user_id != existing_tournament.organizer_id:
        logging.warning('User %s is not the organizer of %s', user_id,
                        tournament_id)
    existing_tournament.name = tournament.name if tournament.name else tournament.name
    existing_tournament.start_date = (tournament.start_date
                                      if tournament.start_date else
                                      tournament.start_date)
    existing_tournament.end_date = (tournament.end_date if tournament.end_date
                                    else tournament.end_date)
    existing_tournament.location = (tournament.location if tournament.location
                                    else tournament.location)
    existing_tournament.description = (tournament.description
                                       if tournament.description else
                                       tournament.description)
    existing_tournament.fees = tournament.fees if tournament.fees else tournament.fees
    existing_tournament.age_group = (
        tournament.age_group if tournament.age_group else tournament.age_group)
    existing_tournament.number_of_teams = (tournament.number_of_teams
                                           if tournament.number_of_teams else
                                           tournament.number_of_teams)
    session.commit()
    session.close()


#TODO: Delete tournament if organizer deleted
def delete_tournament(session: sa.orm.Session, tournament_id: int,
                      user_id: int) -> None:
    """Deletes tournament."""
    tournament = session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first()
    if user_id != tournament.organizer_id:
        logging.warning('User %s is not the organizer')
        return None
    session.delete(tournament)
    session.commit()
    session.close()


### TOURNAMENT STATUS ###


# TODO: Add team to tournament
def fill_tournament(session: sa.orm.Session, tournament_id: int,
                    user_id: int) -> model.Tournament | None:
    """Fills tournament."""
    tournament = session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first()
    if tournament.is_full:
        logging.warning('Tournament %s is full', tournament_id)
        return None
    if user_id in tournament.participants:
        logging.warning('User/Team %s already in tournament %s', user_id,
                        tournament_id)
        return None

    tournament.participants.append(user_id)
    if len(tournament.participants) == tournament.number_of_teams:
        tournament.is_full = True
    session.commit()
    session.close()
    return tournament

# TODO: error message if tournament doesnt exist, check error for user not in tournament
def remove_team(
    session: sa.orm.Session,
    tournament_id: int,
    user_id: str | None = None,
) -> model.Tournament | None:
    """Removes team from tournament."""
    tournament = (session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first())
    if user_id not in tournament.participants:
        logging.warning('User/team %s not in tournament %s', user_id,
                        tournament_id)
        return None

    tournament.participants.remove(user_id)
    if len(tournament.participants) < tournament.number_of_teams:
        tournament.is_full = False
    session.commit()
    session.close()
    return tournament
