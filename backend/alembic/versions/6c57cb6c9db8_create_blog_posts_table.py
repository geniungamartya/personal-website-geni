"""Create blog_posts table

Revision ID: 6c57cb6c9db8
Revises:
Create Date: 2025-03-24 21:14:36.365227

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "6c57cb6c9db8"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    """Create blog_posts table."""
    op.execute(
        """
        CREATE TABLE blog_posts (
            id UUID PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT NOT NULL
        );
        """
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP TABLE blog_posts;")
