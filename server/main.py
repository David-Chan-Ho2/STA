from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config.database import engine, Base
from config.config import settings
from api import routers

import models

# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,      
    allow_credentials=True,    
    allow_methods=["*"],        
    allow_headers=["*"],     
)

app.include_router(routers.router, prefix="/api")

@app.get("/")
def health_check():
    return {
        "status": "healthy",
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT
    )