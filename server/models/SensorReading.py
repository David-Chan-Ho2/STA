import uuid
from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Float, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.dialects.postgresql import UUID

from models.base import TimeScaleBase

if TYPE_CHECKING:
    from models.Device import Device


class SensorReading(TimeScaleBase):
    __tablename__ = 'sensor_readings'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), default=uuid.uuid4)
    device_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("devices.id"), nullable=False, index=True)
    sensor_type_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sensor_types.id"), nullable=False, index=True)

    value: Mapped[float] = mapped_column(Float, nullable=False)
    
    device: Mapped["Device"] = relationship("Device", back_populates="readings")
    type: Mapped["SensorType"] = relationship("SensorType")

    __table_args__ = (
        PrimaryKeyConstraint("id", "time"),
    )