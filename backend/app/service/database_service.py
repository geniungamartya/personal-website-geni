from contextlib import contextmanager
from typing import Iterator

from psycopg2.extras import DictCursor
from sqlalchemy import URL, Connection, QueuePool, create_engine, text

from app.config.database_config import DatabaseSetting


class DatabaseService:
    def __init__(self, config: DatabaseSetting = DatabaseSetting()):
        """Initialize MinIO client with environment variables."""
        self.pg_url = URL.create(
            drivername="postgresql+psycopg2",
            username=config.USER,
            password=config.PASSWORD,
            database=config.DB,
            host=config.HOST,
            port=config.PORT,
        )

        self.engine = create_engine(
            self.pg_url,
            poolclass=QueuePool,
            echo="debug" if config.PG_DEBUG else None,
            pool_pre_ping=True,
        )

    @contextmanager
    def get_connection(self) -> Iterator[Connection]:
        with self.engine.connect(cursor_factory=DictCursor) as conn:
            yield conn
            conn.commit()

    def execute(self, query: str, params: dict = {}, return_type: str | None = "all"):
        stmt = text(query)
        if params:
            stmt = stmt.bindparams(**params)

        with self.get_connection() as conn:
            match return_type:
                case "one":
                    return conn.execute(stmt).fetchone()
                case "all":
                    return conn.execute(stmt).fetchall()
                case _:
                    return conn.execute(stmt)
