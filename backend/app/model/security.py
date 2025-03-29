from pydantic import BaseModel


# JSON payload containing access token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenData(BaseModel):
    user_id: str | None = None
