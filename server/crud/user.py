from models.User import User
from crud.base import CRUDBase


class UserCrud(CRUDBase):
    def __init__(self):
        super().__init__(User)
    
    def get_user_devices(self, current_user: User):
        return current_user.devices
    
user_crud = UserCrud()
