from typing import Any, Generic, List, Optional, Type, TypeVar
from sqlalchemy.orm import Session
from config.database import Base

ModelType = TypeVar("ModelType", bound=Base)

class CRUDBase(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        """
        Base class that takes a SQLAlchemy model to provide generic CRUD operations.
        """
        self.model = model

    def get(self, db: Session, **filters: Any) -> Optional[ModelType]:
        return db.query(self.model).filter_by(**filters).first()
    
    def get_by_id(self, db: Session, id: str) -> Optional[ModelType]:
        return self.get(db, id=id)

    def get_all(self, db: Session, skip: int = 0, limit: int = 100, **kwargs: Any) -> List[ModelType]:
        return db.query(self.model).filter_by(**kwargs).offset(skip).limit(limit).all()

    def create(self, db: Session, obj_in: Any) -> ModelType:
        db_obj = self.model(**obj_in.model_dump())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, db_obj: ModelType, obj_in: Any) -> ModelType:
        update_data = obj_in.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(db_obj, key, value)

        db.commit()
        db.refresh(db_obj)
        return db_obj
    

    def delete(self, db: Session, id: str) -> Optional[ModelType]:
        obj = db.get(self.model, id)
        if obj is None:
            return None
        db.delete(obj)
        db.commit()
        return obj
    