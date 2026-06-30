from fastapi import Depends, status
from sqlalchemy.orm import Session
from datetime import datetime, UTC

from api.endpoints.base import BaseRouter
from config.database import get_db
from crud.orgs import orgs_crud
from crud.devices import device_crud
from exceptions.base import NotFoundException
from models import User
from schemas.device import DeviceResponse, CreateDevice, UpdateDevice, ClaimDevice, DeviceStatsResponse
from schemas.sensor_reading import SensorReadingResponse
from utils.auth import get_current_user


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
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/latest',
            self.latest_reading,
            methods=['GET'],
            response_model=SensorReadingResponse,
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/claim/{claim_code}',
            self.claim_device,
            methods=['POST'],
            response_model=DeviceResponse,
            status_code=status.HTTP_200_OK,
        )

    def _register_pre_id_routes(self):
        self.router.add_api_route(
            '/stats',
            self.get_stats,
            methods=['GET'],
            response_model=DeviceStatsResponse,
            status_code=status.HTTP_200_OK,
        )

    def create(self, payload: CreateDevice, db: Session = Depends(get_db)):
        if payload.org_id and orgs_crud.get_by_id(db, payload.org_id) is None:
            raise NotFoundException(resource_name="Org")
        return super().create(payload, db)

    def get_readings(self, id: str, db: Session = Depends(get_db)):
        device = self.get_by_id(id, db)
        return device.readings

    def latest_reading(self, id: str, db: Session = Depends(get_db)):
        self.get_by_id(id, db)
        return self.crud.lastest_reading(id, db)

    def claim_device(self, payload: ClaimDevice, claim_code: str, db: Session = Depends(get_db)):
        device = self.crud.get(db, claim_code=claim_code)
        if device is None:
            raise NotFoundException(resource_name="Device")

        org = orgs_crud.get_by_id(db, payload.org_id)
        if org is None:
            raise NotFoundException(resource_name="Org")

        payload.claimed_at = datetime.now(UTC)
        return self.update(payload, device.id, db)

    def get_stats(self, current_user: User = Depends(get_current_user)):
        return self.crud.get_stats(current_user.org)


device_router = DeviceRouter()