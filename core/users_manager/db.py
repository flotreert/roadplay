"""All functions relative to user management in db"""
import sqlalchemy as sa

from common import custom_logging as logging
from core.users_manager import model
from core.users_manager import schemas

logger = logging.custom_logging(__name__)


def get_users(session: sa.orm.Session) -> list[model.User]:
    """Get all users"""
    users = session.query(model.User).all()
    logger.info('%s', users)
    session.close()
    return users


def get_past_tournaments(session: sa.orm.Session,
                         user_id: int) -> list[model.User]:
    """Get all past tournaments for user"""
    user = (session.query(model.User).filter(model.User.id == user_id).first())
    if not user:
        logger.error('User %s not found', user_id)
        return None
    tournaments = user.past_tournaments
    logger.info('%s', tournaments)
    session.close()
    return tournaments


def get_current_tournaments(session: sa.orm.Session,
                            user_id: int) -> list[model.User]:
    """Get all current tournaments for user"""
    user = (session.query(model.User).filter(model.User.id == user_id).first())
    if not user:
        logger.error('User %s not found', user_id)
        return None
    tournaments = user.current_tournaments
    logger.info('%s', tournaments)
    session.close()
    return tournaments


def get_futur_tournaments(session: sa.orm.Session,
                          user_id: int) -> list[model.User]:
    """Get all futur tournaments for user"""
    user = (session.query(model.User).filter(model.User.id == user_id).first())
    if not user:
        logger.error('User %s not found', user_id)
        return None
    tournaments = user.futur_tournaments
    logger.info('%s', tournaments)
    session.close()
    return tournaments


def get_organizer_tournaments(session: sa.orm.Session,
                              user_id: int) -> list[model.User]:
    """Get all tournaments where user is organizer"""
    user = (session.query(model.User).filter(model.User.id == user_id).first())
    if not user:
        logger.error('User %s not found', user_id)
        return None
    tournaments = user.organizer_tournaments
    logger.info('%s', tournaments)
    session.close()
    return tournaments


def get_user(session: sa.orm.Session, user_id: int) -> model.User:
    """Get user by id"""
    user = (session.query(model.User).filter(model.User.id == user_id).first())
    session.close()
    return user


def update_user(
    session: sa.orm.Session,
    user_id: int,
    schema: schemas.UserUpdate,
) -> model.User:
    """Update user by id"""
    user = (session.query(model.User).filter(model.User.id == user_id).first())
    if not user:
        logger.error('User %s not found', user_id)
        return None

    # TODO: create a Sqlachemy mutable array
    past = list(user.past_tournaments)
    past.extend(schema.past_tournaments)
    user.past_tournaments = past.copy()

    current = list(user.current_tournaments)
    current.extend(schema.current_tournaments)
    user.current_tournaments = current.copy()

    futur = list(user.futur_tournaments)
    futur.extend(schema.futur_tournaments)
    user.futur_tournaments = futur.copy()

    organizer = list(user.organizer_tournaments)
    organizer.extend(schema.organizer_tournaments)
    user.organizer_tournaments = organizer.copy()

    session.close()
    return user
