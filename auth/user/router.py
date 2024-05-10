from typing import Annotated

import fastapi 
from fastapi.middleware.cors import CORSMiddleware
import http
import sqlalchemy.orm as orm

from auth import router as auth_lib
from auth.user import db as db_user
from auth.user import schemas
from common import db 



router = fastapi.APIRouter(tags=['auth'])



@router.get("/users/me/", response_model=schemas.User)
async def read_users_me(
    current_user: Annotated[schemas.User, fastapi.Depends(auth_lib.get_current_active_user)],
):
    return current_user


@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[schemas.User, fastapi.Depends(auth_lib.get_current_active_user)],
):  
    return [{"item_id": "Foo", "owner": current_user.username}]



@router.get("/{user_id}")
def get_user(user_id: int, sess: orm.Session = fastapi.Depends(db.get_db)):
    return db_user.get_user(sess, user_id) 

@router.post("/create", status_code=http.HTTPStatus.CREATED.value)
def create_user(user: schemas.CreateUserModel, sess: orm.Session = fastapi.Depends(db.get_db)):
    user = db_user.User(hashed_password=auth_lib.get_password_hash(user.password), email=user.email, username=user.username) 
    db_user.create(sess, user)
    return {"message": "User created successfully"}