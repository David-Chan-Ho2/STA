import uuid
from typing import Optional

from sqlalchemy import String, ForeignKey, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from enums.device_status import DeviceStatus

from models.base import UUIDBase, CreatedAtBase

class Device(UUIDBase, CreatedAtBase):
    __tablename__ = 'devices'

    org_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("orgs.id", ondelete="SET NULL"), nullable=True)

    name: Mapped[str] = mapped_column(String, nullable=False)
    location: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[DeviceStatus] = mapped_column(SAEnum(DeviceStatus), default=DeviceStatus.OFFLINE, nullable=False)

    serial_number: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), unique=True, default=uuid.uuid4, nullable=False)

    claim_code: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), default=uuid.uuid4, unique=True, nullable=False)
    claimed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    org: Mapped[Optional["Org"]] = relationship("Org", back_populates="devices")
    readings: Mapped[list["SensorReading"]] = relationship("SensorReading", cascade="all, delete-orphan")
