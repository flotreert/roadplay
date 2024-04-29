import datetime

import sqlalchemy as sa 
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = 'postgresql://postgres:tournament@localhost:5432/'

Base = declarative_base()
metadata = Base.metadata


class Tournament(Base):
    __tablename__ = 'tournaments'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.String(255), nullable=True)
    start_date = sa.Column(sa.String(255), nullable=True)
    end_date = sa.Column(sa.String(255), nullable=True)
    location = sa.Column(sa.String(255), nullable=True)
    description = sa.Column(sa.String(1000))
    organizer_id = sa.Column(sa.Integer, nullable=True)

    def __repr__(self):
        return f"Tournament(id={self.id}, name='{self.name}', start_date='{self.start_date}', end_date='{self.end_date}', location='{self.location}', description='{self.description}')"
    
    


def add_tournament(name, start_date, end_date, location, description, organizer_id):
    tournament = Tournament(name=name, start_date=start_date, end_date=end_date, location=location, description=description, organizer_id=organizer_id)
    session = sa.orm.Session(sa.create_engine(DATABASE_URL))
    session.add(tournament)
    session.commit()
    session.close()
    
def get_tournaments():
    session = sa.orm.Session(sa.create_engine(DATABASE_URL))
    tournaments = session.query(Tournament).all()
    session.close()
    return tournaments

def get_tournament_by_id(tournament_id):
    session = sa.orm.Session(sa.create_engine(DATABASE_URL))
    tournament = session.query(Tournament).filter(Tournament.id == tournament_id).first()
    session.close()
    return tournament

def update_tournament(tournament_id, name, start_date, end_date, location, description):
    session = sa.orm.Session(sa.create_engine(DATABASE_URL))
    tournament = session.query(Tournament).filter(Tournament.id == tournament_id).first()
    tournament.name = name
    tournament.start_date = start_date
    tournament.end_date = end_date
    tournament.location = location
    tournament.description = description
    session.commit()
    session.close()
    
def delete_tournament(tournament_id):
    session = sa.orm.Session(sa.create_engine(DATABASE_URL))
    tournament = session.query(Tournament).filter(Tournament.id == tournament_id).first()
    session.delete(tournament)
    session.commit()
    session.close()
    

    