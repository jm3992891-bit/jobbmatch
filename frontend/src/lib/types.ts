// Modelos de datos del MVP de Labora (Sección 4 y 5)

export type RolUsuario = 'candidato' | 'empresa' | 'admin';
export type EstadoUsuario = 'activo' | 'inactivo' | 'pendiente';

export interface Usuario {
  id: string;
  email: string;
  telefono: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  creado_en: string;
  actualizado_en: string;
  ultimo_acceso?: string;
}

export interface Consentimiento {
  id: string;
  usuario_id: string;
  tipo: 'terminos_condiciones' | 'politica_privacidad';
  version_texto: string; // ej: '1.0'
  aceptado_en: string; // ISO String Lima
}

export type TipoJornada = 'completa' | 'parcial' | 'indiferente';
export type FranjaHoraria = 'manana' | 'tarde' | 'noche' | 'rotativo';

export interface HorarioDisponible {
  dias: ('Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo')[];
  franjas: FranjaHoraria[];
}

export interface Candidato {
  id: string;
  usuario_id: string;
  nombres: string;
  apellidos: string;
  distrito_id: string;
  zonas_aceptadas: string[]; // Lista de distritos o zonas (Lima Centro, Norte, etc.)
  tiempo_max_traslado_min: number; // Por defecto 45 o 60 min
  fecha_disponible: string; // YYYY-MM-DD
  horarios_disponibles: HorarioDisponible;
  tipo_jornada: TipoJornada;
  rubros_interes: string[];
  habilidades: string[];
  experiencia_meses: number;
  sin_experiencia: boolean;
  nivel_educativo: 'Secundaria completa' | 'Técnico en curso' | 'Técnico completo' | 'Universitario en curso' | 'Universitario completo' | 'Otro';
  cv_url?: string; // Opcional (RN10)
  cv_nombre?: string;
  completitud_pct: number; // 0 a 100%
  activo: boolean;
  creado_en: string;
  actualizado_en: string;
}

// RN05: Tabla separada con acceso restringido en el servidor.
// Solo revelable cuando la oferta pasa a estado ACEPTADA.
export interface ContactoCandidato {
  candidato_id: string;
  nombres_completos: string;
  telefono: string;
  email: string;
  whatsapp: string;
}

// Función oficial para calcular el % de completitud del perfil (RN10)
export function calcularCompletitudPerfil(c: Partial<Candidato>): number {
  let score = 0;

  // 1. Datos básicos identificatorios (20%)
  if (c.nombres && c.apellidos) {
    score += 20;
  }

  // 2. Ubicación y zonas de trabajo (20%)
  if (c.distrito_id && c.zonas_aceptadas && c.zonas_aceptadas.length > 0) {
    score += 20;
  }

  // 3. Disponibilidad temporal y franjas (20%)
  if (
    c.fecha_disponible &&
    c.tipo_jornada &&
    c.horarios_disponibles &&
    c.horarios_disponibles.franjas.length > 0
  ) {
    score += 20;
  }

  // 4. Rubros de interés y habilidades (20%)
  if (
    c.rubros_interes &&
    c.rubros_interes.length > 0 &&
    c.habilidades &&
    c.habilidades.length > 0
  ) {
    score += 20;
  }

  // 5. Experiencia laboral (10%)
  // RN10: Indicar "Sin experiencia" o declarar meses cuenta como completitud válida
  if (c.sin_experiencia || (c.experiencia_meses !== undefined && c.experiencia_meses >= 0)) {
    score += 10;
  }

  // 6. CV opcional (10%)
  // RN10: El CV no es obligatorio pero añade un 10% adicional
  if (c.cv_url || c.cv_nombre) {
    score += 10;
  }

  return Math.min(100, score);
}
