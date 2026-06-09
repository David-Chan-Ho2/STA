from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session

from config.database import get_db
from crud.sensor_types import sensor_types_crud
from exceptions.base import NotFoundException
from models.SensorType import SensorType
from schemas.sensor_types import CreateSensorType, UpdateSensorType, SensorTypeResponse

router = APIRouter()


@router.post("", response_model=SensorTypeResponse, status_code=status.HTTP_201_CREATED)
def create_sensor_type(
    payload: CreateSensorType,
    db: Session = Depends(get_db),
) -> SensorType:
    return sensor_types_crud.create(db, payload)


@router.get("", response_model=list[SensorTypeResponse], status_code=status.HTTP_200_OK)
def get_sensor_types(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1),
    db: Session = Depends(get_db),
) -> list[SensorType]:
    return sensor_types_crud.get_all(db, skip, limit)


@router.get("/{id}", response_model=SensorTypeResponse, status_code=status.HTTP_200_OK)
def get_sensor_type(
    id: str,
    db: Session = Depends(get_db),
) -> SensorType:
    sensor_type = sensor_types_crud.get_by_id(db, id)

    if sensor_type is None:
        raise NotFoundException(resource_name="Sensor Type", resource_id=id)

    return sensor_type


@router.patch("/{id}", response_model=SensorTypeResponse, status_code=status.HTTP_200_OK)
def update_sensor_type(
    id: str,
    payload: UpdateSensorType,
    db: Session = Depends(get_db),
) -> SensorType:
    sensor_type = sensor_types_crud.get_by_id(db, id)

    if sensor_type is None:
        raise NotFoundException(resource_name="Sensor Type", resource_id=id)

    return sensor_types_crud.update(
        db,
        sensor_type,
        payload,
    )


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sensor_type(
    id: str,
    db: Session = Depends(get_db),
) -> None:
    sensor_type = sensor_types_crud.delete(db, id)

    if sensor_type is None:
        raise NotFoundException(resource_name="Sensor Type", resource_id=id)

    return None