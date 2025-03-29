"""create user table

Revision ID: 37219dd17c71
Revises: 6c57cb6c9db8
Create Date: 2025-03-27 22:47:48.922973

"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "37219dd17c71"
down_revision: Union[str, None] = "6c57cb6c9db8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        """
        CREATE TABLE "user" (
            id UUID PRIMARY KEY,
            email VARCHAR NOT NULL UNIQUE,
            is_active BOOLEAN NOT NULL,
            is_superuser BOOLEAN NOT NULL,
            full_name VARCHAR NOT NULL,
            hashed_password VARCHAR NOT NULL
        );
        """
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute('DROP TABLE IF EXISTS "user";')
