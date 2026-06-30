from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import UUIDBase, CreatedAtBase

if TYPE_CHECKING:
    from models.User import User
    from models.Device import Device

class Org(UUIDBase, CreatedAtBase):
    __tablename__ = 'orgs'

    name: Mapped[str] = mapped_column(String, nullable=False)
    users: Mapped[list["User"]] = relationship("User", back_populates="org")
    devices: Mapped[list["Device"]] = relationship("Device", back_populates="org")
