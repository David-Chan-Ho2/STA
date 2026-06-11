from api.endpoints.base import BaseRouter
from crud.user import user_crud
from schemas.user import UserResponse

class UserRouter(BaseRouter):

    def __init__(self):
        super().__init__(
            crud=user_crud, 
            response_schema=UserResponse, 
            name="User",
            disable_create=True,
            disable_update=True,
            disable_delete=True,
        )

users_router = UserRouter()