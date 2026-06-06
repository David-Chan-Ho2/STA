import uuid

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from models.base import TimeScaleBase

class SensorReading(TimeScaleBase):
    __tablename__ = 'sensor_readings'

    device_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("devices.id"), primary_key=True, nullable=False, index=True)
    sensor_type_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sensor_types.id"), nullable=False)

    sensor_name: Mapped[str] = mapped_column(String, nullable=False)
    value: Mapped[float] = mapped_column(Float, nullable=False)
