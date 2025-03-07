"""tournament participants

Revision ID: 42e6a5bb3e2d
Revises: 7543f422baa4
Create Date: 2024-05-22 22:52:44.008090

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '42e6a5bb3e2d'
down_revision: Union[str, None] = '7543f422baa4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tournaments', sa.Column('participants', sa.ARRAY(sa.Integer()), nullable=True))
    op.drop_column('tournaments', 'current_teams')
    op.add_column('users', sa.Column('past_tournaments', sa.ARRAY(sa.Integer()), nullable=True))
    op.add_column('users', sa.Column('current_tournaments', sa.ARRAY(sa.Integer()), nullable=True))
    op.add_column('users', sa.Column('futur_tournaments', sa.ARRAY(sa.Integer()), nullable=True))
    op.add_column('users', sa.Column('organizer_tournaments', sa.ARRAY(sa.Integer()), nullable=True))
    op.drop_column('users', 'role')
    op.drop_column('users', 'email')
    op.drop_column('users', 'password_hash')
    op.drop_column('users', 'password')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('password', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
    op.add_column('users', sa.Column('password_hash', sa.VARCHAR(length=128), autoincrement=False, nullable=True))
    op.add_column('users', sa.Column('email', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
    op.add_column('users', sa.Column('role', sa.VARCHAR(length=50), autoincrement=False, nullable=True))
    op.drop_column('users', 'organizer_tournaments')
    op.drop_column('users', 'futur_tournaments')
    op.drop_column('users', 'current_tournaments')
    op.drop_column('users', 'past_tournaments')
    op.add_column('tournaments', sa.Column('current_teams', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('tournaments', 'participants')
    # ### end Alembic commands ###