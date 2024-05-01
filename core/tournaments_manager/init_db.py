import sqlalchemy as sa 
from sqlalchemy.ext.declarative import declarative_base


DATABASE_URL = 'postgresql://postgres:tournament@localhost:5432/'

Base = declarative_base()


def get_session():
    """Get session"""
    return sa.orm.Session(sa.create_engine(DATABASE_URL))

