import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr
from schemas.sensor_reading import SensorReadingResponse

class DeviceUserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr

    model_config = {"from_attributes": True}

class CreateDevice(BaseModel):
    user_id: str
    name: str
    location: str

class GetDevices(BaseModel):
    user_id: str
    skip: int
    limit: int

class GetDevice(BaseModel):
    id: str

class UpdateDevice(BaseModel):
    user_id: Optional[str] = None
    name: Optional[str] = None
    location: Optional[str] = None

class DeleteDevice(BaseModel):
    id: str

class DeviceResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    location: str

    user: DeviceUserResponse
    readings: list[SensorReadingResponse]

    model_config = {"from_attributes": True}

