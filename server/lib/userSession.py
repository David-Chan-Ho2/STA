import redis
from datetime import datetime, timezone
import uuid
from typing import Optional
from models.User import User

from config.config import settings

class UserSession:

    def __init__(self) -> None:
        
        self.redis = redis.from_url(
            settings.REDIS_URL,
            decode_responses=True
        )

    def _generate_id(self) -> str:
        return str(uuid.uuid4())

    def _session_key(self, session_id: str) -> str:
        return f"session:{session_id}"

    def _timestamp(self) -> str:
        return datetime.now(timezone.utc).replace(microsecond=0).isoformat()

    def create_session(self, user: User, exp_sec:int=settings.SESSION_TIMEOUT_SECONDS) -> str:
        session_id = self._generate_id()
        session_key = self._session_key(session_id)
        now = self._timestamp()

        payload = {}

        payload.update({
            "user_id": user.id,
            "user_email": user.email,
            "created_at": now,
        })

        self.redis.hset(session_key, mapping=payload)
        self.redis.expire(session_key, exp_sec)

        return session_id

    def get_session(self, session_id: str) -> Optional[dict]:
        session_key = self._session_key(session_id)
        session_data = self.redis.hgetall(session_key)

        if session_data:
            return session_data
        
        return None

    def delete_session(self, session_id: str) -> bool:
        session_key = self._session_key(session_id)

        return self.redis.delete(session_key) == 1

