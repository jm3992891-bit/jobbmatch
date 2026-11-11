import {
  Usuario,
  Consentimiento,
  Candidato,
  ContactoCandidato,
  calcularCompletitudPerfil,
} from './types';

// Almacenamiento local persistente para el MVP de Labora
// Implementa aislamiento estricto de contactos según RN05

const USERS_STORAGE_KEY = 'labora_mvp_usuarios';
const CONSENTS_STORAGE_KEY = 'labora_mvp_consentimientos';
const CANDIDATES_STORAGE_KEY = 'labora_mvp_candidatos';
const CONTACTS_STORAGE_KEY = 'labora_mvp_contactos_candidato';

// Inicialización de candidatos semilla
const INITIAL_CANDIDATES: Candidato[] = [
  {
    id: 'cand-1',
    usuario_id: 'usr-cand-1',
    nombres: 'Juan Carlos',
    apellidos: 'Pérez Gómez',
    distrito_id: 'san_miguel',
    zonas_aceptadas: ['Lima Centro', 'Callao'],
    tiempo_max_traslado_min: 45,
    fecha_disponible: '2026-10-26',
    horarios_disponibles: {
      dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      franjas: ['manana', 'tarde', 'rotativo'],
    },
    tipo_jornada: 'completa',
    rubros_interes: ['Logística y Almacén', 'Ventas y Atención al Cliente'],
    habilidades: [
      'Puntualidad y compromiso',
      'Manejo de pistola de radiofrecuencia (RF)',
      'Conteos y control de inventarios',
      'Trabajo en equipo y comunicación',
    ],
    experiencia_meses: 6,
    sin_experiencia: false,
    nivel_educativo: 'Secundaria completa',
    cv_nombre: 'CV_JuanPerez_Logistica.pdf',
    completitud_pct: 100,
    activo: true,
    creado_en: '2026-10-20T10:00:00-05:00',
    actualizado_en: '2026-10-20T10:00:00-05:00',
  },
  {
    id: 'cand-2',
    usuario_id: 'usr-cand-2',
    nombres: 'Brenda Lucía',
    apellidos: 'Ríos Mendoza',
    distrito_id: 'los_olivos',
    zonas_aceptadas: ['Lima Norte', 'Lima Centro'],
    tiempo_max_traslado_min: 45,
    fecha_disponible: '2026-10-27',
    horarios_disponibles: {
      dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      franjas: ['tarde'],
    },
    tipo_jornada: 'parcial',
    rubros_interes: ['Ventas y Atención al Cliente', 'Call Center y Contact Center'],
    habilidades: [
      'Atención cordial al cliente',
      'Facilidad de palabra y persuasión',
      'Manejo de caja y cobros (POS)',
    ],
    experiencia_meses: 0,
    sin_experiencia: true,
    nivel_educativo: 'Técnico en curso',
    completitud_pct: 90, // Sin CV pero 100% válida para matching
    activo: true,
    creado_en: '2026-10-22T14:30:00-05:00',
    actualizado_en: '2026-10-22T14:30:00-05:00',
  },
];

const INITIAL_CONTACTS: ContactoCandidato[] = [
  {
    candidato_id: 'cand-1',
    nombres_completos: 'Juan Carlos Pérez Gómez',
    telefono: '+51 987 654 321',
    email: 'juan.perez@email.com',
    whatsapp: '+51987654321',
  },
  {
    candidato_id: 'cand-2',
    nombres_completos: 'Brenda Lucía Ríos Mendoza',
    telefono: '+51 912 345 678',
    email: 'brenda.rios@email.com',
    whatsapp: '+51912345678',
  },
];

export class LaboraStorage {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // USUARIOS
  static getUsuarios(): Usuario[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveUsuario(usuario: Usuario): void {
    if (!this.isBrowser()) return;
    const usuarios = this.getUsuarios();
    const index = usuarios.findIndex((u) => u.id === usuario.id);
    if (index >= 0) {
      usuarios[index] = usuario;
    } else {
      usuarios.push(usuario);
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios));
  }

  // CONSENTIMIENTOS (RN13)
  static getConsentimientos(): Consentimiento[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(CONSENTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static saveConsentimiento(consentimiento: Consentimiento): void {
    if (!this.isBrowser()) return;
    const consentimientos = this.getConsentimientos();
    consentimientos.push(consentimiento);
    localStorage.setItem(CONSENTS_STORAGE_KEY, JSON.stringify(consentimientos));
  }

  // CANDIDATOS
  static getCandidatos(): Candidato[] {
    if (!this.isBrowser()) return INITIAL_CANDIDATES;
    const data = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(INITIAL_CANDIDATES));
      return INITIAL_CANDIDATES;
    }
    return JSON.parse(data);
  }

  static getCandidatoById(id: string): Candidato | null {
    const candidatos = this.getCandidatos();
    return candidatos.find((c) => c.id === id) || null;
  }

