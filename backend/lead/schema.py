from pydantic import BaseModel, EmailStr, Field, conint, constr, field_validator
from datetime import date, datetime
from typing import Optional
from typing_extensions import Annotated

class LeadBase(BaseModel):
    """Base schema for lead with strict validation"""
    full_name: Annotated[str, Field(min_length=3, max_length=100)]  
    email: EmailStr 
    company: Annotated[str, Field(min_length=2, max_length=100)]
    stage: Annotated[int, Field(ge=0, le=4)] 
    engaged: bool 
    last_contacted: Optional[date] = None 


class LeadCreate(LeadBase):
    """Schema for creating a lead"""
    pass


class LeadUpdate(BaseModel):
    """Schema for updating a lead"""
    full_name: Optional[Annotated[str, Field(min_length=3, max_length=100)]] = None
    email: Optional[EmailStr] = None
    company: Optional[Annotated[str, Field(min_length=2, max_length=100)]] = None
    stage: Optional[Annotated[int, Field(ge=0, le=4)]] = None
    engaged: Optional[bool] = None
    last_contacted: Optional[date] = None


class LeadDelete(BaseModel):
    """Schema for deleting leads"""
    lead_ids: Annotated[list[int], Field(min_items=1)]  


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
