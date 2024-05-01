import datetime 

import pydantic 


class Tournament(pydantic.BaseModel):
    """Tournament base model"""
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
    is_full: bool = False
    description: str
    organizer_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    

class TournamentCreate(pydantic.BaseModel):
    """Tournament create model"""
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
    organizer_id: int
    