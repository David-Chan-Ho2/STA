from sqlalchemy.orm import Session
from sqlalchemy import desc

from models.Device import Device
from models.Organization import Organization
from models.SensorReading import SensorReading
from enums.device_status import DeviceStatus

from crud.base import CRUDBase


class DeviceCrud(CRUDBase):
    def __init__(self):
        super().__init__(Device)

    def lastest_reading(self, id: str, db: Session):
        return db.query(SensorReading).filter(SensorReading.id == id).order_by(desc(SensorReading.time)).first()

    def get_stats(self, org: Organization):
        devices = org.devices if org else []

        total = len(devices)
        online = len([d for d in devices if d.status == DeviceStatus.ONLINE])
        offline = len([d for d in devices if d.status == DeviceStatus.OFFLINE])

        return {
            'total': total,
            'online': online,
            'offline': offline,
        }


device_crud = DeviceCrud()