from uuid import UUID

from pydantic import BaseModel


class BlogPostData(BaseModel):
    title: str
    slug: str
    content: str


class BlogPost(BlogPostData):
    id: UUID
