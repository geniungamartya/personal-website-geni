from fastapi import APIRouter

# from app.controller.routes import items, login, private, users, utils
from app.controller.routes import blog, login, user

api_router = APIRouter()
api_router.include_router(blog.router)
api_router.include_router(login.router)
api_router.include_router(user.router)
# api_router.include_router(utils.router)
# api_router.include_router(items.router)
# api_router.include_router(private.router)
