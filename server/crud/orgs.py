from sqlalchemy.orm import Session

from models.Org import Org
from models.User import User
from crud.base import CRUDBase


class OrgCRUD(CRUDBase):
    def __init__(self):
        super().__init__(Org)

    def add_user(self, db: Session, org: Org, user: User) -> Org:
        user.org_id = org.id
        db.commit()
        db.refresh(org)
        return org

    def remove_user(self, db: Session, org: Org, user: User) -> Org:
        user.org_id = None
        db.commit()
        db.refresh(org)
        return org


orgs_crud = OrgCRUD()
