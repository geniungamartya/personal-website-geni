from typing import Optional
from uuid import UUID, uuid4

from app.model.user import User, UserCreate
from app.repository.user_repositoy import UserRepository
from app.service.security_service import SecurityService


class UserService:
    def __init__(
        self,
        user_repository: UserRepository = UserRepository(),
        security_service: SecurityService = SecurityService(),
    ):
        self.user_repository = user_repository
        self.security_service = security_service

    def get_users(self) -> list[User]:
        """Retrieve all users."""
        return self.user_repository.get_users()

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Retrieve a user by their email."""
        return self.user_repository.get_user_by_email(email)

    def get_user_by_id(self, id: UUID) -> Optional[User]:
        """Retrieve a user by their email."""
        return self.user_repository.get_user_by_id(id)

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """Authenticate user by email and password."""
        user = self.get_user_by_email(email)
        if not user:
            return None
        if not self.security_service.verify_password(password, user.hashed_password):
            return None
        return user

    def register_user(self, user_create: UserCreate) -> User:
        """Register a new user with hashed password."""
        hashed_password = self.security_service.hash_password(user_create.password)
        user = User(
            id=uuid4(),
            email=user_create.email,
            full_name=user_create.full_name,
            is_active=user_create.is_active,
            is_superuser=user_create.is_superuser,
            hashed_password=hashed_password,
        )
        self.user_repository.create_user(user)
        return user

    def update_user_role(self, user_id: UUID, is_superuser: bool) -> Optional[User]:
        """Promote or demote a user."""
        return self.user_repository.update_user_role(user_id, is_superuser)

    def update_user_activity(self, user_id: UUID, is_active: bool) -> Optional[User]:
        return self.user_repository.update_user_role(user_id, is_active)

    def delete_user(self, user_id: UUID) -> None:
        """Delete a user."""
        self.user_repository.delete_user(user_id)
