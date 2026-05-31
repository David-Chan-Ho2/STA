from fastapi import APIRouter

from api.endpoints import user

router = APIRouter()

router.include_router(user.router, prefix="/user", tags=["User"])