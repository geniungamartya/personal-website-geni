from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.controller.deps import (
    get_current_superuser,
    get_current_user,
    get_user_service,
)
from app.model.user import User, UserCreate
from app.service.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=User)
async def read_users_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.get(
    "/", dependencies=[Depends(get_current_superuser)], response_model=list[User]
)
def get_users(user_service: UserService = Depends(get_user_service)):
    """Retrieve all users."""
    return user_service.get_users()


@router.get("/{user_id}", response_model=User)
def get_user(user_id: UUID, user_service: UserService = Depends(get_user_service)):
    """Retrieve a user by ID."""
    user = user_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post(
    "/register", dependencies=[Depends(get_current_superuser)], response_model=User
)
def register_user(
    user_create: UserCreate, user_service: UserService = Depends(get_user_service)
):
    """Register a new user."""
    user = user_service.get_user_by_email(email=user_create.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = user_service.register_user(user_create)
    return user


@router.patch(
    "/{user_id}/role",
    dependencies=[Depends(get_current_superuser)],
)
def update_user_role(
    user_id: str,
    is_superuser: bool,
    user_service: UserService = Depends(get_user_service),
):
    """Update user role."""
    user_service.update_user_role(user_id, is_superuser)
    return {"message": "User role updated successfully"}


@router.delete(
    "/{user_id}",
    dependencies=[Depends(get_current_superuser)],
)
def delete_user(user_id: str, user_service: UserService = Depends(get_user_service)):
    """Delete a user."""
    user_service.delete_user(user_id)
    return {"message": "User deleted successfully"}
