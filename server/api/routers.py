from fastapi import APIRouter

from api.endpoints import auth_router, device_router, sensor_reading_router, sensor_types_router, users_router

router = APIRouter()

router.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
router.include_router(device_router.router, prefix="/devices", tags=["Device"])
router.include_router(sensor_reading_router.router, prefix="/sensor_readings", tags=["Sensor Reading"])
router.include_router(sensor_types_router.router, prefix="/sensor_types", tags=["Sensory Types"])
router.include_router(users_router.router, prefix="/users", tags=["User"])
