import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr


class OrgUserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr

    model_config = {"from_attributes": True}


class OrgDeviceResponse(BaseModel):
    id: uuid.UUID
    name: str
    location: str

    model_config = {"from_attributes": True}


class CreateOrg(BaseModel):
    name: str


class UpdateOrg(BaseModel):
    name: Optional[str] = None


class OrgResponse(BaseModel):
    id: uuid.UUID
    name: str
    users: list[OrgUserResponse] = []
    devices: list[OrgDeviceResponse] = []

    model_config = {"from_attributes": True}

