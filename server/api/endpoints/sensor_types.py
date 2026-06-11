from api.endpoints.base import BaseRouter
from crud.sensor_types import sensor_types_crud
from schemas.sensor_types import SensorTypeResponse, CreateSensorType, UpdateSensorType

class SensorTypesRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=sensor_types_crud, 
            response_schema=SensorTypeResponse, 
            create_schema=CreateSensorType,
            update_schema=UpdateSensorType,
            name="SensorType"
        )

sensor_types_router = SensorTypesRouter()