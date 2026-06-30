from fastapi import APIRouter, Depends, status, Request, HTTPException
from sqlalchemy.orm import Session

from config.sso import google_sso
from config.database import get_db
from crud.user import user_crud
from exceptions.base import (
    EmailAlreadyExistsException,
    InvalidLoginException,
    PasswordMisMatchException,
)
from models.User import User
from schemas.user import UserResponse, CreateUser
from schemas.auth import AuthRegister, AuthLogin, TokenResponse
from utils.auth import (
    verify_password,
    create_access_token,
    get_current_user,
    logout_user,
    hash_password,
)

router = APIRouter()

@router.post('/email/register', response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(payload: AuthRegister, db: Session = Depends(get_db)) -> User:
    if user_crud.get(db, email=payload.email):
        raise EmailAlreadyExistsException()

    if payload.password != payload.confirmPassword:
        raise PasswordMisMatchException()

    user = CreateUser (
        email=payload.email,
        password_hash=hash_password(payload.password),
    )

    return user_crud.create(db, user)

@router.post('/email/login', response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(payload: AuthLogin, db: Session = Depends(get_db)):
    user = user_crud.get(db, email=payload.email)

    if not user or not verify_password(payload.password, user.password_hash):
        raise InvalidLoginException()

    token = create_access_token(user)

    return {"access_token": token, "token_type": "bearer"}

@router.get("/sso/login")
async def auth_login():
    with google_sso:
        return await google_sso.get_login_redirect()

@router.get("/sso/callback")
async def auth_callback(request: Request):
    with google_sso:
        try:
            user = await google_sso.verify_and_process(request)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Authentication failed: {str(e)}")
            
    return {
        "message": "Successfully authenticated!",
        "user_id": user.id,
        "email": user.email,
        "display_name": user.display_name,
        "picture": user.picture
    }

@router.get('/logout', response_model=None, status_code=status.HTTP_200_OK)
def logout(_=Depends(logout_user)) -> bool:
    return True

@router.get("/me", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user

@router.post('/verify-email', response_model=UserResponse, status_code=status.HTTP_200_OK)
def verify():
    pass
