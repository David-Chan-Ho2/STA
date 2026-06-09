from sqlalchemy.orm import Session
from models.User import User
from crud.base import CRUDBase

user_crud = CRUDBase(User)
