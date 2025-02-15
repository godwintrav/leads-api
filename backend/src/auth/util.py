from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from auth.model import User
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from database.database import get_session
from sqlmodel import Session, select

#outh scheme used for authentication by getting token by token url which is set as login url
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

#initialising bcrypt for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# utitlity function for hashing password use Crypto Context
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# utitlity function for verifying password with hashed and plain password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# utility function for generating access token used for authentication and authorization
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.now() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# utiltity function that get's current user from access token set after authentication
def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = session.exec(select(User).where(User.email == email)).first()
    if user is None:
        raise credentials_exception

    return user

