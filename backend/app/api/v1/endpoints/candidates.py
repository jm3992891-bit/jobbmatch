from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.candidate import CandidateCreate, CandidateResponse

router = APIRouter()

# En memoria para prototipo rápido
MOCK_CANDIDATES_DB = [
    {
        "id": 1,
        "nombres": "Juan Carlos",
        "apellidos": "Pérez Gómez",
        "correo": "juan.perez@email.com",
        "telefono": "+51 987 654 321",
        "ubicacion": "Lima, Perú",
        "experiencia_tags": ["Ventas", "Atención al cliente", "Almacenero"],
        "competencias": ["Puntualidad", "Caja/POS", "Trabajo en equipo"],
        "sin_experiencia": False,
        "dni_validado": True,
        "distritos_seleccionados": ["Ate", "SJL", "Cercado"],
        "carnet_sanidad": True,
        "porcentaje_completitud": 100
    }
]

@router.get("/", response_model=List[CandidateResponse])
def get_candidates():
    return MOCK_CANDIDATES_DB

@router.post("/", response_model=CandidateResponse)
def create_candidate(candidate: CandidateCreate):
    new_candidate = {
        "id": len(MOCK_CANDIDATES_DB) + 1,
        **candidate.model_dump(),
        "dni_validado": False,
        "distritos_seleccionados": ["Lima Centro"],
        "carnet_sanidad": False,
        "porcentaje_completitud": 75
    }
    MOCK_CANDIDATES_DB.append(new_candidate)
    return new_candidate

@router.get("/{candidate_id}", response_model=CandidateResponse)
def get_candidate_by_id(candidate_id: int):
    for c in MOCK_CANDIDATES_DB:
        if c["id"] == candidate_id:
            return c
    raise HTTPException(status_code=404, detail="Candidato no encontrado")
