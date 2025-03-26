from app.model.blog_post import BlogPost
from app.service.database_service import DatabaseService


class BlogRepository:
    def __init__(self, database_service: DatabaseService = DatabaseService()):
        self.table_name = "blog_posts"
        self.database_service = database_service

    def create_blog_post(self, blog: BlogPost) -> None:
        """Insert a new blog post into the database."""
        query = f"""
        INSERT INTO {self.table_name} (id, title, slug, content)
        VALUES (:id, :title, :slug, :content)
        """
        self.database_service.execute(query, blog.model_dump(), return_type=None)

    def get_blog_posts(self) -> list[BlogPost]:
        """Retrieve all blog posts."""
        query = f"SELECT * FROM {self.table_name}"
        result = self.database_service.execute(query, return_type="all")
        return [BlogPost(**row) for row in result] if result else []

    def get_blog_post_by_id(self, blog_id: str) -> BlogPost | None:
        """Retrieve a blog post by ID."""
        query = f"SELECT * FROM {self.table_name} WHERE id = :id"
        result = self.database_service.execute(
            query, {"id": blog_id}, return_type="one"
        )
        return BlogPost(**result) if result else None

    def update_blog_post(self, blog: BlogPost) -> None:
        """Update a blog post."""
        query = f"""
        UPDATE {self.table_name}
        SET title = :title, slug = :slug, content = :content
        WHERE id = :id
        """
        self.database_service.execute(query, blog.model_dump(), return_type=None)

    def delete_blog_post(self, blog_id: str) -> None:
        """Delete a blog post by ID."""
        query = f"DELETE FROM {self.table_name} WHERE id = :id"
        self.database_service.execute(query, {"id": blog_id}, return_type=None)
