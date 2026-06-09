from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from config.database import get_db
from crud.auth import register_user
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


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(payload: AuthRegister, db: Session = Depends(get_db)) -> User:
    if user_crud.get(db, email=payload.email):
        raise EmailAlreadyExistsException()

    if payload.password != payload.confirmPassword:
        raise PasswordMisMatchException()

    user = CreateUser (
        email=payload.email,
        password_hash=hash_password(payload.password),
    )

    return register_user(db, user)


@router.post("/login", response_model=TokenResponse)
def login(payload: AuthLogin, db: Session = Depends(get_db)) -> dict[str, str]:
    user = user_crud.get(db, email=payload.email)

    if not user or not verify_password(payload.password, user.password_hash):
        raise InvalidLoginException()

    token = create_access_token(user)

    return {"access_token": token, "token_type": "bearer"}


@router.post("/logout", status_code=status.HTTP_200_OK)
def logout(_=Depends(logout_user)) -> bool:
    return True


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user