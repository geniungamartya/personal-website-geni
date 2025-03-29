from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.controller.deps import get_security_service, get_user_service
from app.model.security import Token
from app.service.security_service import SecurityService
from app.service.user_service import UserService

router = APIRouter(tags=["login"])


@router.post("/login/access-token")
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    user_service: UserService = Depends(get_user_service),
    security_service: SecurityService = Depends(get_security_service),
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = user_service.authenticate_user(
        email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return Token(
        access_token=security_service.create_access_token({"sub": str(user.id)})
    )
