from fastapi import FastAPI

from config.database import Base, engine
from api import routers

import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(routers.router, prefix="/api")