  static saveCandidato(candidato: Candidato): void {
    if (!this.isBrowser()) return;
    const candidatos = this.getCandidatos();
    const index = candidatos.findIndex((c) => c.id === candidato.id);
    if (index >= 0) {
      candidatos[index] = candidato;
    } else {
      candidatos.push(candidato);
    }
    localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidatos));
  }

  // CONTACTOS CANDIDATO (RN05: TABLA SEPARADA Y PRIVADA)
  static getContactosPrivados(): ContactoCandidato[] {
    if (!this.isBrowser()) return INITIAL_CONTACTS;
    const data = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
      return INITIAL_CONTACTS;
    }
    return JSON.parse(data);
  }

  static saveContactoPrivado(contacto: ContactoCandidato): void {
    if (!this.isBrowser()) return;
    const contactos = this.getContactosPrivados();
    const index = contactos.findIndex((c) => c.candidato_id === contacto.candidato_id);
    if (index >= 0) {
      contactos[index] = contacto;
    } else {
      contactos.push(contacto);
    }
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contactos));
  }

  // RN05: Obtener contacto SOLO si la oferta está ACEPTADA
  static getContactoRevelado(candidatoId: string, ofertaEstado: string): ContactoCandidato | null {
    if (ofertaEstado !== 'ACEPTADA') {
      return null; // Protección en capa de datos: no se revela teléfono ni email
    }
    const contactos = this.getContactosPrivados();
    return contactos.find((c) => c.candidato_id === candidatoId) || null;
  }

  // REGISTRO EXPRESS DE CANDIDATO (Hito 1 completo)
  static registrarCandidatoExpress(input: {
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    distrito_id: string;
    zonas_aceptadas: string[];
    tiempo_max_traslado_min: number;
    fecha_disponible: string;
    tipo_jornada: 'completa' | 'parcial' | 'indiferente';
    franjas_horarias: ('manana' | 'tarde' | 'noche' | 'rotativo')[];
    rubros_interes: string[];
    habilidades: string[];
    sin_experiencia: boolean;
    experiencia_meses: number;
    nivel_educativo: Candidato['nivel_educativo'];
    cv_nombre?: string;
    cv_url?: string;
    consentimiento_terminos: boolean;
    consentimiento_privacidad: boolean;
  }): { candidato: Candidato; usuario: Usuario } {
    const timestampLima = new Date().toISOString();
    const usuarioId = 'usr-' + Date.now();
    const candidatoId = 'cand-' + Date.now();

    // 1. Crear usuario
    const usuario: Usuario = {
      id: usuarioId,
      email: input.email.trim().toLowerCase(),
      telefono: input.telefono.trim(),
      rol: 'candidato',
      estado: 'activo',
      creado_en: timestampLima,
      actualizado_en: timestampLima,
      ultimo_acceso: timestampLima,
    };
    this.saveUsuario(usuario);

    // 2. Guardar consentimientos versionados (RN13)
    if (input.consentimiento_terminos) {
      this.saveConsentimiento({
        id: 'cons-' + Date.now() + '-tc',
        usuario_id: usuarioId,
        tipo: 'terminos_condiciones',
        version_texto: '1.0',
        aceptado_en: timestampLima,
      });
    }
    if (input.consentimiento_privacidad) {
      this.saveConsentimiento({
        id: 'cons-' + Date.now() + '-pp',
        usuario_id: usuarioId,
        tipo: 'politica_privacidad',
        version_texto: '1.0',
        aceptado_en: timestampLima,
      });
    }

    // 3. Crear candidato y calcular completitud (RN10)
    const candidatoTemp: Partial<Candidato> = {
      nombres: input.nombres.trim(),
      apellidos: input.apellidos.trim(),
      distrito_id: input.distrito_id,
      zonas_aceptadas: input.zonas_aceptadas,
      tiempo_max_traslado_min: input.tiempo_max_traslado_min,
      fecha_disponible: input.fecha_disponible,
      horarios_disponibles: {
        dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        franjas: input.franjas_horarias,
      },
      tipo_jornada: input.tipo_jornada,
      rubros_interes: input.rubros_interes,
      habilidades: input.habilidades,
      experiencia_meses: input.sin_experiencia ? 0 : input.experiencia_meses,
      sin_experiencia: input.sin_experiencia,
      nivel_educativo: input.nivel_educativo,
      cv_nombre: input.cv_nombre,
      cv_url: input.cv_url,
    };

    const completitud = calcularCompletitudPerfil(candidatoTemp);

    const candidato: Candidato = {
      id: candidatoId,
      usuario_id: usuarioId,
      nombres: input.nombres.trim(),
      apellidos: input.apellidos.trim(),
      distrito_id: input.distrito_id,
      zonas_aceptadas: input.zonas_aceptadas,
      tiempo_max_traslado_min: input.tiempo_max_traslado_min,
      fecha_disponible: input.fecha_disponible,
      horarios_disponibles: {
        dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        franjas: input.franjas_horarias,
      },
      tipo_jornada: input.tipo_jornada,
      rubros_interes: input.rubros_interes,
      habilidades: input.habilidades,
      experiencia_meses: input.sin_experiencia ? 0 : input.experiencia_meses,
      sin_experiencia: input.sin_experiencia,
      nivel_educativo: input.nivel_educativo,
      cv_nombre: input.cv_nombre,
      cv_url: input.cv_url,
      completitud_pct: completitud,
      activo: true,
      creado_en: timestampLima,
      actualizado_en: timestampLima,
    };
    this.saveCandidato(candidato);

    // 4. Guardar datos de contacto de forma aislada (RN05)
    this.saveContactoPrivado({
      candidato_id: candidatoId,
      nombres_completos: `${input.nombres.trim()} ${input.apellidos.trim()}`,
      telefono: input.telefono.trim(),
      email: input.email.trim().toLowerCase(),
      whatsapp: input.telefono.replace(/\s+/g, ''),
    });

    return { candidato, usuario };
  }
}
