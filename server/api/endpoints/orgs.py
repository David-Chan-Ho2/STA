from fastapi import Depends, status
from sqlalchemy.orm import Session

from api.endpoints.base import BaseRouter
from config.database import get_db
from crud.orgs import orgs_crud
from crud.user import user_crud
from exceptions.base import NotFoundException
from schemas.orgs import OrgResponse, CreateOrg, UpdateOrg, OrgUserResponse, OrgDeviceResponse


class OrgsRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=orgs_crud,
            response_schema=OrgResponse,
            create_schema=CreateOrg,
            update_schema=UpdateOrg,
            name="Org"
        )
        self.router.add_api_route(
            '/{id}/users',
            self.get_org_users,
            methods=['GET'],
            response_model=list[OrgUserResponse],
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/users/{user_id}',
            self.add_user_to_org,
            methods=['POST'],
            response_model=OrgResponse,
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/users/{user_id}',
            self.remove_user_from_org,
            methods=['DELETE'],
            response_model=OrgResponse,
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/devices',
            self.get_org_devices,
            methods=['GET'],
            response_model=list[OrgDeviceResponse],
            status_code=status.HTTP_200_OK,
        )

    def get_org_users(self, id: str, db: Session = Depends(get_db)):
        org = self.get_by_id(id, db)
        return org.users

    def add_user_to_org(self, id: str, user_id: str, db: Session = Depends(get_db)):
        org = self.get_by_id(id, db)
        user = user_crud.get_by_id(db, user_id)
        if user is None:
            raise NotFoundException(resource_name="User")
        return self.crud.add_user(db, org, user)

    def remove_user_from_org(self, id: str, user_id: str, db: Session = Depends(get_db)):
        org = self.get_by_id(id, db)
        user = user_crud.get_by_id(db, user_id)
        if user is None:
            raise NotFoundException(resource_name="User")
        return self.crud.remove_user(db, org, user)

    def get_org_devices(self, id: str, db: Session = Depends(get_db)):
        org = self.get_by_id(id, db)
        return org.devices
    

orgs_router = OrgsRouter()