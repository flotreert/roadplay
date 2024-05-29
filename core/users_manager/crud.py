"""CRUD operations for users."""
from core.users_manager import model
from core.users_manager import schemas
from core.users_manager import init_db

### USERS ### 

def get_user(user_id: int) -> schemas.Users:
    """Get user."""
    session = init_db.get_session()
    user = session.query(model.User).filter(model.User.id == user_id).first()
    session.close()    
    return user

def get_users() -> list[schemas.Users]:
    """Get users."""
    session = init_db.get_session()
    users = session.query(model.User).all()
    session.close()
    return users

def add_user(schema: schemas.UserCreate):
    """Add user."""
    session = init_db.get_session()
    user = model.User(**schema.model_dump())
    session.add(user)
    session.commit()
    session.close()
    
def update_user(user_id: int, schema: schemas.UserBase):
    """Update user."""
    session = init_db.get_session()
    user = session.query(model.User).filter(model.User.id == user_id).first()
    for key, value in schema.model_dump().items():
        setattr(user, key, value)
    session.commit()
    session.close()
    
def delete_user(user_id: int):
    """Delete user."""
    session = init_db.get_session()
    user = session.query(model.User).filter(model.User.id == user_id).first()
    session.delete(user)
    session.commit()
    session.close()

def get_user_by_username(username: str) -> schemas.Users:
    """Get user by username."""
    session = init_db.get_session()
    user = session.query(model.User).filter(model.User.username == username).first()
    session.close()
    return user

