from datetime import date
from typing import List
from sqlmodel import Session, func, select
from fastapi import Depends, HTTPException, status
from lead.model import Lead
from lead.schema import LeadCreate, LeadListResponse, LeadUpdate, LeadResponse, PaginationResponse
from database import get_session

def create_lead(lead_data: LeadCreate, session: Session = Depends(get_session)) -> LeadResponse:
    existing_lead = session.exec(select(Lead).where(Lead.email == lead_data.email)).first()
    if existing_lead:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Lead with this email already exists")

    new_lead = Lead(**lead_data.model_dump())
    session.add(new_lead)
    session.commit()
    session.refresh(new_lead)
    return new_lead

def update_lead(lead_id: int, lead_data: LeadUpdate, session: Session = Depends(get_session)) -> LeadResponse:
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

    lead_data_dict = lead_data.model_dump(exclude_unset=True)
    for key, value in lead_data_dict.items():
        setattr(lead, key, value)

    session.add(lead)
    session.commit()
    session.refresh(lead)
    return lead

def delete_lead(lead_id: int, session: Session = Depends(get_session)):
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

    session.delete(lead)
    session.commit()
    return {"message": "Lead deleted successfully"}

def get_lead(lead_id: int, session: Session = Depends(get_session)) -> LeadResponse:
    """Fetches a lead by ID"""
    lead = session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

    return lead

def get_leads(
    session: Session = Depends(get_session),
    limit: int = 10,
    page: int = 1,
    from_date: date | None = None,
    to_date: date | None = None,
    sort: str = "desc",
    engaged: bool | None = None,
    stage: int | None = None,
    search: str | None = None
) -> LeadListResponse:
    query = select(Lead)

    if engaged is not None:
        query = query.where(Lead.engaged == engaged)

    if stage is not None:
        query = query.where(Lead.stage == stage)

    if from_date and to_date:
        query = query.where(Lead.last_contacted.between(from_date, to_date))

    if search:
        search_filter = (
            (Lead.full_name.ilike(f"%{search}%")) |
            (Lead.company.ilike(f"%{search}%")) |
            (Lead.email.ilike(f"%{search}%"))
        )
        query = query.where(search_filter)

    total_items = session.exec(select(func.count()).select_from(query.subquery())).one()

    if sort == "asc":
        query = query.order_by(Lead.last_contacted.asc())
    else:
        query = query.order_by(Lead.last_contacted.desc())

    total_pages = (total_items + limit - 1) // limit 
    offset = (page - 1) * limit
    leads = session.exec(query.offset(offset).limit(limit)).all()

    leads_response = [LeadResponse(**lead.model_dump()) for lead in leads]

    pagination = PaginationResponse(
        total_items=total_items,
        total_pages=total_pages,
        items_per_page=limit,
        current_page=page,
        next_page=page + 1 if page < total_pages else None,
        prev_page=page - 1 if page > 1 else None,
    )

    return LeadListResponse(leads=leads_response, pagination=pagination)