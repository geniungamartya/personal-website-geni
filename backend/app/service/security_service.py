from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.config.security_config import SecuritySettings


class SecurityService:
    """Handles authentication: password hashing, verification, and JWT generation."""

    _pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    _algorithm = "HS256"

    def __init__(self, config: SecuritySettings = SecuritySettings()):
        self.config = config

    def hash_password(self, password: str) -> str:
        """Hash a plaintext password using bcrypt."""
        return self._pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Check if a plaintext password matches the hashed password."""
        return self._pwd_context.verify(plain_password, hashed_password)

    def create_access_token(
        self, data: dict, expires_delta: timedelta | None = None
    ) -> str:
        """
        Generate a JWT access token.

        :param subject: The user identifier (e.g., user ID or email).
        :param expires_delta: Token expiration duration (defaults to `ACCESS_TOKEN_EXPIRE_MINUTES`).
        :return: Encoded JWT token.
        """
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + (
            expires_delta or timedelta(minutes=self.config.ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, self.config.SECRET_KEY, algorithm=self._algorithm)

    def decode_access_token(self, token: str) -> dict:
        return jwt.decode(token, self.config.SECRET_KEY, algorithms=[self._algorithm])
