from pydantic_settings import BaseSettings, SettingsConfigDict


class SecuritySettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="security_",
        extra="allow",
    )

    SECRET_KEY: str
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
