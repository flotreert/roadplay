"""Users schemas."""
import pydantic 


class UserBase(pydantic.BaseModel):
    username: str
    email: str
    role: str


class Users(UserBase):
    id: int

    mode_config = pydantic.ConfigDict(from_attributes=True)
    
    
class UserCreate(UserBase):
    password: str