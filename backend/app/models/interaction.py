from sqlalchemy import Column, Integer, String, Text, Date
from app.database.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String, nullable=False)

    hospital = Column(String, nullable=False)

    specialty = Column(String)

    notes = Column(Text)

    outcome = Column(String)

    follow_up = Column(Date)