import uuid
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    password: str

class UserRegister(UserBase):
    pass


class UserLogin(UserBase):
    pass


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
