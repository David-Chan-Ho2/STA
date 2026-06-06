import uuid
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timezone

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import DateTime


class Base(DeclarativeBase):
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

class TimeScaleBase(DeclarativeBase):
    id: None
    time: Mapped[datetime] = mapped_column(DateTime, primary_key=True, default=lambda: datetime.now(timezone.utc), nullable=False)