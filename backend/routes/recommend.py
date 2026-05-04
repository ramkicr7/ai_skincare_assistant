from fastapi import APIRouter
from services.recommender import get_recommendation

router = APIRouter()

@router.post("/")
def recommend(data: dict):
    result = get_recommendation(data)
    return result