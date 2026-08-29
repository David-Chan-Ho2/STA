import uuid
from typing import Optional, TYPE_CHECKING

from sqlalchemy import String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from enums.device_status import DeviceStatus

from models.base import UUIDBase, CreatedAtBase

if TYPE_CHECKING:
    from models.Organization import Organization
    from models.SensorReading import SensorReading

class Device(UUIDBase, CreatedAtBase):
    __tablename__ = 'devices'

    org_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="SET NULL"), nullable=True)

    name: Mapped[str] = mapped_column(String, nullable=False)
    location: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[DeviceStatus] = mapped_column(Enum(DeviceStatus), default=DeviceStatus.OFFLINE, nullable=False)

    serial_number: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, nullable=False)

    claim_code: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, nullable=False)
    claimed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    org: Mapped[Optional["Organization"]] = relationship("Organization", back_populates="devices")
    readings: Mapped[list["SensorReading"]] = relationship("SensorReading", cascade="all, delete-orphan")
