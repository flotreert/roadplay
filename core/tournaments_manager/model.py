"""Model for Tournaments"""
import sqlalchemy as sa

from common import db


class Tournament(db.Base):
    """Tournament model"""
    __tablename__ = 'tournaments'

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    created_at = sa.Column(sa.DateTime, server_default=sa.func.now())
    updated_at = sa.Column(
        sa.DateTime,
        server_default=sa.func.now(),
        server_onupdate=sa.func.now(),
    )
    name = sa.Column(sa.String(255), nullable=True)
    start_date = sa.Column(sa.Date, nullable=True)
    end_date = sa.Column(sa.Date(), nullable=True)
    location = sa.Column(sa.String(255), nullable=True)
    organizer_id = sa.Column(sa.Integer, nullable=True)
    age_group = sa.Column(sa.ARRAY(sa.Integer), nullable=True)
    sport = sa.Column(sa.String(255), nullable=True)
    category = sa.Column(sa.String(255), nullable=True)
    sex = sa.Column(sa.String(255), nullable=True)
    fees = sa.Column(sa.Integer, nullable=True)
    number_of_teams = sa.Column(sa.Integer, nullable=True)
    participants = sa.Column(sa.ARRAY(sa.Integer), nullable=True, default=[])
    is_full = sa.Column(sa.Boolean, default=False)
    description = sa.Column(sa.String(1000))

    def __repr__(self):
        return f'Tournament {self.name} created at {self.created_at} '
