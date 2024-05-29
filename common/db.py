import typing

import fastapi
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = 'postgresql://postgres:tournament@localhost:5432/'

Base = declarative_base()
engine = sa.create_engine(DATABASE_URL)
SessionLocal = sa.orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = Base.metadata

def get_db():
    """Get db"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
db_dependency = typing.Annotated[sa.orm.Session, fastapi.Depends(get_db)]

