from typing import List, Optional
from pydantic import BaseModel

class MatchRequest(BaseModel):
    candidate_id: int
    job_ids: Optional[List[int]] = None

class MatchResult(BaseModel):
    job_id: int
    titulo: str
    empresa: str
    score: int
    compatibility_label: str
    reasons: List[str]
    missing_requirements: List[str] = []

class BatchMatchResponse(BaseModel):
    candidate_id: int
    total_matches: int
    matches: List[MatchResult]
