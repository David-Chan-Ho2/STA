from models.SensorReading import SensorReading
from crud.base import CRUDBase
from typing import Any, Generic, List, Optional, Type, TypeVar
from sqlalchemy.orm import Session
from config.database import Base

# class SensorReadingCrud(CRUDBase):
#     def __init__(self):
#         super().__init__(SensorReading)

#     def get(self, db: Session, **kwargs: Any) -> Optional[SensorReading]:
#         return db.query(self.model).filter_by(**kwargs).first()
    
#     def get_by_id(self, db: Session, id: str) -> None:
#         return
    
#     def get_by_time(self, db: Session, time: str) -> Optional[SensorReading]:
#         return db.query(self.model).filter_by(time=time).first()

#     def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> List[SensorReading]:
#         return db.query(self.model).offset(skip).limit(limit).all()
    
#     def get_all_filtered(self, db: Session, skip: int = 0, limit: int = 100, **kwargs: Any) -> List[SensorReading]:
#         return db.query(self.model).filter_by(**kwargs).offset(skip).limit(limit).all()
    
#     def create(self, db: Session, obj_in: Any) -> SensorReading:
#         db_obj = self.model(**obj_in.model_dump())
#         db.add(db_obj)
#         db.commit()
#         db.refresh(db_obj)
#         return db_obj

#     def update(self, db: Session, db_obj: SensorReading, obj_in: Any) -> SensorReading:
#         update_data = obj_in.model_dump(
#             exclude_unset=True
#         )

#         for key, value in update_data.items():
#             setattr(db_obj, key, value)

#         db.commit()
#         db.refresh(db_obj)
#         return db_obj
    

#     def delete(self, db: Session, id: str) -> Optional[SensorReading]:
#         obj = db.get(self.model, id)
#         if obj is None:
#             return None
#         db.delete(obj)
#         db.commit()
#         return obj

sensor_reading_crud = CRUDBase(SensorReading)
