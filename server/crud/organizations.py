from sqlalchemy.orm import Session

from models.Organization import Organization
from models.User import User
from crud.base import CRUDBase


class OrganizationCRUD(CRUDBase):
    def __init__(self):
        super().__init__(Organization)

    def add_user(self, db: Session, org: Organization, user: User) -> Organization:
        user.org_id = org.id
        db.commit()
        db.refresh(org)
        return org

    def remove_user(self, db: Session, org: Organization, user: User) -> Organization:
        user.org_id = None
        db.commit()
        db.refresh(org)
        return org

organizations_crud = OrganizationCRUD()
