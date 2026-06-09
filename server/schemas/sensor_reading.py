import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

from schemas.sensor_types import SensorTypeResponse

class DeviceResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    location: str

class CreateSensorReading(BaseModel):
    device_id: str
    sensor_type_id: str
    value: float

class GetSensorReadings(BaseModel):
    skip: int
    limit: int

class GetSensorReading(BaseModel):
    id: str

class UpdateSensorReading(BaseModel):
    device_id: Optional[uuid.UUID] = None
    sensor_type_id: Optional[uuid.UUID] = None
    value: Optional[float] = None

class DeleteSensorReading(BaseModel):
    id: str
    time: datetime

class SensorReadingResponse(BaseModel):
    id: uuid.UUID
    device_id: uuid.UUID
    sensor_type_id: uuid.UUID
    value: float
    time: datetime

    device: DeviceResponse
    type: SensorTypeResponse

    model_config = {"from_attributes": True}

