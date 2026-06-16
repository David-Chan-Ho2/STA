from fastapi import Depends, status
from sqlalchemy.orm import Session

from config.database import get_db
from crud.sensor_types import sensor_types_crud
from crud.devices import device_crud
from crud.sensor_reading import sensor_reading_crud
from exceptions.base import NotFoundException
from schemas.sensor_reading import (
    BatchCreateSensorReading,
    BatchInsertResponse,
    CreateSensorReading,
    SensorReadingResponse
)
from api.endpoints.base import BaseRouter

class SensorReadingRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=sensor_reading_crud,
            response_schema=SensorReadingResponse,
            create_schema=CreateSensorReading,
            name="SensorReading",
            disable_update=True,
            disable_delete=True,
        )

        self.router.add_api_route(
            "/batch",
            self.create_batch,
            methods=["POST"],
            response_model=BatchInsertResponse,
            status_code=status.HTTP_201_CREATED
        )

    def create(self, payload: CreateSensorReading, db: Session = Depends(get_db)) -> SensorReadingResponse:
        device = device_crud.get_by_id(db, payload.device_id)

        if device is None:
            raise NotFoundException(resource_name="Device")

        sensor_type = sensor_types_crud.get_by_id(db, payload.sensor_type_id)

        if sensor_type is None:
            raise NotFoundException(resource_name="Sensor Type")

        return super().create(payload, db)

    def create_batch(
        self,
        payload: BatchCreateSensorReading,
        db: Session = Depends(get_db),
    ) -> BatchInsertResponse:
        unique_device_ids = {r.device_id for r in payload.readings}
        for device_id in unique_device_ids:
            if device_crud.get_by_id(db, device_id) is None:
                raise NotFoundException(resource_name="Device")

        unique_sensor_type_ids = {r.sensor_type_id for r in payload.readings}
        for sensor_type_id in unique_sensor_type_ids:
            if sensor_types_crud.get_by_id(db, sensor_type_id) is None:
                raise NotFoundException(resource_name="Sensor Type")

        result = sensor_reading_crud.create_batch(db, payload)
        return BatchInsertResponse(**result)

sensor_reading_router = SensorReadingRouter()
