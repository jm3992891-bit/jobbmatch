from typing import List, Optional
from pydantic import BaseModel, EmailStr

class CandidateBase(BaseModel):
    nombres: str
    apellidos: str
    correo: EmailStr
    telefono: str
    ubicacion: str = "Lima, Perú"
    experiencia_tags: List[str] = []
    competencias: List[str] = []
    sin_experiencia: bool = False

class CandidateCreate(CandidateBase):
    password: Optional[str] = None

class CandidateResponse(CandidateBase):
    id: int
    dni_validado: bool = False
    distritos_seleccionados: List[str] = []
    carnet_sanidad: bool = False
    porcentaje_completitud: int = 75

    class Config:
        from_attributes = True
