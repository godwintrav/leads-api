from sqlmodel import SQLModel, Field
from typing import Optional
import uuid

class User(SQLModel, table=True):
    """Model for user"""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str

class BlacklistedToken(SQLModel, table=True):
    """Model for blacklisted auth token"""
    id: Optional[int] = Field(default=None, primary_key=True)
    token: str = Field(unique=True)