from pydantic_settings import BaseSettings, SettingsConfigDict


class CorsSetting(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="CORS_",
        extra="allow",
    )

    host: list[str]
