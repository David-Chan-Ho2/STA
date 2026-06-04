import uuid
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr


class UserRegister(UserBase):
    password: str
    confirmPassword: str


class UserLogin(UserBase):
    password: str

class UserLogout(UserBase):
    pass


class UserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
