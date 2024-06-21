"""Database funcitons for the participants"""
import sqlalchemy as sa

from common import custom_logging as logging
from core.tournaments_manager.participants import model
from core.tournaments_manager.participants import schemas
from core.tournaments_manager.tournaments import schemas as tournament_schemas
from core.tournaments_manager.tournaments import db as tournaments_db

logger = logging.custom_logging(__name__)


def create_participant(
    session: sa.orm.Session,
    schema: schemas.ParticipantCreate,
) -> model.Participant:
    """Creates a participants."""
    participant = model.Participant(**schema.model_dump())
    session.add(participant)
    session.commit()
    session.close()
    return participant


def get_participant(session: sa.orm.Session,
                    participant_id: int) -> model.Participant:
    """Gets particpant by id"""
    participant: model.Participant = (session.query(model.Participant).filter(
        model.Participant.id == participant_id).first())
    session.close()
    return participant


def get_my_tournaments(session: sa.orm.Session,
                       part_id: str) -> list[tournament_schemas.Tournament]:
    """Gets my tournaments"""
    participant: model.Participant = (session.query(
        model.Participant).filter(model.Participant.participant_id == part_id).first())
    tournaments = []
    for t in participant.tournaments_ids:
        tournament = tournaments_db.get_tournament_by_id(session, t)
        tournaments.append(tournament)
    session.close()
    return tournaments


def get_all_participants(session: sa.orm.Session) -> list[model.Participant]:
    """Gets all participants"""
    participants = session.query(model.Participant).all()
    session.close()
    return participants


def update_participant(
    session: sa.orm.Session,
    update_schema: schemas.ParticpantUpdate,
) -> model.Participant:
    """Update participant only"""
    participant: model.Participant = session.query(model.Participant).filter(
        model.Participant.id == update_schema.participant_id).first()
    #TODO: use mutable sa.list
    participant_tournaments = list(participant.tournaments_ids)
    participant_tournaments += update_schema.tournaments_ids
    participant.tournaments_ids = participant_tournaments.copy()
    session.commit()
    session.close()
    return participant


def update_organized(
    session: sa.orm.Session,
    update_schema: schemas.OrganizerUpdate,
) -> model.Participant:
    """Update organizedonly"""
    organizer: model.Participant = session.query(model.Participant).filter(
        model.Participant.id == update_schema.organized_id).first()
    #TODO: use mutable sa.list
    organized_tournaments = list(organizer.organized_ids)
    organized_tournaments += update_schema.tournaments_ids
    organizer.organized_ids = organized_tournaments.copy()
    session.commit()
    session.close()
    return organizer


def remove_participation(
    session: sa.orm.Session,
    tournament: int,
    participant_id: int,
) -> model.Participant:
    """Remove tournaments from participant"""
    participant: model.Participant = session.query(model.Participant).filter(
        model.Participant.id == participant_id).first()
    tournament_ids = set(participant.tournaments_ids)
    if tournament in participant.tournaments_ids:
        tournament_ids.remove(tournament)
    participant.tournaments_ids = tournament_ids.copy()
    session.commit()
    session.close()
    return participant


def delete(
    session: sa.orm.Session,
    delete_id: int,
) -> None:
    """Deletes participants"""
    participant: model.Participant = session.query(
        model.Participant).filter(model.Participant.id == delete_id)
    session.delete(participant)
    session.flush()


def create_or_update(
    session: sa.orm.Session,
    schema: schemas.ParticipantCreate,
) -> model.Participant:
    """Update or create a participant if needed"""
    if schema.participant_id is None:
        logger.error('participant_id is None')
        return None
    if get_participant(session, schema.participant_id):
        schema = schemas.ParticpantUpdate(
            tournaments_ids=schema.tournaments_ids,
            participant_id=schema.participant_id,
        )
        p = update_participant(session, schema)
    else:
        p = create_participant(session, schema)
        logger.info('participant no create: %s', p)
    return p
