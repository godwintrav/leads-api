from sqlmodel import SQLModel, Field, Index
from datetime import date, datetime
from typing import Optional

class Lead(SQLModel, table=True):
    """Database model for a lead"""
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(index=True) # indexed to ensure efficient full text searching
    email: str = Field(unique=True, index=True) # indexed to ensure efficient full text searching
    company: str = Field(index=True) # indexed to ensure efficient full text searching
    stage: int = Field(ge=0, le=4, index=True) # indexed to ensure efficient filtering
    engaged: bool = Field(index=True) # indexed to ensure efficient filtering
    last_contacted: Optional[date] = Field(index=True) # indexed to ensure efficient filtering
    created: datetime = Field(default_factory=datetime.now, index=True) # indexed to ensure efficient filtering

    class Config:
        indexes = [
            Index("idx_lead_search", "full_name", "company", "email", postgresql_using="gin") # GIN index set because of full text search on those fields
        ]
