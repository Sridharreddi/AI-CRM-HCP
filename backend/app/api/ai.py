from fastapi import APIRouter
from pydantic import BaseModel

from app.agent.crm_agent import crm_agent

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class AIRequest(BaseModel):
    prompt: str
    tool: str = "chat"


@router.post("/chat")
def chat(request: AIRequest):
    result = crm_agent.invoke(
        {
            "input": request.prompt,
            "tool": request.tool,
        }
    )

    return {
        "response": result["output"]
    }


@router.post("/summary")
def summary(request: AIRequest):
    result = crm_agent.invoke(
        {
            "input": request.prompt,
            "tool": "summary",
        }
    )

    return {
        "response": result["output"]
    }


@router.post("/recommendation")
def recommendation(request: AIRequest):
    result = crm_agent.invoke(
        {
            "input": request.prompt,
            "tool": "recommendation",
        }
    )

    return {
        "response": result["output"]
    }


@router.post("/followup")
def followup(request: AIRequest):
    result = crm_agent.invoke(
        {
            "input": request.prompt,
            "tool": "followup",
        }
    )

    return {
        "response": result["output"]
    }