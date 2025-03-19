from pydantic_settings import BaseSettings, SettingsConfigDict


class DatabaseSetting(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="postgres_",
        extra="allow",
    )

    HOST: str
    PORT: str
    DB: str
    USER: str
    PASSWORD: str
    PG_DEBUG: bool = False
