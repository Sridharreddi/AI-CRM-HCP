from pydantic import BaseModel
from datetime import date


class InteractionCreate(BaseModel):
    hcp_name: str
    hospital: str
    specialty: str
    notes: str
    outcome: str
    follow_up: date


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True