from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session

from config.database import get_db
from crud.sensor_types import sensor_types_crud
from crud.devices import device_crud
from crud.sensor_reading import sensor_reading_crud
from exceptions.base import NotFoundException
from models.SensorReading import SensorReading
from schemas.sensor_reading import (
    CreateSensorReading,
    SensorReadingResponse,
    UpdateSensorReading,
)

router = APIRouter()


@router.post("", response_model=SensorReadingResponse, status_code=status.HTTP_201_CREATED)
def create_sensor_reading(
    payload: CreateSensorReading,
    db: Session = Depends(get_db),
) -> SensorReading:
    device = device_crud.get_by_id(db, payload.device_id)

    if device is None:
        raise NotFoundException(resource_name="Device", resource_id=payload.device_id)

    sensor_type = sensor_types_crud.get_by_id(db, payload.sensor_type_id)

    if sensor_type is None:
        raise NotFoundException(resource_name="Sensor Type", resource_id=payload.sensor_type_id)

    return sensor_reading_crud.create(db, payload)


@router.get("", response_model=list[SensorReadingResponse], status_code=status.HTTP_200_OK)
def get_sensor_readings(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1),
    db: Session = Depends(get_db),
) -> list[SensorReading]:
    return sensor_reading_crud.get_all(db, skip, limit)


@router.get("/{id}", response_model=SensorReadingResponse, status_code=status.HTTP_200_OK)
def get_sensor_reading(
    id: str,
    db: Session = Depends(get_db),
) -> SensorReading:
    sensor_reading = sensor_reading_crud.get_by_id(db, id)

    if sensor_reading is None:
        raise NotFoundException(resource_name="Sensor Reading", resource_id=id)

    return sensor_reading


@router.patch("/{id}", response_model=SensorReadingResponse, status_code=status.HTTP_200_OK)
def update_sensor_reading(
    id: str,
    payload: UpdateSensorReading,
    db: Session = Depends(get_db),
) -> SensorReading:
    sensor_reading = sensor_reading_crud.get_by_id(db, id)

    if sensor_reading is None:
        raise NotFoundException(resource_name="Sensor Reading", resource_id=id)

    return sensor_reading_crud.update(
        db,
        sensor_reading,
        payload,
    )


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sensor_reading(
    id: str,
    db: Session = Depends(get_db),
) -> None:
    sensor_reading = sensor_reading_crud.delete(db, id)

    if sensor_reading is None:
        raise NotFoundException(resource_name="Sensor Reading", resource_id=id)

    return None