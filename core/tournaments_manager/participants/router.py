"""Tournament participant router"""
import fastapi
import sqlalchemy.orm as orm

from common import auth as auth_lib
from common import db as db_lib
from common import custom_logging
from common import images
from core.tournaments_manager.participants import db as participants_db
from core.tournaments_manager.participants import schemas
from core.tournaments_manager.tournaments import schemas as tournament_schemas

logger = custom_logging.custom_logging(__name__)

router = fastapi.APIRouter(tags=['participants'])


@router.get('/participants')
def get_all(
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> list[schemas.ParticipantBase]:
    """Gets all participants"""
    return participants_db.get_all_participants(sess)


@router.get('/participants/{participant_id}')
def get_particpant(
    participant_id: int,
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> schemas.ParticipantBase | None:
    """Gets participant by id"""
    return participants_db.get_participant(sess, participant_id)


@router.get('/participant/@me')
def get_my_participant(
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
    part_id: str = fastapi.Depends(auth_lib.get_user_id),
) -> schemas.ParticipantBase | None:
    """Gets my participation"""
    logger.error('ddd %s: t %s', part_id, type(part_id))
    return participants_db.get_participant(sess, part_id)


@router.get('/participant/{participant_id}/tournaments')
def get_my_tournaments(
    participant_id: int,
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> list[tournament_schemas.Tournament]:
    """Gets my tournaments"""
    tournament_ids = participants_db.get_my_tournaments(sess, participant_id)
    tournaments = [
        tournament_schemas.Tournament.model_validate(
            t,
            from_attributes=True,
        ) for t in tournament_ids
    ]
    for tournament in tournaments:
        tournament.images = [
            images.upload(image) for image in tournament.images
        ]
    return tournaments
