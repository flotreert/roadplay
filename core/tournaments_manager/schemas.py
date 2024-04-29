import datetime 

import pydantic 


class TournamentBase(pydantic.BaseModel):
    name: str
    description: str
    start_date: datetime.date
    end_date: datetime.date
    location: str 
    
class TournamentCreate(TournamentBase):
    organizer_id: int
    