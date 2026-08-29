from typing import TYPE_CHECKING

from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import UUIDBase, CreatedAtBase
from enums.organization_types import OrganizationType

if TYPE_CHECKING:
    from models.User import User
    from models.Device import Device

class Organization(UUIDBase, CreatedAtBase):
    __tablename__ = 'organizations'

    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[OrganizationType] = mapped_column(Enum(OrganizationType),  nullable=False)
    
    users: Mapped[list["User"]] = relationship("User", back_populates="org")
    devices: Mapped[list["Device"]] = relationship("Device", back_populates="org")
