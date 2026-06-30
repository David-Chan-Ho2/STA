from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class AuthRegister(UserBase):
    password: str
    confirmPassword: str

class AuthLogin(UserBase):
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
