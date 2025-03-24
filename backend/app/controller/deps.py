from functools import cache

from app.config.database_config import DatabaseSetting
from app.config.storage_config import StorageSettings
from app.service.blog_service import BlogService
from app.service.database_service import DatabaseService
from app.service.storage_service import StorageService


@cache
def get_db_service() -> DatabaseService:
    return DatabaseService(config=DatabaseSetting())


@cache
def get_storage_service() -> StorageService:
    return StorageService(config=StorageSettings())


@cache
def get_blog_service() -> BlogService:
    return BlogService()
