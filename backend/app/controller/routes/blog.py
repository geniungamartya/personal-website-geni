from fastapi import APIRouter, Depends, HTTPException, status
from h11 import Response

from app.controller.deps import get_db_service
from app.service.database_service import DatabaseService

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("/")
def get_all_blog_posts(
    skip: int = 0,
    limit: int = 100,
    db_service: DatabaseService = Depends(get_db_service),
) -> Response:
    try:
        return Response(status_code=status.HTTP_200_OK)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
