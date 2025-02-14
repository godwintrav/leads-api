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

class LeadDelete(BaseModel):
    """Schema for deleting leads"""
    lead_ids: list[int] = []

class LeadResponse(LeadBase):
    """Schema for lead response"""
    id: int
    created: datetime

class PaginationResponse(BaseModel):
    """Schema for pagination response"""
    total_items: int = 0
    total_pages: int = 0
    items_per_page: int = 0
    current_page: int = 0
    next_page: int | None = None
    prev_page: int | None = None
    

class LeadListResponse(BaseModel):
    """Schema for leads list response"""
    leads: list[LeadResponse]
    pagination: PaginationResponse


    class Config:
        from_attributes = True 
