"""Add date column to blog_posts

Revision ID: 749ff6f42456
Revises: 37219dd17c71
Create Date: 2025-03-31 15:24:31.695519

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "749ff6f42456"
down_revision: Union[str, None] = "37219dd17c71"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("ALTER TABLE blog_posts ADD COLUMN date TEXT NOT NULL;")


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("ALTER TABLE blog_posts DROP COLUMN date;")
