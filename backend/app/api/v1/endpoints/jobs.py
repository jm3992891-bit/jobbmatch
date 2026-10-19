from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.job import JobCreate, JobResponse

router = APIRouter()

MOCK_JOBS_DB = [
    {
        "id": 1,
        "titulo": "Operario de Almacén y Picking",
        "empresa": "Logística Perú S.A.C.",
        "sede": "Ate - Planta Santa Clara",
        "sueldo": "S/ 1,130 + Horas Extras",
        "turno": "Turnos Rotativos",
        "experiencia": "Sin Experiencia",
        "departamento": "Operaciones",
        "modalidad": "Turnos Rotativos",
        "cupos_total": 10,
        "cupos_cubiertos": 3,
        "estado": "Activo",
        "urgencia": "urgente",
        "fecha": "Creado hace 2 días",
        "matches": 24,
        "interesados": 8,
        "nuevos_interesados": 3,
        "en_entrevista": 4,
        "contratados": 3
    },
    {
        "id": 2,
        "titulo": "Atención al Cliente y Caja",
        "empresa": "Empresa líder en Retail",
        "sede": "San Juan de Lurigancho - Sede Los Jardines",
        "sueldo": "S/ 1,025 + Bonos",
        "turno": "Turno Tarde (2pm - 10:30pm)",
        "experiencia": "Sin Experiencia",
        "departamento": "Tiendas y Caja",
        "modalidad": "Full-time",
        "cupos_total": 8,
        "cupos_cubiertos": 5,
        "estado": "Activo",
        "urgencia": "urgente",
        "fecha": "Creado hace 4 días",
        "matches": 31,
        "interesados": 12,
        "nuevos_interesados": 5,
        "en_entrevista": 6,
        "contratados": 5
    }
]

@router.get("/", response_model=List[JobResponse])
def get_jobs():
    return MOCK_JOBS_DB

@router.post("/", response_model=JobResponse)
def create_job(job: JobCreate):
    new_job = {
        "id": len(MOCK_JOBS_DB) + 1,
        **job.model_dump(),
        "fecha": "Creado hoy",
        "matches": 15,
        "interesados": 0,
        "nuevos_interesados": 0,
        "en_entrevista": 0,
        "contratados": 0
    }
    MOCK_JOBS_DB.insert(0, new_job)
    return new_job

@router.get("/{job_id}", response_model=JobResponse)
def get_job_by_id(job_id: int):
    for j in MOCK_JOBS_DB:
        if j["id"] == job_id:
            return j
    raise HTTPException(status_code=404, detail="Proceso no encontrado")
