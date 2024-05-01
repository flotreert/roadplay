import datetime 

import pydantic 

class TournamentBase(pydantic.BaseModel):
    """Tournament base model"""
    id: int
    organizer_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    is_full: bool = False


class Tournament(TournamentBase):
    """Tournament model"""
    name: str
    sex: str 
    start_date: str #change to date
    end_date: str #change to date 
    location: str
    sport: str
    age_group: list[str]
    category: str
    fees: int
    number_of_teams: int
    current_teams: int
    description: str
    

class TournamentDisplay(pydantic.BaseModel):
    """Tournament display model, lighter version of Tournament model"""
    name: str
    sex: str 
    start_date: str #change to date
    end_date: str #change to date 
    location: str
    sport: str
    age_group: list[str]
    category: str
    fees: int
    number_of_teams: int
    description: str
    