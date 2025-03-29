from typing import Optional
from uuid import UUID

from app.model.user import User
from app.service.database_service import DatabaseService


class UserRepository:
    def __init__(self, database_service: DatabaseService = DatabaseService()):
        self.table_name = '"user"'
        self.database_service = database_service

    def create_user(self, user: User) -> Optional[User]:
        """Insert a new user and return the created user."""
        query = f"""
        INSERT INTO {self.table_name} (id, email, is_active, is_superuser, full_name, hashed_password)
        VALUES (:id, :email, :is_active, :is_superuser, :full_name, :hashed_password)
        RETURNING *;
        """
        result = self.database_service.execute(
            query, user.model_dump(), return_type="one"
        )
        return User(**result) if result else None

    def get_users(self) -> list[User]:
        """Retrieve all users from the database."""
        query = f"SELECT * FROM {self.table_name}"
        result = self.database_service.execute(query, return_type="all")
        return [User(**row) for row in result] if result else []

    def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        """Retrieve a user by their ID."""
        query = f"SELECT * FROM {self.table_name} WHERE id = :id"
        result = self.database_service.execute(
            query, {"id": user_id}, return_type="one"
        )
        return User(**result) if result else None

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Retrieve a user by their email."""
        query = f"SELECT * FROM {self.table_name} WHERE email = :email"
        result = self.database_service.execute(
            query, {"email": email}, return_type="one"
        )
        return User(**result) if result else None

    def update_user_role(self, user_id: UUID, is_superuser: bool) -> Optional[User]:
        """Update a user's superuser role and return the updated user."""
        query = f"""
        UPDATE {self.table_name} 
        SET is_superuser = :is_superuser 
        WHERE id = :id 
        RETURNING *;
        """
        result = self.database_service.execute(
            query, {"id": user_id, "is_superuser": is_superuser}, return_type="one"
        )
        return User(**result) if result else None

    def update_user_activity(self, user_id: UUID, is_active: bool) -> Optional[User]:
        """Update a user's active status and return the updated user."""
        query = f"""
        UPDATE {self.table_name} 
        SET is_active = :is_active 
        WHERE id = :id 
        RETURNING *;
        """
        result = self.database_service.execute(
            query, {"id": user_id, "is_active": is_active}, return_type="one"
        )
        return User(**result) if result else None

    def delete_user(self, user_id: UUID) -> None:
        """Delete a user from the database."""
        query = f"DELETE FROM {self.table_name} WHERE id = :id"
        self.database_service.execute(query, {"id": user_id}, return_type=None)
