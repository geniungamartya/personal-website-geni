from typing import List

from app.model.blog_post import BlogPost
from app.repository.blog_repository import BlogRepository


class BlogService:
    """Handles business logic for blog posts."""

    def __init__(self, blog_repository: BlogRepository = BlogRepository()):
        self.blog_repository = blog_repository

    def create_blog_post(self, blog: BlogPost) -> None:
        """Creates a new blog post."""
        self.blog_repository.create_blog_post(blog)

    def get_all_blog_posts(self) -> List[BlogPost]:
        """Retrieves all blog posts."""
        return self.blog_repository.get_blog_posts()

    def get_blog_post_by_id(self, blog_id: str) -> BlogPost | None:
        """Retrieves a blog post by its ID."""
        return self.blog_repository.get_blog_post_by_id(blog_id)

    def update_blog_post(self, blog_id: str, blog: BlogPost) -> None:
        """Updates an existing blog post."""
        self.blog_repository.update_blog_post(blog_id, blog)

    def delete_blog_post(self, blog_id: str) -> None:
        """Deletes a blog post by its ID."""
        self.blog_repository.delete_blog_post(blog_id)
