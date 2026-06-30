import sys
import os

from enums.device_status import DeviceStatus

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from datetime import datetime, timezone, timedelta
import random

from config.database import SessionLocal
from crud.user import user_crud
from crud.devices import device_crud
from crud.orgs import orgs_crud
from crud.sensor_reading import sensor_reading_crud
from crud.sensor_types import sensor_types_crud
from schemas.user import CreateUser
from schemas.device import CreateDevice
from schemas.orgs import CreateOrg
from schemas.sensor_types import CreateSensorType
from schemas.sensor_reading import BatchCreateSensorReading, CreateSensorReading
from enums.user_roles import UserRole
from utils.auth import hash_password


SENSOR_TYPES = [
    {"name": "temperature", "unit": "°C"},
    {"name": "pressure", "unit": "hPa"},
]

DEVICES = [
    {"name": "Greenhouse Monitor A", "location": "Greenhouse 1", "status": DeviceStatus.ONLINE},
    {"name": "Greenhouse Monitor B", "location": "Greenhouse 2", "status": DeviceStatus.ONLINE},
    {"name": "Office Sensor",        "location": "Main Office", "status": DeviceStatus.OFFLINE},
]


def seed():
    db = SessionLocal()
    try:
        # Sensor types
        sensor_types = []
        for st in SENSOR_TYPES:
            existing = sensor_types_crud.get(db, name=st["name"])
            if existing:
                sensor_types.append(existing)
            else:
                sensor_types.append(sensor_types_crud.create(db, CreateSensorType(**st)))

        # Admin user
        admin = user_crud.get(db, email="admin@example.com")
        if not admin:
            admin = user_crud.create(db, CreateUser(
                email="admin@example.com",
                password_hash=hash_password("admin1234"),
                role=UserRole.ADMIN,
            ))

        # Regular user
        customer = user_crud.get(db, email="user@example.com")
        if not customer:
            customer = user_crud.create(db, CreateUser(
                email="user@example.com",
                password_hash=hash_password("user1234"),
            ))

        # Default org
        org = orgs_crud.get(db, name="Default Org")
        if not org:
            org = orgs_crud.create(db, CreateOrg(name="Default Org"))
        orgs_crud.add_user(db, org, admin)
        orgs_crud.add_user(db, org, customer)

        # Devices (first two owned by org, third unclaimed)
        org_ids = [str(org.id), str(org.id), None]
        devices = []
        for spec, org_id in zip(DEVICES, org_ids):
            existing = device_crud.get(db, name=spec["name"], location=spec["location"], status=spec.get("status"))
            if existing:
                devices.append(existing)
                continue

            device = device_crud.create(db, CreateDevice(
                org_id=org_id,
                name=spec["name"],
                location=spec["location"],
                status=spec.get("status"),
            ))
            devices.append(device)

        # Sensor readings — 24 hours of hourly data for each owned device
        now = datetime.now(timezone.utc)
        for device in devices[:2]:
            readings = []
            for hours_ago in range(24, 0, -1):
                ts = now - timedelta(hours=hours_ago)
                for sensor_type in sensor_types:
                    readings.append(CreateSensorReading(
                        device_id=str(device.id),
                        sensor_type_id=str(sensor_type.id),
                        value=_sample_value(sensor_type.name, ts),
                    ))

            sensor_reading_crud.create_batch(
                db,
                BatchCreateSensorReading(readings=readings),
            )

        print(f"Seeded: {len(sensor_types)} sensor types, 2 users, 1 org, "
              f"{len(devices)} devices, {24 * len(sensor_types) * 2} readings")
    finally:
        db.close()


def _sample_value(sensor_name: str, ts: datetime) -> float:
    hour = ts.hour
    noise = random.uniform(-1, 1)

    if sensor_name == "temperature":
        return round(18 + 8 * (hour / 23) + noise, 2)
    if sensor_name == "pressure":
        return round(1013 + noise * 2, 2)
    return round(random.uniform(0, 100), 2)


if __name__ == "__main__":
    seed()
