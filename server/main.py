from fastapi import FastAPI
import uvicorn

from config.database import Base, engine
from api import routers

import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(routers.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)