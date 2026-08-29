import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr

from enums.organization_types import OrganizationType


class OrganizationUserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr

    model_config = {"from_attributes": True}


class OrganizationDeviceResponse(BaseModel):
    id: uuid.UUID
    name: str
    location: str

    model_config = {"from_attributes": True}


class CreateOrganization(BaseModel):
    name: str
    type: OrganizationType


class UpdateOrganization(BaseModel):
    name: Optional[str] = None
    type: Optional[OrganizationType] = None


class OrganizationResponse(BaseModel):
    id: uuid.UUID
    name: str
    users: list[OrganizationUserResponse] = []
    devices: list[OrganizationDeviceResponse] = []

    model_config = {"from_attributes": True}
