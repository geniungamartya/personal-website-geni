from pydantic import EmailStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class UserConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="FIRST_SUPERUSER_",
        extra="allow",
    )

    EMAIL: EmailStr
    PASSWORD: str
