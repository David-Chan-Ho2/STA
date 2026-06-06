import uuid
from datetime import datetime

from sqlalchemy import String, func, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from models.base import Base

class Device(Base):
    __tablename__ = 'devices'
    __table_args__ = (UniqueConstraint("user_id", "name"),)

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    
    user: Mapped["User"] = relationship("User")
    readings: Mapped[list["SensorReading"]] = relationship("SensorReading", cascade="all, delete-orphan")

    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now()
    )
