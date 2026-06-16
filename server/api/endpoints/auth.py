from fastapi import Depends, status
from sqlalchemy.orm import Session
from api.endpoints.base import BaseRouter
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

class AuthRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=user_crud, 
            response_schema=None, 
            name="Auth", 
            disable_create=True, 
            disable_get_all=True, 
            disable_get_by_id=True, 
            disable_update=True, 
            disable_delete=True
        )

        self.router.add_api_route(
            "/register",
            self.register,
            methods=["POST"],
            response_model=UserResponse,
            status_code=status.HTTP_201_CREATED
        )
        self.router.add_api_route(
            "/login",
            self.login,
            methods=["POST"],
            response_model=TokenResponse,
            status_code=status.HTTP_200_OK
        )
        self.router.add_api_route(
            "/logout",
            self.logout,
            response_model=None,
            status_code=status.HTTP_200_OK
        )
        self.router.add_api_route(
            "/me",
            self.get_me,
            response_model=UserResponse, 
            status_code=status.HTTP_200_OK
        )

    def register(self, payload: AuthRegister, db: Session = Depends(get_db)) -> User:
        if user_crud.get(db, email=payload.email):
            raise EmailAlreadyExistsException()

        if payload.password != payload.confirmPassword:
            raise PasswordMisMatchException()

        user = CreateUser (
            email=payload.email,
            password_hash=hash_password(payload.password),
        )

        return super().create(user, db)
    
    def login(self, payload: AuthLogin, db: Session = Depends(get_db)):
        user = user_crud.get(db, email=payload.email)

        if not user or not verify_password(payload.password, user.password_hash):
            raise InvalidLoginException()

        token = create_access_token(user)

        return {"access_token": token, "token_type": "bearer"}
    
    def logout(self, _=Depends(logout_user)) -> bool:
        return True

    def get_me(self, current_user: User = Depends(get_current_user)) -> User:
        return current_user
    
auth_router = AuthRouter()