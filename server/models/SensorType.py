from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String

from models.base import UUIDBase

class SensorType(UUIDBase):
    __tablename__ = 'sensor_types'

    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    unit: Mapped[str] = mapped_column(String, nullable=False)
    