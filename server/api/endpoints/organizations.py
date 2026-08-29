from fastapi import Depends, status
from sqlalchemy.orm import Session

from api.endpoints.base import BaseRouter
from config.database import get_db
from crud.organizations import organizations_crud
from crud.user import user_crud
from exceptions.base import NotFoundException
from schemas.organizations import OrganizationResponse, CreateOrganization, UpdateOrganization, OrganizationUserResponse, OrganizationDeviceResponse


class OrganizationsRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=organizations_crud,
            response_schema=OrganizationResponse,
            create_schema=CreateOrganization,
            update_schema=UpdateOrganization,
            name="Organization"
        )
        self.router.add_api_route(
            '/{id}/users',
            self.get_org_users,
            methods=['GET'],
            response_model=list[OrganizationUserResponse],
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/users/{user_id}',
            self.add_user_to_org,
            methods=['POST'],
            response_model=OrganizationResponse,
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/users/{user_id}',
            self.remove_user_from_org,
            methods=['DELETE'],
            response_model=OrganizationResponse,
            status_code=status.HTTP_200_OK,
        )
        self.router.add_api_route(
            '/{id}/devices',
            self.get_org_devices,
            methods=['GET'],
            response_model=list[OrganizationDeviceResponse],
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


organizations_router = OrganizationsRouter()
