"""Schemas for tournaments"""
import datetime
import io

import pydantic


class TournamentBase(pydantic.BaseModel):
    """Tournament base model"""
    id: int
    organizer_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    is_full: bool = False
    model_config = pydantic.ConfigDict(from_attributes=True)


class Tournament(TournamentBase):
    """Tournament model"""
    name: str
    sex: str
    start_date: datetime.date  #change to date
    end_date: datetime.date  #change to date
    location: str
    sport: str
    age_group: tuple[int, int]
    category: str
    fees: int
    number_of_teams: int
    description: str
    participants: list[int]
    images: list[str]

    model_config = pydantic.ConfigDict(from_attributes=True)


class TournamentDisplay(pydantic.BaseModel):
    """Tournament display model, lighter version of Tournament model"""
    name: str
    sex: str
    start_date: datetime.date  #change to date
    end_date: datetime.date  #change to date
    location: str
    sport: str
    age_group: tuple[int, int]
    category: str
    fees: int
    number_of_teams: int
    description: str
    images: list[bytes]

    model_config = pydantic.ConfigDict(
        from_attributes=True,
    )


class TournamentCreate(TournamentDisplay):
    """Tournament create model"""
    organizer_id: int
    images: list[str] | None = None
