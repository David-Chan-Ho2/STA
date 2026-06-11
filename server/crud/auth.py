from typing import Any

from sqlalchemy.orm import Session
from models.User import User
from crud.base import CRUDBase

class AuthCrud(CRUDBase):
    def __init__(self):
        super().__init__(User)

    def create(self, db: Session, obj_in: Any) -> Any:
        db_obj = self.model(**obj_in.model_dump())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
auth_crud = AuthCrud()
