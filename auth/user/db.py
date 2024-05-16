import sqlalchemy as sa

from common import db


class User(db.Base):
    """Auth user model"""	
    __tablename__ = 'auth_data'

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    username = sa.Column(sa.String(80), nullable=False, unique=True)
    email = sa.Column(sa.String(80), nullable=False, unique=True)
    hashed_password = sa.Column(sa.String(80), nullable=False)


def get_user(sess: sa.orm.Session, id: int) -> User | None:
    return sess.query(User).filter(User.id == id).first()

def get_user_by_username(sess: sa.orm.Session, username: str) -> User | None:
    return sess.query(User).filter(User.username == username).first()

def get_users(sess: sa.orm.Session) -> list[User]:
    return sess.query(User).all()

def create(sess: sa.orm.Session, user: User) -> User:
    # TODO: handle already existing user/mail/username
    sess.add(user)
    sess.commit()
    sess.refresh(user)
    return user
