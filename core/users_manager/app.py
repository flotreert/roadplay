"""Users manager app"""
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import orm

from common import custom_logging as logging
from common import auth as auth_lib
from common import db as db_lib
from core.users_manager import schemas
from core.users_manager import db as users_db

logger = logging.custom_logging(__name__)

app = fastapi.FastAPI(
    title='Users Manager API',
    prefix='/api/users',
    root_path='/api/users',
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
    """Root path"""
    return {'message': 'Welcome to the Users Manager API!'}


@app.get('/users')
def get_users(
        sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> list[schemas.User]:
    """Get all users"""
    return users_db.get_users(sess)


@app.get('/tournaments/past/{user_id}' , tags=['tournaments'])
def get_past_tournaments(
    user_id: int,
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
    current_user: int = fastapi.Depends(auth_lib.get_user_id),
) -> list[schemas.User]:
    """Get all past tournaments for user"""
    if not user_id:
        user_id = current_user
    return users_db.get_past_tournaments(sess, user_id)


@app.get('/tournaments/current/{user_id}', tags=['tournaments'])
def get_current_tournaments(
    user_id: int,
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
    current_user: int = fastapi.Depends(auth_lib.get_user_id),
) -> list[schemas.User]:
    """Gets all current tournaments for user"""
    if not user_id:
        user_id = current_user
    return users_db.get_current_tournaments(sess, user_id)


@app.get('/tournaments/future/{user_id}', tags=['tournaments'])
def get_future_tournaments(
    user_id: int,
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
    current_user: int = fastapi.Depends(auth_lib.get_user_id),
) -> list[schemas.User]:
    """Get all future tournaments for user"""
    if not user_id:
        user_id = current_user
    return users_db.get_future_tournaments(sess, user_id)


@app.get('/tournaments/organizer/{user_id}', tags=['tournaments'])
def get_organizer(
    user_id: int,
    sess: orm.Session = fastapi.Depends(db_lib.get_db),
    current_user: int = fastapi.Depends(auth_lib.get_user_id),
) -> list[schemas.User]:
    """Get all tournaments where user is organizer"""
    if not user_id:
        user_id = current_user
    return users_db.get_future_tournaments(sess, user_id)


@app.get('/users/{user_id}')
def get_user(
        user_id: int,
        sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> schemas.User:
    """Get user by ID"""
    return users_db.get_user_by_id(sess, user_id)


# @app.post('/users')
# def create_user(
#         schema: schemas.User,
#         sess: orm.Session = fastapi.Depends(db_lib.get_db),
# ) -> dict:
#     """Create a new user"""
#     return users_db.add_user(sess, schema)


@app.put('/users/{user_id}', tags=['tournaments'])
def update_user(
        user_id: int,
        schema: schemas.UserUpdate,
        sess: orm.Session = fastapi.Depends(db_lib.get_db),
) -> dict:
    """Update a user"""
    logger.info('Updating user %s, %s', user_id, schema)
    users_db.update_user(sess, user_id, schema)
