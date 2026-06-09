from fastapi import APIRouter

from api.endpoints import auth, devices, sensor_reading, sensor_types, users, healthy

router = APIRouter()

router.include_router(healthy.router, prefix="/healthy", tags=["Healthy"])
router.include_router(auth.router, prefix="/auth", tags=["Auth"])
router.include_router(devices.router, prefix="/devices", tags=["Device"])
router.include_router(sensor_reading.router, prefix="/sensor_reading", tags=["Sensor Reading"])
router.include_router(sensor_types.router, prefix="/sensor_types", tags=["Sensory Types"])
router.include_router(users.router, prefix="/users", tags=["User"])