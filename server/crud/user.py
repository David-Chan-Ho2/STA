from sqlalchemy.orm import Session
from models.User import User
from crud.base import CRUDBase

crud = CRUDBase(User)

def get_user_by_id(db: Session, user_id: str) -> User | None:
    return crud.get_by_id(db, user_id)


def get_user_by_email(db: Session, email: str) -> User | None:
    return crud.get(db, email=email)
