from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    """Schema for user registration with validation"""
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    """Schema for token response"""
    access_token: str
    token_type: str

class ApiDefaultResponse(BaseModel):
    message: str