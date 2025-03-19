from pydantic import BaseModel


class BlogPost(BaseModel):
    id: str | None
    title: str
    slug: str
    content: str
