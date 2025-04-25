import logging
import sys

from app.config.user_config import UserConfig
from app.model.user import UserCreate
from app.service.user_service import UserService

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logger = logging.getLogger(__name__)


def main() -> None:
    user_config = UserConfig()
    user_service = UserService()
    user = user_service.get_user_by_email(email=user_config.EMAIL)
    if not user:
        first_user = user_service.register_user(
            UserCreate(
                email=user_config.EMAIL,
                password=user_config.PASSWORD,
                is_superuser=True,
                full_name=user_config.NAME,
            )
        )
        logger.info(f"Created first user: {first_user.email}")


if __name__ == "__main__":
    main()
