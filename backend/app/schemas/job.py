from typing import List, Optional
from pydantic import BaseModel

class JobBase(BaseModel):
    titulo: str
    empresa: str
    sede: str
    sueldo: str
    turno: str
    experiencia: str = "Sin Experiencia"
    departamento: str = "Operaciones"
    modalidad: str = "Turnos Rotativos"
    cupos_total: int = 10
    cupos_cubiertos: int = 0
    estado: str = "Activo"
    urgencia: str = "urgente"

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: int
    fecha: str
    matches: int = 0
    interesados: int = 0
    nuevos_interesados: int = 0
    en_entrevista: int = 0
    contratados: int = 0

    class Config:
        from_attributes = True
