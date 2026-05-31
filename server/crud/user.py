import uuid
from sqlalchemy.orm import Session
from models.User import User


def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == uuid.UUID(user_id)).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()
