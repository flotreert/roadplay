"""Model for Users"""
import sqlalchemy as sa

from common import db


class User(db.Base):
    """User model"""
    __tablename__ = 'users'

    id = sa.Column(sa.Integer, primary_key=True)
    username = sa.Column(sa.String(50), unique=True)
    past_tournaments = sa.Column(sa.ARRAY(sa.Integer), nullable=True)
    current_tournaments = sa.Column(sa.ARRAY(sa.Integer), nullable=True)
    futur_tournaments = sa.Column(sa.ARRAY(sa.Integer), nullable=True)
    organizer_tournaments = sa.Column(sa.ARRAY(sa.Integer), nullable=True)
    # TODO: Add teams 

    def __repr__(self):
        return f'<user={self.username}>'
