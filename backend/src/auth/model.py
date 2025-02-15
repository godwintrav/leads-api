from sqlmodel import SQLModel, Field
from typing import Optional
import uuid

class User(SQLModel, table=True):
    """Model for user"""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True) # primary key for user
    email: str = Field(unique=True, index=True) # indexed user email for authetication  
    hashed_password: str # hashed user password