from config.config import settings
from fastapi_sso.sso.google import GoogleSSO

google_sso = GoogleSSO(
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    redirect_uri="http://localhost:8000/auth/callback",
    allow_insecure_http=settings.ENV == 'development'
)