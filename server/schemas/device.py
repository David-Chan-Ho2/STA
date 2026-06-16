import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr
from schemas.sensor_reading import SensorReadingResponse
from datetime import datetime

class DeviceUserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr

    model_config = {"from_attributes": True}

class CreateDevice(BaseModel):
    user_id: Optional[str] = None
    name: str
    location: str

class UpdateDevice(BaseModel):
    user_id: Optional[str] = None
    name: Optional[str] = None
    location: Optional[str] = None

class ClaimDevice(BaseModel):
    user_id: str
    claimed_at: Optional[datetime] = None

class DeviceResponse(BaseModel):
    id: uuid.UUID
    user_id: Optional[uuid.UUID] = None
    name: str
    location: str

    serial_number: uuid.UUID
    claim_code: uuid.UUID

    user: Optional[DeviceUserResponse] = None
    readings: list[SensorReadingResponse]

    model_config = {"from_attributes": True}

