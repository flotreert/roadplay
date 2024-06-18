"""Users schemas."""
import pydantic


class UserDisplay(pydantic.BaseModel):
    """User display schema."""
    username: str
    past_tournaments: list[int]
    current_tournaments: list[int]
    futur_tournaments: list[int]
    organizer_tournaments: list[int]


class User(UserDisplay):
    """User schema."""
    id: int


class UserUpdate(pydantic.BaseModel):
    """User update schema."""
    past_tournaments: list[int] = []
    current_tournaments: list[int] = []
    futur_tournaments: list[int] = []
    organizer_tournaments: list[int] = []
