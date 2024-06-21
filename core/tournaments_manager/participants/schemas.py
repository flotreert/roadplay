"""Schemas for participant tournaments"""
import pydantic


class ParticipantCreate(pydantic.BaseModel):
    """Participant model for creation"""
    participant_id: int
    tournaments_ids: list[int] = []
    organized_ids: list[int] = []


class ParticipantBase(ParticipantCreate):
    """Full schemas for particpant"""
    id: int
    participant_id: int
    tournaments_ids: list[int] = []
    organized_ids: list[int] = []


class ParticpantUpdate(pydantic.BaseModel):
    """Update schemas only for participant"""
    tournaments_ids: list[int]
    participant_id: int


class OrganizerUpdate(pydantic.BaseModel):
    """Update schemas only for organizer"""
    organized_ids: list[int]
    organizer_id: int
