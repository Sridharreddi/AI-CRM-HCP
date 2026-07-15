from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate

router = APIRouter(
    prefix="/interactions",
    tags=["Edit Interaction"]
)


@router.put("/edit/{interaction_id}")
def update_interaction(
    interaction_id: int,
    data: InteractionCreate,
    db: Session = Depends(get_db),
):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if interaction is None:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    interaction.hcp_name = data.hcp_name
    interaction.hospital = data.hospital
    interaction.specialty = data.specialty
    interaction.notes = data.notes
    interaction.outcome = data.outcome
    interaction.follow_up = data.follow_up

    db.commit()
    db.refresh(interaction)

    return interaction