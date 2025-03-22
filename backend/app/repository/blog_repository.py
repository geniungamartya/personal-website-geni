from app.model.blog_post import BlogPost
from app.service.database_service import DatabaseService


class BlogRepository:
    def __init__(
        self, table_name: str, database_service: DatabaseService = DatabaseService()
    ):
        self.table_name = table_name
        self.database_service = database_service

    def get_blog_posts(self, id) -> list[BlogPost] | None:
        return self.database_service.execute(f"SELECT * FROM {self.table_name}")
