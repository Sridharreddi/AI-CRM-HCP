from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse,
)

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


@router.post("/", response_model=InteractionResponse)
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db),
):
    new_interaction = Interaction(
        hcp_name=interaction.hcp_name,
        hospital=interaction.hospital,
        specialty=interaction.specialty,
        notes=interaction.notes,
        outcome=interaction.outcome,
        follow_up=interaction.follow_up,
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction


@router.get("/", response_model=list[InteractionResponse])
def get_interactions(db: Session = Depends(get_db)):
    return db.query(Interaction).all()