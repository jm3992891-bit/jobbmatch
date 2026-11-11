// Catálogos oficiales de Labora para Lima Metropolitana y Callao (Sección 4)

export interface Distrito {
  id: string;
  nombre: string;
  zona: 'Lima Centro' | 'Lima Norte' | 'Lima Sur' | 'Lima Este' | 'Callao';
  lat: number;
  lng: number;
}

export const DISTRITOS_LIMA: Distrito[] = [
  // Lima Centro
  { id: 'cercado', nombre: 'Cercado de Lima', zona: 'Lima Centro', lat: -12.0464, lng: -77.0428 },
  { id: 'brena', nombre: 'Breña', zona: 'Lima Centro', lat: -12.0583, lng: -77.0544 },
  { id: 'la_victoria', nombre: 'La Victoria', zona: 'Lima Centro', lat: -12.0653, lng: -77.0131 },
  { id: 'lince', nombre: 'Lince', zona: 'Lima Centro', lat: -12.0833, lng: -77.0347 },
  { id: 'magdalena', nombre: 'Magdalena del Mar', zona: 'Lima Centro', lat: -12.0911, lng: -77.0708 },
  { id: 'miraflores', nombre: 'Miraflores', zona: 'Lima Centro', lat: -12.1194, lng: -77.0289 },
  { id: 'pueblo_libre', nombre: 'Pueblo Libre', zona: 'Lima Centro', lat: -12.0736, lng: -77.0628 },
  { id: 'san_borja', nombre: 'San Borja', zona: 'Lima Centro', lat: -12.0994, lng: -77.0017 },
  { id: 'san_isidro', nombre: 'San Isidro', zona: 'Lima Centro', lat: -12.0972, lng: -77.0347 },
  { id: 'san_miguel', nombre: 'San Miguel', zona: 'Lima Centro', lat: -12.0789, lng: -77.0917 },
  { id: 'surquillo', nombre: 'Surquillo', zona: 'Lima Centro', lat: -12.1133, lng: -77.0197 },
  { id: 'jesus_maria', nombre: 'Jesús María', zona: 'Lima Centro', lat: -12.0744, lng: -77.0478 },

  // Lima Norte
  { id: 'comas', nombre: 'Comas', zona: 'Lima Norte', lat: -11.9328, lng: -77.0567 },
  { id: 'los_olivos', nombre: 'Los Olivos', zona: 'Lima Norte', lat: -11.9897, lng: -77.0722 },
  { id: 'independencia', nombre: 'Independencia', zona: 'Lima Norte', lat: -11.9961, lng: -77.0522 },
  { id: 'san_martin_porres', nombre: 'San Martín de Porres', zona: 'Lima Norte', lat: -12.0169, lng: -77.0864 },
  { id: 'puente_piedra', nombre: 'Puente Piedra', zona: 'Lima Norte', lat: -11.8675, lng: -77.0767 },
  { id: 'carabayllo', nombre: 'Carabayllo', zona: 'Lima Norte', lat: -11.9022, lng: -77.0278 },
  { id: 'ancor', nombre: 'Ancón', zona: 'Lima Norte', lat: -11.7733, lng: -77.1761 },
  { id: 'santa_rosa', nombre: 'Santa Rosa', zona: 'Lima Norte', lat: -11.8028, lng: -77.1639 },

  // Lima Sur
  { id: 'surco', nombre: 'Santiago de Surco', zona: 'Lima Sur', lat: -12.1458, lng: -77.0056 },
  { id: 'san_juan_miraflores', nombre: 'San Juan de Miraflores', zona: 'Lima Sur', lat: -12.1611, lng: -76.9711 },
  { id: 'villa_maria_triunfo', nombre: 'Villa María del Triunfo', zona: 'Lima Sur', lat: -12.1628, lng: -76.9297 },
  { id: 'villa_salvador', nombre: 'Villa El Salvador', zona: 'Lima Sur', lat: -12.2139, lng: -76.9367 },
  { id: 'chorrillos', nombre: 'Chorrillos', zona: 'Lima Sur', lat: -12.1808, lng: -77.0142 },
  { id: 'lurin', nombre: 'Lurín', zona: 'Lima Sur', lat: -12.2742, lng: -76.8711 },
  { id: 'pachacamac', nombre: 'Pachacámac', zona: 'Lima Sur', lat: -12.2306, lng: -76.8647 },

  // Lima Este
  { id: 'ate', nombre: 'Ate', zona: 'Lima Este', lat: -12.0286, lng: -76.9189 },
  { id: 'san_juan_lurigancho', nombre: 'San Juan de Lurigancho', zona: 'Lima Este', lat: -11.9861, lng: -77.0017 },
  { id: 'santa_anita', nombre: 'Santa Anita', zona: 'Lima Este', lat: -12.0461, lng: -76.9711 },
  { id: 'el_agustino', nombre: 'El Agustino', zona: 'Lima Este', lat: -12.0517, lng: -77.0019 },
  { id: 'la_molina', nombre: 'La Molina', zona: 'Lima Este', lat: -12.0833, lng: -76.9333 },
  { id: 'chaclacayo', nombre: 'Chaclacayo', zona: 'Lima Este', lat: -11.9833, lng: -76.7667 },
  { id: 'lurigancho_chosica', nombre: 'Lurigancho-Chosica', zona: 'Lima Este', lat: -11.9361, lng: -76.7056 },

  // Callao
  { id: 'callao_cercado', nombre: 'Callao (Cercado)', zona: 'Callao', lat: -12.0565, lng: -77.1181 },
  { id: 'bellavista', nombre: 'Bellavista', zona: 'Callao', lat: -12.0622, lng: -77.1264 },
  { id: 'carmen_legua', nombre: 'Carmen de la Legua', zona: 'Callao', lat: -12.0439, lng: -77.0864 },
  { id: 'la_perla', nombre: 'La Perla', zona: 'Callao', lat: -12.0711, lng: -77.1128 },
  { id: 'la_punta', nombre: 'La Punta', zona: 'Callao', lat: -12.0722, lng: -77.1639 },
  { id: 'ventanilla', nombre: 'Ventanilla', zona: 'Callao', lat: -11.8767, lng: -77.1267 },
  { id: 'mi_peru', nombre: 'Mi Perú', zona: 'Callao', lat: -11.8625, lng: -77.1208 },
];

