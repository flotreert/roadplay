"""This module contains functions to interact with the database."""
import sqlalchemy as sa

from common import custom_logging as logging
from core.tournaments_manager import model
from core.tournaments_manager import schemas
### TOURNAMENTS ###

logger = logging.custom_logging(__name__)

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
    logger.info('%s', tournaments)
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
    new_tournament: schemas.Tournament,
    user_id: int,
) -> model.Tournament | None:
    """Updates tournament."""
    old_tournament = (session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first())
    if not old_tournament:
        logger.error('Tournament %s not found', tournament_id)
        return None
    if user_id != old_tournament.organizer_id:
        logger.warning('User %s is not the organizer of %s', user_id,
                        tournament_id)
        return None
    old_tournament.name = new_tournament.name if new_tournament.name else old_tournament.name
    old_tournament.start_date = (new_tournament.start_date
                                 if new_tournament.start_date else
                                 old_tournament.start_date)
    old_tournament.end_date = (new_tournament.end_date
                               if new_tournament.end_date else
                               old_tournament.end_date)
    old_tournament.location = (new_tournament.location
                               if new_tournament.location else
                               old_tournament.location)
    old_tournament.description = (new_tournament.description
                                  if new_tournament.description else
                                  old_tournament.description)
    old_tournament.fees = new_tournament.fees if new_tournament.fees else old_tournament.fees
    old_tournament.age_group = (new_tournament.age_group
                                if new_tournament.age_group else
                                old_tournament.age_group)
    old_tournament.number_of_teams = (new_tournament.number_of_teams
                                      if new_tournament.number_of_teams else
                                      old_tournament.number_of_teams)
    session.commit()
    session.close()
    return old_tournament


#TODO: Delete tournament if organizer deleted
def delete_tournament(session: sa.orm.Session, tournament_id: int,
                      user_id: int) -> None:
    """Deletes tournament."""
    tournament = session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first()
    if not tournament:
        logger.error('Tournament %s not found', tournament_id)
        return None
    if user_id != tournament.organizer_id:
        logger.warning('User %s is not the organizer')
        return None
    session.delete(tournament)
    session.commit()
    session.close()


### TOURNAMENT STATUS ###


# TODO: Add team to tournament
def fill_tournament(
    session: sa.orm.Session,
    tournament_id: int,
    user_id: int,
) -> model.Tournament | None:
    """Fills tournament."""
    tournament = session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first()
    if not tournament:
        logger.error('Tournament %s not found', tournament_id)
        return None
    if tournament.is_full:
        logger.warning('Tournament %s is full', tournament_id)
        return None
    if user_id in tournament.participants:
        logger.warning('User/Team %s already in tournament %s', user_id,
                        tournament_id)
        return None
    
    # TODO: create a Sqlachemy mutable array
    participants = list(tournament.participants)
    participants.append(user_id)
    tournament.participants = participants.copy()
    #FIXME: check if the tournament is full
    if len(tournament.participants) == tournament.number_of_teams:
        tournament.is_full = True
    session.commit()
    session.close()
    logger.error(
        '%s',
        session.query(model.Tournament).filter(
            model.Tournament.id == tournament_id).first().participants)
    return tournament


# TODO: check error for user not in tournament
def remove_team(
    session: sa.orm.Session,
    tournament_id: int,
    user_id: str | None = None,
) -> model.Tournament | None:
    """Removes team from tournament."""
    tournament = (session.query(
        model.Tournament).filter(model.Tournament.id == tournament_id).first())
    if not tournament:
        logger.error('Tournament %s not found', tournament_id)
        return None
    if user_id not in tournament.participants:
        logger.warning('User/team %s not in tournament %s', user_id,
                        tournament_id)
        return None
    
    # TODO: create a Sqlachemy mutable array
    participants = list(tournament.participants)
    participants.remove(user_id)
    tournament.participants = participants.copy()
    if len(tournament.participants) < tournament.number_of_teams:
        tournament.is_full = False
    session.commit()
    session.close()
    return tournament
