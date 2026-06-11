from fastapi import Depends, status
from sqlalchemy.orm import Session

from config.database import get_db
from crud.user import user_crud
from crud.devices import device_crud
from exceptions.base import NotFoundException
from schemas.device import DeviceResponse, CreateDevice, UpdateDevice
from api.endpoints.base import BaseRouter
from schemas.sensor_reading import SensorReadingResponse

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

    def create(
        self,
        payload: CreateDevice,
        db: Session = Depends(get_db),
    ):
        user = user_crud.get_by_id(db, payload.user_id)

        if user is None:
            raise NotFoundException(resource_name="User", resource_id=payload.user_id)
        
        return super().create(payload, db)

    def update(
        self,
        payload: UpdateDevice,
        id: str,
        db: Session = Depends(get_db),
    ):
        return super().update(payload, id, db)
    
    def get_readings(
            self,
            id: str,
            db: Session = Depends(get_db),
    ):
        device = self.get(id, db)

        if device is None:
            raise NotFoundException(resource_name="Device", resource_id=id)
        
        return device.readings
        

device_router = DeviceRouter()