import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "src")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database.database import close_db, seed_db
from src.lead.routes import router as lead_router
from src.auth.routes import router as auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_db()
    yield

    close_db()

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://leads-app-artisan-assessment.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(lead_router)

@app.get('/health')
def index():
    return {"message": "Running"}

@app.head('/')
def uptime():
    return {"message": "success"}