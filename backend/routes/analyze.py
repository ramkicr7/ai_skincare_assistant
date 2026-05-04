from fastapi import APIRouter
from services.groq_service import extract_skin_info 

router = APIRouter()

@router.post("/")
def analyze(data: dict):
    text = data.get("text")
    return extract_skin_info(text)