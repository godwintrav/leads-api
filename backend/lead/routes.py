from datetime import date
from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from auth.model import User
from auth.util import get_current_user
from lead.schema import LeadCreate, LeadListResponse, LeadUpdate, LeadResponse
from lead.service import create_lead, get_leads, update_lead, delete_lead, get_lead
from database import get_session

router = APIRouter(prefix="/leads", tags=["Leads"])

@router.post("/", response_model=LeadResponse, status_code=201)
async def create(lead_data: LeadCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> LeadResponse:
    return create_lead(lead_data, session=session)

@router.get("/{lead_id}", response_model=LeadResponse, status_code=200)
async def retrieve(lead_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> LeadResponse:
    return get_lead(lead_id, session=session)

@router.put("/{lead_id}", response_model=LeadResponse, status_code=200)
async def update(lead_id: int, lead_data: LeadUpdate, user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> LeadResponse:
    return update_lead(lead_id, lead_data, session=session)

@router.delete("/{lead_id}", status_code=200)
async def delete(lead_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)) -> dict:
    return delete_lead(lead_id, session=session)

@router.get("/", response_model=LeadListResponse)
def fetch_leads(
    session: Session = Depends(get_session),
    limit: int = 10,
    page: int = 1,
    from_date: date | None = None,
    to_date: date | None = None,
    sort: str = "desc",
    engaged: bool | None = None,
    stage: int | None = None,
    search: str | None = None
):
    return get_leads(
        session=session,
        limit=limit,
        page=page,
        from_date=from_date,
        to_date=to_date,
        sort=sort,
        engaged=engaged,
        stage=stage,
        search=search
    )
