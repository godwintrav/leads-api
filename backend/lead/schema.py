from pydantic import BaseModel, EmailStr, conint
from datetime import date, datetime
from typing import Optional

class LeadBase(BaseModel):
    """Base schema for lead"""
    full_name: str
    email: EmailStr
    company: str
    stage: int 
    engaged: bool
    last_contacted: Optional[date] = None

class LeadCreate(LeadBase):
    """Schema for creating a lead"""
    pass

class LeadUpdate(BaseModel):
    """Schema for updating a lead"""
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    company: Optional[str] = None
    stage: Optional[int] = None
    engaged: Optional[bool] = None
    last_contacted: Optional[date] = None

class LeadResponse(LeadBase):
    """Schema for lead response"""
    id: int
    created: datetime

    class Config:
        from_attributes = True 
