from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from lead.schema import LeadCreate, LeadUpdate, LeadResponse
from lead.service import create_lead, update_lead, delete_lead, get_lead
from database import get_session

router = APIRouter(prefix="/leads", tags=["Leads"])

@router.post("/", response_model=LeadResponse, status_code=201)
async def create(lead_data: LeadCreate, session: Session = Depends(get_session)) -> LeadResponse:
    return create_lead(lead_data, session=session)

@router.get("/{lead_id}", response_model=LeadResponse, status_code=200)
async def retrieve(lead_id: int, session: Session = Depends(get_session)) -> LeadResponse:
    return get_lead(lead_id, session=session)

@router.put("/{lead_id}", response_model=LeadResponse, status_code=200)
async def update(lead_id: int, lead_data: LeadUpdate, session: Session = Depends(get_session)) -> LeadResponse:
    return update_lead(lead_id, lead_data, session=session)

@router.delete("/{lead_id}", status_code=200)
async def delete(lead_id: int, session: Session = Depends(get_session)) -> dict:
    return delete_lead(lead_id, session=session)
