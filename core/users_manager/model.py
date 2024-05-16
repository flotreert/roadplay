import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)
    username = sa.Column(sa.String(50), unique=True)
    password = sa.Column(sa.String(50), nullable=False)
    password_hash = sa.Column(sa.String(128))
    email = sa.Column(sa.String(100))
    role = sa.Column(sa.String(50), default='player')

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"