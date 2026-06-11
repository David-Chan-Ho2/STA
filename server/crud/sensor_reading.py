from typing import Any, Optional

from sqlalchemy import delete as sql_delete
from sqlalchemy.orm import Session
from models.SensorReading import SensorReading
from crud.base import CRUDBase

class SensorReadingCRUD(CRUDBase):
    def __init__(self):
        super().__init__(SensorReading)

    def create_batch(self, db: Session, payload: Any):
        rows = [
            SensorReading(**r.model_dump())
            for r in payload.readings
        ]

        db.bulk_save_objects(rows)
        db.commit()

        return {
            "inserted": len(rows)
        }

    def delete(self, db: Session, id: str) -> bool:
        result = db.execute(sql_delete(self.model).where(self.model.id == id))
        db.commit()
        return result.rowcount > 0

    def update(self, db: Session, db_obj: Any, obj_in: Any):
        raise NotImplementedError("Sensor readings cannot be updated.")

sensor_reading_crud = SensorReadingCRUD()
