"""All auth functions"""
from datetime import datetime, timedelta, timezone
from typing import Annotated

import fastapi
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
import sqlalchemy.orm as orm

from common import db
from auth.user import schemas
from auth.user import db as db_user

SECRET_KEY = "09d25e094fab6ca2556c818166b7a1234b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_users_db = {
    "roadplay": {
        "username": "roadplay",
        "full_name": "roadplay",
        "email": "roadplay@example.com",
        "hashed_password":
        "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token/login")

router = fastapi.APIRouter(tags=['auth'])


def verify_password(plain_password, hashed_password):
    """Verifies password"""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    """Hash password"""
    return pwd_context.hash(password)


def get_user(db_user, username: str):
    """Founds user in db"""
    if username in db_user:
        user_dict = db_user[username]
        return schemas.UserInDB(**user_dict)


def authenticate_user(session, username: str, password: str):
    """Checks user password"""
    user = db_user.get_user_by_username(session, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Creates token with lifetime of `expires_delta`"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)],
                           session: orm.Session = Depends(db.get_db)):
    """Gets user from token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError as exc:
        raise credentials_exception from exc
    user = db_user.get_user_by_username(session, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[schemas.User,
                            Depends(get_current_user)], ):
    """Gets active user"""
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.get('/', tags=['auth'])
def root():
    """Root message"""
    return 'This is AUTH component'


@router.post("/token/login", response_model=schemas.Token, tags=["auth"])
async def login_for_access_token(
        form_data: Annotated[OAuth2PasswordRequestForm,
                             Depends()],
        session: orm.Session = Depends(db.get_db),
) -> schemas.Token:
    """Get Token from known user"""
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'user': {
            "user": user.username,
            'id': user.id
        }},
        expires_delta=access_token_expires)
    return schemas.Token(access_token=access_token, token_type="bearer")


@router.post('/token/refresh', response_model=dict)
async def refresh_token(
        current_user: db_user.User = fastapi.Depends(get_current_active_user)):
    """Refreshes token from current user"""
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'user': {
            "user": current_user.username,
            'id': current_user.id
        }},
        expires_delta=access_token_expires)
    return {'access_token': access_token, 'token_type': 'bearer'}
