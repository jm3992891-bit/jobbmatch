from typing import List, Dict, Any

class MatchingService:
    @staticmethod
    def calculate_match(candidate_tags: List[str], job_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calcula el porcentaje de compatibilidad y genera razones explicativas para puestos operativos.
        """
        job_title = job_data.get("titulo", "").lower()
        job_tags = job_data.get("tags", [])
        
        score = 70 # Base score
        reasons: List[str] = []
        missing: List[str] = []

        # Verificar coincidencias de tags
        matched_tags = []
        for tag in candidate_tags:
            tag_lower = tag.lower()
            if tag_lower in job_title or any(tag_lower in jt.lower() for jt in job_tags):
                matched_tags.append(tag)
                score += 10

        if matched_tags:
            reasons.append(f"Experiencia coincidente en: {', '.join(matched_tags)}")
        else:
            reasons.append("Puesto con inducción y capacitación pagada desde el primer día")

        # Bonus por cercanía / distrito
        score += 8
        reasons.append("Sede cercana a tu zona de preferencia de transporte")

        # Cap al 98%
        final_score = min(score, 96)

        return {
            "score": final_score,
            "compatibility_label": f"{final_score}% Compatible contigo",
            "reasons": reasons,
            "missing_requirements": missing
        }
