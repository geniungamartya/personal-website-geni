from uuid import UUID, uuid4

from pydantic import BaseModel


class BlogPost(BaseModel):
    id: UUID = uuid4()
    title: str
    slug: str
    content: str
