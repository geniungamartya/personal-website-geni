from pydantic_settings import BaseSettings, SettingsConfigDict


class DummyConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="allow",
        # env_prefix="data_encryption_",
    )

    # private_key: Base64Str
