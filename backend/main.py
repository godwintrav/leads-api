from fastapi import FastAPI
from contextlib import asynccontextmanager

from database import close_db, init_db
from auth.routes import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

    close_db()

app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)

@app.get('/health')
def index():
    return {"message": "Running"}