from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="API REST de Labora: Gestión de Candidatos, Vacantes, Matching y Parsing de CVs en Perú"
)

# Configuración de CORS para conectar con el Frontend Next.js (http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir Rutas V1
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "Bienvenido a la API de Labora 🚀",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def healthcheck():
    return {"status": "ok", "service": "labora-backend"}
