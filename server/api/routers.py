from fastapi import APIRouter

from api.endpoints import auth_router, device_router, health, sensor_reading_router, sensor_types_router, users_router, websocket_endpoint 

router =  APIRouter()

router.include_router(health.router)

router.add_api_websocket_route("/ws/{client_id}", websocket_endpoint)

api_router = APIRouter(prefix="/api")

api_router.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
api_router.include_router(device_router.router, prefix="/devices", tags=["Device"])
api_router.include_router(sensor_reading_router.router, prefix="/sensor_readings", tags=["Sensor Reading"])
api_router.include_router(sensor_types_router.router, prefix="/sensor_types", tags=["Sensory Types"])
api_router.include_router(users_router.router, prefix="/users", tags=["User"])

router.include_router(api_router)
