from dotenv import load_dotenv
import os
from typing import TypedDict

load_dotenv()

from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage
from langchain_groq import ChatGroq

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile"
)


class AgentState(TypedDict):
    input: str
    tool: str
    output: str


def summarize_node(state: AgentState):
    prompt = f"""
You are an AI CRM Assistant.

Summarize the following HCP interaction.

{state["input"]}
"""

    response = llm.invoke([HumanMessage(content=prompt)])

    return {
        "output": response.content
    }


def recommendation_node(state: AgentState):
    prompt = f"""
You are an AI CRM Assistant.

Generate professional recommendations for this interaction.

{state["input"]}
"""

    response = llm.invoke([HumanMessage(content=prompt)])

    return {
        "output": response.content
    }


def followup_node(state: AgentState):
    prompt = f"""
You are an AI Healthcare CRM Assistant.

Generate follow-up recommendations.

{state["input"]}
"""

    response = llm.invoke([HumanMessage(content=prompt)])

    return {
        "output": response.content
    }


def chat_node(state: AgentState):
    response = llm.invoke(
        [HumanMessage(content=state["input"])]
    )

    return {
        "output": response.content
    }


def router(state: AgentState):
    tool = state.get("tool", "chat")

    if tool == "summary":
        return "summary"

    if tool == "recommendation":
        return "recommendation"

    if tool == "followup":
        return "followup"

    return "chat"


graph = StateGraph(AgentState)

graph.add_node("summary", summarize_node)
graph.add_node("recommendation", recommendation_node)
graph.add_node("followup", followup_node)
graph.add_node("chat", chat_node)

graph.set_conditional_entry_point(
    router,
    {
        "summary": "summary",
        "recommendation": "recommendation",
        "followup": "followup",
        "chat": "chat",
    },
)

graph.add_edge("summary", END)
graph.add_edge("recommendation", END)
graph.add_edge("followup", END)
graph.add_edge("chat", END)

crm_agent = graph.compile()