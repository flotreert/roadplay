"""status and fields tournaments

Revision ID: e795c3ec4bb4
Revises: 
Create Date: 2024-05-01 01:43:59.676635

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e795c3ec4bb4'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tournaments',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('start_date', sa.String(length=255), nullable=True),
    sa.Column('end_date', sa.String(length=255), nullable=True),
    sa.Column('location', sa.String(length=255), nullable=True),
    sa.Column('organizer_id', sa.Integer(), nullable=True),
    sa.Column('age_group', sa.ARRAY(sa.String(length=255)), nullable=True),
    sa.Column('sport', sa.String(length=255), nullable=True),
    sa.Column('sex', sa.String(length=255), nullable=True),
    sa.Column('category', sa.String(length=255), nullable=True),
    sa.Column('fees', sa.Integer(), nullable=True),
    sa.Column('number_of_teams', sa.Integer(), nullable=True),
    sa.Column('current_teams', sa.Integer(), nullable=True),
    sa.Column('is_full', sa.Boolean(), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tournaments')
    # ### end Alembic commands ###
