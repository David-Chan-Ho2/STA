import uuid
from typing import Optional
from pydantic import BaseModel

class CreateSensorType(BaseModel):
    name: str
    unit: str

class UpdateSensorType(BaseModel):
    name: Optional[str] = None
    unit: Optional[str] = None

class SensorTypeResponse(BaseModel):
    id: uuid.UUID
    name: str
    unit: str

    model_config = {"from_attributes": True}
