import uuid
from pydantic import BaseModel, EmailStr
from schemas.device import DeviceResponse

class UserBase(BaseModel):
    email: EmailStr

class CreateUser(BaseModel):
    email: EmailStr
    password_hash: str

class GetUser(BaseModel):
    id: str

class GetUsers(BaseModel):
    skip: int
    limit: int

class UserResponse(BaseModel):
    
    id: uuid.UUID
    email: EmailStr

    devices: list[DeviceResponse]

    model_config = {"from_attributes": True}
