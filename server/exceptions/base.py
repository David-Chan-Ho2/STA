from fastapi import HTTPException, status

class NotFoundException(HTTPException):
    def __init__(self, resource_name: str) -> None:
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=f"{resource_name} not found!")

class PasswordMisMatchException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail="Password and confirm password are not the same!")

class EmailAlreadyExistsException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

class InvalidLoginException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

class InvalidTokenException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

class SessionExpiredException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired session")

class SessionNotFoundException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session not found or already expired")

class UserNotFoundException(HTTPException):
    def __init__(self) -> None:
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")