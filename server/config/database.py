from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
import os
from config.config import settings

engine = create_engine(settings.DATABASE_URL)

sql_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "setup_timescale.sql")

with open(sql_file_path, "r", encoding="utf-8") as file:
    sql_script = file.read()

with engine.begin() as conn:
    conn.execute(text(sql_script))


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