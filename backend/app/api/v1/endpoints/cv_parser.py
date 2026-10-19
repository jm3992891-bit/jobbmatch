from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict, Any
from app.services.cv_service import CVParserService

router = APIRouter()

@router.post("/parse-cv")
async def parse_cv(file: UploadFile = File(...)) -> Dict[str, Any]:
    """
    Recibe un archivo PDF o DOCX de CV, extrae el texto y devuelve:
    - Datos personales simulados/extraídos
    - Etiquetas de experiencia sugeridas ("Ventas", "Cajero", "Almacenero", etc.)
    - Competencias detectadas
    """
    try:
        content = await file.read()
        extracted_text = CVParserService.extract_text_from_bytes(content, file.filename or "cv.pdf")
        parsed_data = CVParserService.parse_cv_content(extracted_text)
        return {
            "success": True,
            "filename": file.filename,
            "data": parsed_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error procesando el CV: {str(e)}")