export const ZONAS_LIMA = [
  'Lima Centro',
  'Lima Norte',
  'Lima Sur',
  'Lima Este',
  'Callao',
] as const;

export interface Rubro {
  id: string;
  nombre: string;
  icono: string;
  puestosFrecuentes: string[];
}

export const RUBROS_LABORA: Rubro[] = [
  {
    id: 'logistica_almacen',
    nombre: 'Logística y Almacén',
    icono: '📦',
    puestosFrecuentes: [
      'Operario de almacén',
      'Auxiliar de picking/packing',
      'Estibador / Embalador',
      'Despachador',
      'Inventariador',
    ],
  },
  {
    id: 'ventas_atencion',
    nombre: 'Ventas y Atención al Cliente',
    icono: '🛍️',
    puestosFrecuentes: [
      'Asesor de ventas en tienda',
      'Cajero(a)',
      'Promotor(a) de ventas',
      'Atención en mostrador',
      'Reponedor de góndola',
    ],
  },
  {
    id: 'operaciones_limpieza',
    nombre: 'Operaciones y Limpieza',
    icono: '🧹',
    puestosFrecuentes: [
      'Operario de limpieza industrial',
      'Auxiliar de mantenimiento',
      'Vajillero / Steward',
      'Operario de producción',
    ],
  },
  {
    id: 'call_center',
    nombre: 'Call Center y Contact Center',
    icono: '🎧',
    puestosFrecuentes: [
      'Teleoperador de atención',
      'Ejecutivo de ventas telefónicas',
      'Agente de soporte al cliente',
      'Asesor de cobranzas tempranas',
    ],
  },
  {
    id: 'gastronomia_salon',
    nombre: 'Gastronomía y Salón',
    icono: '🍽️',
    puestosFrecuentes: [
      'Mozo / Azafata',
      'Ayudante de cocina',
      'Atención en comida rápida',
      'Bartender / Barista junior',
    ],
  },
  {
    id: 'seguridad_vigilancia',
    nombre: 'Seguridad y Prevención',
    icono: '🛡️',
    puestosFrecuentes: [
      'Agente de prevención de pérdidas',
      'Controlador de accesos',
      'Vigilante particular',
    ],
  },
];

export const HABILIDADES_LABORA = [
  'Puntualidad y compromiso',
  'Atención cordial al cliente',
  'Manejo de caja y cobros (POS)',
  'Conteos y control de inventarios',
  'Manejo de pistola de radiofrecuencia (RF)',
  'Embalaje y etiquetado rápido',
  'Trabajo en equipo y comunicación',
  'Facilidad de palabra y persuasión',
  'Manejo básico de PC / Smartphone',
  'Manejo de herramientas de limpieza',
  'Buenas Prácticas de Manufactura (BPM)',
  'Resolución rápida de consultas',
  'Esfuerzo físico y dinamismo',
  'Capacidad para trabajar bajo presión',
];

// Cálculo de distancia euclidiana aproximada en km entre dos distritos
export function calcularDistanciaKm(distrito1Id: string, distrito2Id: string): number {
  if (distrito1Id === distrito2Id) return 0;
  const d1 = DISTRITOS_LIMA.find((d) => d.id === distrito1Id);
  const d2 = DISTRITOS_LIMA.find((d) => d.id === distrito2Id);
  if (!d1 || !d2) return 15; // default 15km

  const R = 6371; // Radio tierra km
  const dLat = ((d2.lat - d1.lat) * Math.PI) / 180;
  const dLon = ((d2.lng - d1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((d1.lat * Math.PI) / 180) *
      Math.cos((d2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Estima minutos de viaje promedio en transporte público en Lima
export function estimarTiempoTrasladoMin(distrito1Id: string, distrito2Id: string): number {
  const km = calcularDistanciaKm(distrito1Id, distrito2Id);
  if (km === 0) return 15;
  if (km <= 5) return 25;
  if (km <= 10) return 40;
  if (km <= 18) return 60;
  return Math.min(90, Math.round(km * 3.5));
}
