"""Model for tournament participants"""
import sqlalchemy as sa

from common import db


class Participant(db.Base):
    """Participants model"""
    __tablename__ = 'participants'

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    created_at = sa.Column(sa.DateTime, server_default=sa.func.now())
    updated_at = sa.Column(
        sa.DateTime,
        server_default=sa.func.now(),
        server_onupdate=sa.func.now(),
    )
    participant_id = sa.Column(sa.Integer, primary_key=True)
    tournaments_ids = sa.Column(sa.ARRAY(sa.Integer), nullable=True)
    organized_ids = sa.Column(sa.ARRAY(sa.Integer), nullable=True)

    def __repr__(self):
        return (f'Participants {self.participant_id}'
                f' recensed in tournaments {self.tournaments_ids}'
                f'and organized {self.organized_ids}')
