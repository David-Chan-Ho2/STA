from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from config.database import get_db
from crud.auth import register_user
from crud.user import get_user_by_email
from models.User import User
from schemas.user import UserRegister, UserLogin, TokenResponse, UserResponse
from utils.auth import verify_password, create_access_token, get_current_user, logout_user, hash_password

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister, db: Session = Depends(get_db)):
    if get_user_by_email(db, payload.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    if(payload.password != payload.confirmPassword):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Password don't match")
    
    user = {
        "email": payload.email,
        "password_hash": hash_password(payload.password)
    }
    
    return register_user(db, user)


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, payload.email)

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(user)

    return {"access_token": token, "token_type": "bearer"}

@router.post("/logout")
def logout(_=Depends(logout_user)):
    return True

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
