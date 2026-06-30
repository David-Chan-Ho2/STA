import uuid
from typing import Optional

from sqlalchemy import String, Enum as SAEnum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from models.base import UUIDBase, CreatedAtBase
from enums.user_roles import UserRole

class User(UUIDBase, CreatedAtBase):
    __tablename__ = 'users'

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole), default=UserRole.CUSTOMER, nullable=False)
    org_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("orgs.id", ondelete="SET NULL"), nullable=True)

    org: Mapped[Optional["Org"]] = relationship("Org", back_populates="users")
