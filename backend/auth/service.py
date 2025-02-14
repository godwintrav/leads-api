from sqlmodel import Session, select
from fastapi import Depends, HTTPException, status
from auth.model import BlacklistedToken, User
from auth.schema import TokenResponse, UserCreate, UserLogin
from auth.util import create_access_token, hash_password, verify_password
from database import get_session

def register_user(user_data: UserCreate, session: Session = Depends(get_session)) -> TokenResponse:
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    hashed_password = hash_password(user_data.password)
    user = User(email=user_data.email, hashed_password=hashed_password)

    session.add(user)
    session.commit()
    session.refresh(user)

    access_token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=access_token, token_type="bearer")

def login_user(user_data: UserLogin, session: Session = Depends(get_session)) -> TokenResponse:
    user = session.exec(select(User).where(User.email == user_data.email)).first()

    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=access_token, token_type="bearer")

def logout_user(token: str, session: Session = Depends(get_session)):
    blacklisted_token = BlacklistedToken(token=token)
    session.add(blacklisted_token)
    session.commit()
    return
