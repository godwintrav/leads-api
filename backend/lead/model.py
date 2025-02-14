from sqlmodel import SQLModel, Field
from datetime import date, datetime
from typing import Optional

class Lead(SQLModel, table=True):
    """Database model for a lead"""
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    company: str = Field(index=True)
    stage: int = Field(ge=0, le=4)
    engaged: bool
    last_contacted: Optional[date] = None
    created: datetime = Field(default_factory=datetime.now)
