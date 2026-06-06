from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String

from models.base import Base

class SensorType(Base):
    __tablename__ = 'sensor_types'

    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    unit: Mapped[str] = mapped_column(String, nullable=False)
    