from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config.database import Base, engine
from config.config import settings
from api import routers

import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,    
    allow_methods=["*"],        
    allow_headers=["*"],     
)

app.include_router(routers.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)