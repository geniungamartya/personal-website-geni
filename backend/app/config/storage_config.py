from pydantic_settings import BaseSettings, SettingsConfigDict


class StorageSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="minio_",
        extra="allow",
    )

    URL: str
    USER: str
    PASSWORD: str
    BUCKET: str | None
    USE_HTTPS: bool = False
