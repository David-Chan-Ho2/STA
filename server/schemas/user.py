import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr

from enums.user_roles import UserRole


class UserBase(BaseModel):
    email: EmailStr


class CreateUser(UserBase):
    password_hash: str
    role: Optional[UserRole] = None


class UserResponse(UserBase):
    id: uuid.UUID
    org_id: Optional[uuid.UUID] = None

    model_config = {"from_attributes": True}
