from typing import List
from uuid import UUID, uuid4

from app.model.blog_post import BlogPost, BlogPostData
from app.repository.blog_repository import BlogRepository


class BlogService:
    """Handles business logic for blog posts."""

    def __init__(self, blog_repository: BlogRepository = BlogRepository()):
        self.blog_repository = blog_repository

    def create_blog_post(self, blog_data: BlogPostData) -> BlogPost:
        """Creates a new blog post with a generated UUID."""
        blog = BlogPost(
            id=uuid4(), **blog_data.model_dump()
        )  # Generate UUID and create BlogPost
        self.blog_repository.create_blog_post(
            blog
        )  # Save and return the created blog post
        return blog

    def get_all_blog_posts(self) -> List[BlogPost]:
        """Retrieves all blog posts."""
        return self.blog_repository.get_blog_posts()

    def get_blog_post_by_id(self, blog_id: str) -> BlogPost | None:
        """Retrieves a blog post by its ID."""
        return self.blog_repository.get_blog_post_by_id(blog_id)

    def update_blog_post(self, blog_id: UUID, blog_data: BlogPostData) -> None:
        """Updates an existing blog post."""
        blog = BlogPost(
            id=blog_id, **blog_data.model_dump()
        )  # Generate UUID and create BlogPost
        self.blog_repository.update_blog_post(blog)

    def delete_blog_post(self, blog_id: str) -> None:
        """Deletes a blog post by its ID."""
        self.blog_repository.delete_blog_post(blog_id)
