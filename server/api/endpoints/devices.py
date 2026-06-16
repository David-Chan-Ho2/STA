from fastapi import Depends, status
from sqlalchemy.orm import Session

from config.database import get_db
from crud.user import user_crud
from crud.devices import device_crud
from exceptions.base import NotFoundException
from schemas.device import DeviceResponse, CreateDevice, UpdateDevice, ClaimDevice
from api.endpoints.base import BaseRouter
from schemas.sensor_reading import SensorReadingResponse
from datetime import datetime, UTC

class DeviceRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=device_crud,
            response_schema=DeviceResponse,
            create_schema=CreateDevice,
            update_schema=UpdateDevice,
            name="Device"
        )
        self.router.add_api_route(
            '/{id}/readings', 
            self.get_readings, 
            methods=['GET'], 
            response_model=list[SensorReadingResponse], 
            status_code=status.HTTP_200_OK
        )
        self.router.add_api_route(
            '/claim/{claim_code}', 
            self.claim_device, 
            methods=['POST'], 
            response_model=DeviceResponse, 
            status_code=status.HTTP_200_OK
        )

    def create(
        self,
        payload: CreateDevice,
        db: Session = Depends(get_db),
    ):
        if payload.user_id and user_crud.get_by_id(db, payload.user_id) is None:
            raise NotFoundException(resource_name="User")

        return super().create(payload, db)

    def get_readings(
            self,
            id: str,
            db: Session = Depends(get_db),
    ):
        device = self.get_by_id(id, db)
        return device.readings
    
    def claim_device(
            self, 
            payload: ClaimDevice,
            claim_code: str,
            db: Session = Depends(get_db)
        ):
        device = self.crud.get(db, claim_code=claim_code)

        if device is None:
            raise NotFoundException(resource_name="Device")
        
        user = user_crud.get_by_id(db, payload.user_id)

        if user is None:
            raise NotFoundException(resource_name="User")
        
        payload.claimed_at = datetime.now(UTC)
        
        return self.update(payload, device.id,db)
    

device_router = DeviceRouter()