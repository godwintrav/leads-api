from sqlmodel import Session, select
from fastapi import Depends, HTTPException, status
from lead.model import Lead
from lead.schema import LeadCreate, LeadUpdate, LeadResponse
from database import get_session

def create_lead(lead_data: LeadCreate, session: Session = Depends(get_session)) -> LeadResponse:
    """Creates a new lead"""
    existing_lead = session.exec(select(Lead).where(Lead.email == lead_data.email)).first()
    if existing_lead:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Lead with this email already exists")

    new_lead = Lead(**lead_data.model_dump())
    session.add(new_lead)
    session.commit()
    session.refresh(new_lead)
    return new_lead

def update_lead(lead_id: int, lead_data: LeadUpdate, session: Session = Depends(get_session)) -> LeadResponse:
    """Updates an existing lead"""
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
    """Deletes a lead"""
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
