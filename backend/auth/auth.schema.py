from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    """Schema for user registration with validation"""
    email: EmailStr
    password: str = Field(
        ..., 
        min_length=8, 
        max_length=64, 
        regex=r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$",
        description="Password must be at least 8 characters long, contain letters and numbers."
    )

class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str = Field(
        ..., 
        min_length=8, 
        max_length=64,
        description="Password must be at least 8 characters long."
    )

class TokenResponse(BaseModel):
    """Schema for token response"""
    access_token: str
    token_type: str