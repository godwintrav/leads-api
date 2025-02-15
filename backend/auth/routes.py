from fastapi import APIRouter, Depends
from sqlmodel import Session

from auth.model import User
from auth.schema import ApiDefaultResponse, TokenResponse, UserCreate, UserLogin
from auth.service import login_user, register_user
from auth.util import get_current_user
from database.database import get_session

router = APIRouter(prefix="/auth", tags=["Authentication"])

# controller register function that creates a User entity and returns a token response
@router.post("/register", status_code=201)
async def register(user_data: UserCreate, session: Session = Depends(get_session)) -> ApiDefaultResponse:
    return register_user(user_data, session=session)

# controller login function that authenticates a User entity and returns a token response
@router.post("/login", response_model=TokenResponse, status_code=200)
async def login(user_data: UserLogin, session: Session = Depends(get_session)):
    return login_user(user_data, session=session)
