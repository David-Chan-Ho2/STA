from fastapi import HTTPException, status

class NotFoundException(HTTPException):
    def __init__(self, resource_name: str, resource_id:str) -> None:
        detail = f"{resource_name} with ID {resource_id} not found!"
        super().__init__(status.HTTP_404_NOT_FOUND, detail)

class PasswordMisMatchException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail="Password and confirm password are not the same!")

class EmailAlreadyExistsException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

class InvalidLoginException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")