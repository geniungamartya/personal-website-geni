from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.cors_config import CorsSetting
from app.controller.main import api_router

app = FastAPI()

cors_config = CorsSetting()

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_config.host,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/health")
async def health_check():
    return
