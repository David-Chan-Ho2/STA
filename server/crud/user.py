import uuid
from sqlalchemy.orm import Session
from models.User import User
from schemas.user import UserRegister
from utils.auth import hash_password

def register_user(db: Session, payload: UserRegister):
    user = User(
        id=uuid.uuid4(),
        email=payload.email,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == uuid.UUID(user_id)).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()
