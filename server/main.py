from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from sqlalchemy import text

from config.database import engine
from models.base import Base
from config.config import settings
from api import routers

import models

if settings.ENV == "development":
    Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# with engine.begin() as conn:
#     conn.execute(text("""
#         CREATE EXTENSION IF NOT EXISTS timescaledb;
#     """))

#     conn.execute(text("""
#         SELECT create_hypertable(
#             'sensor_readings',
#             'time',
#             if_not_exists => TRUE
#         );
#     """))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,      
    allow_credentials=True,    
    allow_methods=["*"],        
    allow_headers=["*"],     
)

app.include_router(routers.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT
    )