from datetime import datetime
from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base

class User(Base):
    __tablename__ = 'users'

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    devices: Mapped[list["Device"]] = relationship("Device", cascade="all, delete-orphan")

    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now()
    )