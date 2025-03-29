from functools import cache
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError

from app.config.database_config import DatabaseSetting
from app.config.security_config import SecuritySettings
from app.config.storage_config import StorageSettings
from app.model.user import User
from app.service.blog_service import BlogService
from app.service.database_service import DatabaseService
from app.service.security_service import SecurityService
from app.service.storage_service import StorageService
from app.service.user_service import UserService


@cache
def get_db_service() -> DatabaseService:
    return DatabaseService(config=DatabaseSetting())


@cache
def get_storage_service() -> StorageService:
    return StorageService(config=StorageSettings())


@cache
def get_blog_service() -> BlogService:
    return BlogService()


@cache
def get_user_service() -> UserService:
    return UserService()


@cache
def get_security_service() -> SecurityService:
    return SecurityService()


@cache
def get_security_config() -> SecuritySettings:
    return SecuritySettings()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/access-token")
TokenDep = Annotated[str, Depends(oauth2_scheme)]


def get_current_user(
    token: str = Depends(oauth2_scheme),
    user_service: UserService = Depends(get_user_service),
    security_service: SecurityService = Depends(get_security_service),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = security_service.decode_access_token(token)
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except (jwt.InvalidTokenError, ValidationError):
        raise credentials_exception

    user = user_service.get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user


def get_current_superuser(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )

    return current_user
