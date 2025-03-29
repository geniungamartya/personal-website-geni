from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True
    is_superuser: bool = False
    full_name: str = ""


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: UUID
    hashed_password: str
