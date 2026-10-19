from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.matching import MatchRequest, MatchResult, BatchMatchResponse
from app.services.matching_service import MatchingService
from app.api.v1.endpoints.candidates import MOCK_CANDIDATES_DB
from app.api.v1.endpoints.jobs import MOCK_JOBS_DB

router = APIRouter()

@router.post("/evaluate", response_model=BatchMatchResponse)
def evaluate_matching(payload: MatchRequest):
    candidate = next((c for c in MOCK_CANDIDATES_DB if c["id"] == payload.candidate_id), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidato no encontrado")

    results: List[MatchResult] = []
    jobs_to_eval = MOCK_JOBS_DB
    if payload.job_ids:
        jobs_to_eval = [j for j in MOCK_JOBS_DB if j["id"] in payload.job_ids]

    for job in jobs_to_eval:
        eval_res = MatchingService.calculate_match(candidate["experiencia_tags"], job)
        results.append(
            MatchResult(
                job_id=job["id"],
                titulo=job["titulo"],
                empresa=job["empresa"],
                score=eval_res["score"],
                compatibility_label=eval_res["compatibility_label"],
                reasons=eval_res["reasons"],
                missing_requirements=eval_res["missing_requirements"]
            )
        )

    # Ordenar por afinidad
    results.sort(key=lambda x: x.score, reverse=True)

    return BatchMatchResponse(
        candidate_id=payload.candidate_id,
        total_matches=len(results),
        matches=results
    )
