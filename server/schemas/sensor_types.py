import uuid
from typing import Optional
from pydantic import BaseModel

class CreateSensorType(BaseModel):
    name: str
    unit: str

class GetSensorTypes(BaseModel):
    skip: int
    limit: int

class GetSensorType(BaseModel):
    id: str

class UpdateSensorType(BaseModel):
    name: Optional[str] = None
    unit: Optional[str] = None

class DeleteSensorType(BaseModel):
    id: str

class SensorTypeResponse(BaseModel):
    id: uuid.UUID
    name: str
    unit: str

    model_config = {"from_attributes": True}
