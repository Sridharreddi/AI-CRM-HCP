from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.database import get_db
from app.models.interaction import Interaction

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/")
def search(q: str, db: Session = Depends(get_db)):
    results = (
        db.query(Interaction)
        .filter(
            or_(
                Interaction.hcp_name.ilike(f"%{q}%"),
                Interaction.hospital.ilike(f"%{q}%"),
                Interaction.specialty.ilike(f"%{q}%"),
            )
        )
        .all()
    )

    return results