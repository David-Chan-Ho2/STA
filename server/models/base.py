import uuid
from sqlalchemy.orm import DeclarativeBase, MappedColumn
import uuid
from datetime import datetime, timezone

from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import DateTime


class Base(DeclarativeBase):
    id: MappedColumn[uuid.UUID]

class TimeScaleBase(DeclarativeBase):
    id: None
    time: Mapped[datetime] = mapped_column(DateTime, primary_key=True, default=lambda: datetime.now(timezone.utc), nullable=False)