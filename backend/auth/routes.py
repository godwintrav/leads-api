from fastapi import APIRouter, Depends
from sqlmodel import Session

from auth.model import User
from auth.schema import TokenResponse, UserCreate, UserLogin
from auth.service import login_user, logout_user, register_user
from auth.util import get_current_user
from database import get_session

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(user_data: UserCreate, session: Session = Depends(get_session)) -> TokenResponse:
    return register_user(user_data, session=session)

@router.post("/login", response_model=TokenResponse, status_code=200)
async def login(user_data: UserLogin, session: Session = Depends(get_session)):
    return login_user(user_data, session=session)

@router.post("/logout", status_code=200)
async def logout(token: str, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    logout_user(token, session=session)
    return {"message": "User logged out successfully"}
