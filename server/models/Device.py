import uuid
from enum import Enum

from sqlalchemy import String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from models.base import UUIDBase, CreatedAtBase

class Device(UUIDBase, CreatedAtBase):
    __tablename__ = 'devices'
    __table_args__ = (UniqueConstraint("user_id", "name"),)

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    location: Mapped[str] = mapped_column(String, nullable=False)
    
    user: Mapped["User"] = relationship("User", back_populates="devices")
    readings: Mapped[list["SensorReading"]] = relationship("SensorReading", cascade="all, delete-orphan")
