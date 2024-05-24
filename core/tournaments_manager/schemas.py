import datetime

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
    age_group: list[str]
    category: str
    fees: int
    number_of_teams: int
    description: str
    participants: list[int]

    model_config = pydantic.ConfigDict(from_attributes=True)


class TournamentDisplay(pydantic.BaseModel):
    """Tournament display model, lighter version of Tournament model"""
    name: str | None = None
    sex: str | None = None
    start_date: datetime.date | None = None   #change to date
    end_date: datetime.date | None = None  #change to date
    location: str | None = None
    sport: str | None = None
    age_group: list[str] | None = None
    category: str | None = None
    fees: int | None = None
    number_of_teams: int | None = None
    description: str | None = None


class TournamentCreate(TournamentDisplay):
    """Tournament create model"""
    organizer_id: int
