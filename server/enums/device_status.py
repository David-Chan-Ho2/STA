from enum import Enum

class DeviceStatus(Enum):
    OFFLINE = 'offline'
    ONLINE = 'online'
    WARNING = 'warning'
    ERROR = 'error'