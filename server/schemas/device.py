import uuid
from typing import Optional
from pydantic import BaseModel
from schemas.sensor_reading import SensorReadingResponse
from datetime import datetime
from models.Device import DeviceStatus


class DeviceOrgResponse(BaseModel):
    id: uuid.UUID
    name: str

    model_config = {"from_attributes": True}


class CreateDevice(BaseModel):
    org_id: Optional[str] = None
    name: str
    location: str
    status: Optional[DeviceStatus] = None


class UpdateDevice(BaseModel):
    org_id: Optional[str] = None
    name: Optional[str] = None
    location: Optional[str] = None


class ClaimDevice(BaseModel):
    org_id: str
    claimed_at: Optional[datetime] = None


class DeviceResponse(BaseModel):
    id: uuid.UUID
    org_id: Optional[uuid.UUID] = None
    name: str
    location: str
    created_at: datetime

    serial_number: uuid.UUID
    claim_code: uuid.UUID
    status: DeviceStatus

    org: Optional[DeviceOrgResponse] = None
    readings: list[SensorReadingResponse]

    model_config = {"from_attributes": True}

class DeviceStatsResponse(BaseModel):
    total: int
    online: int
    offline: int