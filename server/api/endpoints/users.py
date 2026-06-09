from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session

from config.database import get_db
from crud.user import user_crud
from exceptions.base import NotFoundException
from models.User import User
from schemas.user import UserResponse

router = APIRouter()


@router.get("", response_model=list[UserResponse], status_code=status.HTTP_200_OK)
def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1),
    db: Session = Depends(get_db),
) -> list[User]:
    return user_crud.get_all(db, skip, limit)


@router.get("/{id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_user(
    id: str,
    db: Session = Depends(get_db),
) -> User:
    user = user_crud.get_by_id(db, id)

    if user is None:
        raise NotFoundException(resource_name="User", resource_id=id)

    return user