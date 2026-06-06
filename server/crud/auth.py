from pydantic import EmailStr
from sqlalchemy.orm import Session
from models.User import User
from crud.base import CRUDBase

crud = CRUDBase(User)

def register_user(db: Session, payload: dict[str, EmailStr]):
    return crud.create(db, payload)
