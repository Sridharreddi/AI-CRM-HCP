from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.interaction import Interaction

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_interactions = db.query(Interaction).count()

    total_hcps = (
        db.query(Interaction.hcp_name)
        .distinct()
        .count()
    )

    total_followups = (
        db.query(Interaction)
        .filter(Interaction.follow_up.isnot(None))
        .count()
    )

    positive = (
        db.query(Interaction)
        .filter(Interaction.outcome == "Positive")
        .count()
    )

    neutral = (
        db.query(Interaction)
        .filter(Interaction.outcome == "Neutral")
        .count()
    )

    negative = (
        db.query(Interaction)
        .filter(Interaction.outcome == "Negative")
        .count()
    )

    return {
        "interactions": total_interactions,
        "hcps": total_hcps,
        "followups": total_followups,
        "positive": positive,
        "neutral": neutral,
        "negative": negative,
        "accuracy": 98
    }