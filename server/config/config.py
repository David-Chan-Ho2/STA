import os 
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PORT = int(os.getenv("PORT", 8000))
    ENV = os.getenv("ENV", "development")
    
    SECRET_KEY = os.getenv("SECRET_KEY", "6c55fd158b8337b7ac8cfb5f786566a0fcce17e8cb65bbfadefbfbd624565a00")

    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/sta")

    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")

    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
    SESSION_TIMEOUT_SECONDS = 1800

settings = Settings()