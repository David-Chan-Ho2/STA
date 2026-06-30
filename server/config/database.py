from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
from config.config import settings

engine = create_engine(settings.DATABASE_URL)


def setup_timescale() -> None:
    with engine.connect().execution_options(isolation_level="AUTOCOMMIT") as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS timescaledb"))

    with engine.begin() as conn:
        conn.execute(text(
            "SELECT create_hypertable('sensor_readings', 'time', "
            "if_not_exists => TRUE, migrate_data => TRUE)"
        ))


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session