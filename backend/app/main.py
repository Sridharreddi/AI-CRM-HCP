from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.interaction import router as interaction_router
from app.api.edit import router as edit_router
from app.api.ai import router as ai_router
from app.api.search import router as search_router

app = FastAPI(title="AI CRM HCP Module")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)
app.include_router(edit_router)
app.include_router(ai_router)
app.include_router(search_router)


@app.get("/")
def home():
    return {"message": "AI CRM Backend Running"}


@app.get("/health")
def health():
    return {"status": "healthy"}