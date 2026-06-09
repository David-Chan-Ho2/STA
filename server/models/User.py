from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import UUIDBase, CreatedAtBase

class User(UUIDBase, CreatedAtBase):
    __tablename__ = 'users'

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    devices: Mapped[list["Device"]] = relationship("Device", back_populates="user", cascade="all, delete-orphan")
