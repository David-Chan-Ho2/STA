from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session

from config.database import get_db
from crud.user import user_crud
from crud.devices import device_crud
from exceptions.base import NotFoundException
from models.Device import Device
from schemas.device import CreateDevice, DeviceResponse, UpdateDevice

router = APIRouter()


@router.post("", response_model=DeviceResponse, status_code=status.HTTP_201_CREATED)
def create_device(
    payload: CreateDevice,
    db: Session = Depends(get_db),
) -> Device:
    user = user_crud.get_by_id(db, payload.user_id)

    if user is None:
        raise NotFoundException(resource_name="User", resource_id=payload.user_id)

    return device_crud.create(db, payload)


@router.get("", response_model=list[DeviceResponse], status_code=status.HTTP_200_OK)
def get_devices(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1),
    db: Session = Depends(get_db),
) -> list[Device]:
    return device_crud.get_all(db, skip, limit)


@router.get("/{id}", response_model=DeviceResponse, status_code=status.HTTP_200_OK)
def get_device(
    id: str,
    db: Session = Depends(get_db),
) -> Device:
    device = device_crud.get_by_id(db, id)

    if device is None:
        raise NotFoundException(resource_name="Device", resource_id=id)

    return device


@router.patch("/{id}", response_model=DeviceResponse, status_code=status.HTTP_200_OK)
def update_device(
    id: str,
    payload: UpdateDevice,
    db: Session = Depends(get_db),
) -> Device:
    device = device_crud.get_by_id(db, id)

    if device is None:
        raise NotFoundException(resource_name="Device", resource_id=id)

    return device_crud.update(
        db,
        device,
        payload,
    )


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_device(
    id: str,
    db: Session = Depends(get_db),
) -> None:
    device = device_crud.delete(db, id)

    if device is None:
        raise NotFoundException(resource_name="Device", resource_id=id)

    return None