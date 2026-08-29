from enum import Enum

class DeviceStatus(Enum):
    OFFLINE = 'Offline'
    ONLINE = 'Online'
    WARNING = 'Warning'
    ERROR = 'Error'