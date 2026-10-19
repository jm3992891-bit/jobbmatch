"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  TrendingUp, 
  Bell, 
  Zap, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  FileSearch, 
  Sparkles, 
  Loader2,
  MapPin,
  DollarSign,
  Clock,
  Star,
  MessageCircle,
  Check,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

// Categorías y datos reales para puestos operativos y de alta rotación en Perú
const OPERATIONAL_ROLES = [
  {
    role: "Operario de Almacén y Picking",
    tag: "📦 Almacén y Reparto",
    sinExperiencia: true,
    partTime: false,
    ubicacionHabitual: "Ate, Lurín, Callao, Huachipa (Centros Logísticos)",
    turnos: "Turnos rotativos (Mañana / Noche) o Turno fijo Lunes a Sábado",
    salarioMin: 1130,
    salarioMax: 1450,
    requisitos: [
      "Secundaria completa.",
      "Disponibilidad para esfuerzo físico y embalaje.",
      "Conteo con pistola de radiofrecuencia (se capacita en el puesto).",
      "Ganas de aprender y puntualidad."
    ],
    feedback: "¡Excelente perfil para logística! En tus distritos seleccionados hay más de 30 empresas contratando con ingreso inmediato a planilla completa esta semana."
  },
  {
    role: "Atención al Cliente y Caja",
    tag: "🛒 Tiendas y Caja",
    sinExperiencia: true,
    partTime: false,
    ubicacionHabitual: "Tiendas de conveniencia, Supermercados y Centros Comerciales",
    turnos: "Rotativo 8 horas (Apertura o Cierre de tienda)",
    salarioMin: 1025,
    salarioMax: 1300,
    requisitos: [
      "Trato amable, cordial y empatía con el cliente.",
      "Manejo básico de caja y POS (se capacita al 100%).",
      "Apoyo en orden, reposición y limpieza de góndolas.",
      "DNI vigente o carnet de extranjería."
    ],
    feedback: "¡Puesto con altísima rotación! Tu perfil es ideal para retail rápido. Si cuentas con carnet de sanidad vigente, las empresas agendan entrevista en menos de 24 horas."
  },
  {
    role: "Asesor Telefónico / Call Center",
    tag: "🎧 Call Center",
    sinExperiencia: true,
    partTime: true,
    ubicacionHabitual: "Cercado de Lima, Surquillo, San Borja (con opción Híbrido/Remoto al 2do mes)",
    turnos: "Opciones Full-time y Part-time (4 a 6 horas diarias)",
    salarioMin: 1025,
    salarioMax: 1500,
    requisitos: [
      "Buena dicción, fluidez verbal y escucha activa.",
      "Manejo básico de teclado y computadora.",
      "Secundaria completa.",
      "Capacitación pagada desde el primer día."
    ],
    feedback: "Gran opción para generar ingresos inmediatos con comisiones sin tope y horarios compatibles con estudios."
  },
  {
    role: "Atención en Salón y Ayudante de Cocina",
    tag: "🍔 Restaurantes",
    sinExperiencia: true,
    partTime: true,
    ubicacionHabitual: "Miraflores, San Isidro, Surco, C.C. Mall del Sur, MegaPlaza",
    turnos: "Turno tarde/noche (Almuerzos y cenas) + Propinas diarias",
    salarioMin: 1025,
    salarioMax: 1350,
    requisitos: [
      "Atención de comensales y entrega de pedidos en mesa.",
      "Apoyo en preparación preliminar de insumos.",
      "Carnet de sanidad para manipulación de alimentos.",
      "Trabajo dinámico en equipo."
    ],
    feedback: "Las cadenas gastronómicas y franquicias en Lima están acelerando contrataciones para turnos de fin de semana y festivos."
  },
  {
    role: "Operario de Limpieza y Mantenimiento",
    tag: "🌟 Sin Experiencia",
    sinExperiencia: true,
    partTime: false,
    ubicacionHabitual: "Edificios corporativos, clínicas y plantas industriales",
    turnos: "Lunes a Sábado (Turno mañana 6:00 am o turno tarde)",
    salarioMin: 1025,
    salarioMax: 1200,
    requisitos: [
      "Limpieza y desinfección de ambientes designados.",
      "Uso responsable de implementos de aseo y EPPs.",
      "Compromiso, seriedad y puntualidad.",
      "No requiere experiencia previa."
    ],
    feedback: "Puestos seguros con estabilidad laboral garantizada, uniformes completos y pago puntual quincenal."
  },
  {
    role: "Repartidor / Motorizado con Moto Propia",
    tag: "📦 Almacén y Reparto",
    sinExperiencia: false,
    partTime: true,
    ubicacionHabitual: "Lima Metropolitana (Rutas por zonas)",
    turnos: "Part-time y Full-time flexible",
    salarioMin: 1400,
    salarioMax: 2200,
    requisitos: [
      "Moto propia en buen estado y SOAT vigente.",
      "Licencia de conducir B-IIb vigente.",
      "Smartphone con plan de datos y GPS.",
      "Conocimiento de calles y avenidas principales."
    ],
    feedback: "Alta demanda para entregas express y farmacias con pago por punto de entrega más combustible."
  }
];

const MOCK_OFFERS = [
  {
    id: 1,
    puesto: "Operario de Almacén / Picking",
    empresa: "Logística Perú S.A.C.",
    match: "96% Compatible contigo",
    tiempo: "Hace 1 hora",
    ubicacion: "Ate (Av. Nicolás Ayllón, alt. Ceres)",
    sueldo: "S/ 1,130 + Horas Extras | Planilla Completa",
    turno: "Full-time (Turnos Rotativos)",
    expTag: "Sin experiencia / Capacitación pagada",
    isGreenExp: true,
    funciones: [
      "Preparación de pedidos y picking de productos según orden de compra.",
      "Embalaje, rotulado y acondicionamiento de paquetes para despacho.",
      "Conteo periódico de stock e inventario con lector de código de barras.",
      "Mantener orden y limpieza en pasillos de almacenaje."
    ],
    beneficios: "Planilla directa desde el día 1 con todos los beneficios de ley (Gratificación, CTS, EsSalud, Asignación Familiar). Almuerzo cubierto al 100% en comedor y movilidad de acercamiento."
  },
  {
    id: 2,
    puesto: "Atención al Cliente y Caja",
    empresa: "Empresa líder en Retail (Tiendas de Conveniencia)",
    match: "94% Compatible contigo",
    tiempo: "Hace 2 horas",
    ubicacion: "San Juan de Lurigancho (Cerca a Estación Los Jardines)",
    sueldo: "S/ 1,025 + Bono puntualidad S/ 150 | Planilla Completa",
    turno: "Full-time (Turno tarde 2:00 pm - 10:30 pm)",
    expTag: "Sin experiencia requerida",
    isGreenExp: true,
    funciones: [
      "Atención rápida y amable en mostrador.",
      "Cobro en caja registradora en efectivo, tarjetas y billeteras digitales (Yape/Plin).",
      "Recepción y acomodo de mercadería en estantes.",
      "Control de fechas de vencimiento y precios visibles."
    ],
    beneficios: "Pagos puntuales quincena y fin de mes. Bonos por metas de venta de la tienda y convenios de descuento educativo para ti o tus familiares."
  },
  {
    id: 3,
    puesto: "Cajero Polifuncional",
    empresa: "Cadena de Supermercados Metro",
    match: "91% Compatible contigo",
    tiempo: "Hace 4 horas",
    ubicacion: "Independencia (Cerca a C.C. MegaPlaza)",
    sueldo: "S/ 1,025 + Bono de riesgo de caja S/ 100 | Planilla Completa",
    turno: "Part-time (24 horas semanales / Turnos rotativos)",
    expTag: "3 meses de exp. en caja o afines",
    isGreenExp: false,
    funciones: [
      "Registro de productos por escáner y cobro rápido al cliente.",
      "Apertura, arqueo y cuadre de caja diario sin faltantes.",
      "Orientación al cliente sobre promociones y canje de puntos.",
      "Apoyo en embolsado y orden de la zona de cajas."
    ],
    beneficios: "Ingreso a planilla con beneficios proporcionales. Descuento de compras en tienda del 10% y línea de carrera para supervisión de caja en 6 meses."
  },
  {
    id: 4,
    puesto: "Operario de Limpieza y Acondicionamiento",
    empresa: "Servicios Corporativos Clean S.A.C.",
    match: "89% Compatible contigo",
    tiempo: "Ayer",
    ubicacion: "San Isidro (Zona Financiera, Av. Canaval y Moreyra)",
    sueldo: "S/ 1,025 + Bono de movilidad S/ 120 | Planilla Completa",
    turno: "Lunes a Sábado (Fijo 7:00 am - 4:00 pm)",
    expTag: "Sin experiencia / Inducción inmediata",
    isGreenExp: true,
    funciones: [
      "Limpieza y desinfección de pisos, oficinas, pasillos y servicios higiénicos.",
      "Reposición de insumos de higiene (jabón, papel, alcohol).",
      "Manejo y custodia adecuada de equipos de limpieza y materiales.",
      "Reportar desperfectos o novedades al supervisor de sede."
    ],
    beneficios: "Sede fija de trabajo (no rotación imprevista). Uniforme completo y EPPs nuevos entregados sin costo. Seguro Vida Ley y gratificaciones."
  },
  {
    id: 5,
    puesto: "Asesor Telefónico / Call Center",
    empresa: "Konecta Perú",
    match: "88% Compatible contigo",
    tiempo: "Hace 2 días",
    ubicacion: "Cercado de Lima (Av. Nicolás Dueñas / Mall)",
    sueldo: "S/ 1,025 + Bono de desempeño S/ 200 | Planilla Completa",
    turno: "Lunes a Viernes (Fijo 8:00 am - 5:00 pm)",
    expTag: "Sin experiencia (Capacitación pagada)",
    isGreenExp: true,
    funciones: [
      "Recepción de llamadas de clientes para consultas y soporte de servicios.",
      "Registro claro y detallado de cada llamada en el sistema.",
      "Brindar soluciones rápidas según protocolos de calidad.",
      "Cumplir con las metas de tiempo de atención."
    ],
    beneficios: "100% de la capacitación pagada desde el primer día. Planilla completa, seguro médico familiar y opción a trabajo híbrido a partir del 3er mes."
  }
];

function OfferCard({ offer }: { offer: typeof MOCK_OFFERS[0] }) {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'passed'>('pending');
  const [isPassingModalOpen, setIsPassingModalOpen] = useState(false);
  const [passedReason, setPassedReason] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleApply = () => {
    setStatus('accepted');
    setShowDetails(false);
  };

  const handleSelectPassReason = (reason: string) => {
    setPassedReason(reason);
    setStatus('passed');
    setIsPassingModalOpen(false);
    setShowDetails(false);
  };

  const handleUndo = () => {
    setStatus('pending');
    setPassedReason("");
  };

  if (status === 'passed') {
    return (
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 flex flex-col justify-center items-center text-center opacity-85 transition-all">
        <XCircle className="w-8 h-8 text-gray-400 mb-2" />
        <span className="font-bold text-gray-700 text-sm mb-0.5">Oferta pasada</span>
        <span className="text-xs text-gray-500 mb-1">Motivo: {passedReason}</span>
        <p className="text-[11px] text-gray-400 mb-3">Ajustaremos tus próximas recomendaciones.</p>
        <button 
          onClick={handleUndo} 
          className="text-xs font-bold text-institutional-blue hover:text-blue-900 underline"
        >
          Deshacer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">
        <div className="p-5 flex flex-col flex-grow">
          
          {/* CABECERA: Badge de Match + Tiempo */}
          <div className="flex justify-between items-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              {offer.match}
            </span>
            <span className="text-xs text-gray-400 font-medium">{offer.tiempo}</span>
          </div>
          
          {/* TÍTULO Y EMPRESA */}
          <h3 className="text-lg font-bold text-gray-800 leading-snug mb-0.5">{offer.puesto}</h3>
          <p className="text-sm font-semibold text-gray-500 mb-3.5">{offer.empresa}</p>
          
          {/* BLOQUE DE PÍLDORAS DE INFORMACIÓN CLAVE */}
          <div className="space-y-2 mb-4 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 text-xs">
            {/* Ubicación */}
            <div className="flex items-start gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-institutional-blue flex-shrink-0 mt-0.5" />
              <span><strong>Ubicación:</strong> {offer.ubicacion}</span>
            </div>

            {/* Sueldo y Régimen */}
            <div className="flex items-start gap-2 text-gray-700">
              <DollarSign className="w-4 h-4 text-institutional-green flex-shrink-0 mt-0.5" />
              <span><strong>Sueldo:</strong> {offer.sueldo}</span>
            </div>

            {/* Turno */}
            <div className="flex items-start gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span><strong>Turno:</strong> {offer.turno}</span>
            </div>

            {/* Tag de Experiencia Destacado */}
            <div className="pt-1.5 flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold text-[11px] ${
                offer.isGreenExp 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                <Star className="w-3 h-3 fill-current" />
                {offer.expTag}
              </span>
            </div>
          </div>

          {/* Enlace secundario */}
          <button 
            onClick={() => setShowDetails(true)}
            className="text-institutional-blue font-bold text-xs hover:underline flex items-center gap-1 mb-4 w-fit"
          >
            Ver funciones y beneficios &gt;
          </button>
          
          {/* BOTONES DE ACCIÓN (CTAs) */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            {status === 'pending' ? (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleApply}
                  className="w-full bg-institutional-green hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  ¡Me interesa! Postular en 1 clic
                </button>
                <button 
                  onClick={() => setIsPassingModalOpen(true)}
                  className="w-full bg-white text-gray-500 border border-gray-200 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 hover:text-gray-700 transition-colors"
                >
                  Pasar oferta
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col items-center text-center text-emerald-800 animate-in fade-in zoom-in-95">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-1" />
                <h4 className="font-bold text-sm">¡Postulación enviada!</h4>
                <p className="text-xs mt-1 text-emerald-700 leading-snug">
                  Datos compartidos con {offer.empresa}. Te contactarán directamente a tu WhatsApp.
                </p>
                <button 
                  onClick={handleUndo} 
                  className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-900 underline"
                >
                  Deshacer postulación
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MICRO-INTERACCIÓN: MODAL LIGERO "¿POR QUÉ PASAS ESTA OFERTA?" */}
      {isPassingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-in zoom-in-95">
            <h3 className="text-lg font-black text-institutional-blue mb-1">¿Por qué pasas esta oferta?</h3>
            <p className="text-xs text-gray-500 mb-5">Tu respuesta nos ayuda a recomendarte ofertas más precisas.</p>
            
            <div className="flex flex-col gap-2.5 mb-4">
              <button
                onClick={() => handleSelectPassReason("Muy lejos")}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 hover:border-institutional-blue hover:bg-blue-50 font-bold text-sm text-gray-700 transition-all flex items-center justify-center gap-2"
              >
                📍 Muy lejos de mi casa
              </button>
              <button
                onClick={() => handleSelectPassReason("Horario no me sirve")}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 hover:border-institutional-blue hover:bg-blue-50 font-bold text-sm text-gray-700 transition-all flex items-center justify-center gap-2"
              >
                ⏰ Horario no me sirve
              </button>
              <button
                onClick={() => handleSelectPassReason("Sueldo bajo")}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 hover:border-institutional-blue hover:bg-blue-50 font-bold text-sm text-gray-700 transition-all flex items-center justify-center gap-2"
              >
                💰 Sueldo por debajo de mi expectativa
              </button>
            </div>

            <button
              onClick={() => setIsPassingModalOpen(false)}
              className="text-xs font-bold text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MODAL DETALLES DE OFERTA */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-gray-50">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
                  <Zap className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  {offer.match}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-gray-800">{offer.puesto}</h2>
                <p className="text-institutional-blue font-semibold mt-0.5 text-sm">{offer.empresa}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-institutional-light/50 border border-teal-100 rounded-xl p-4">
                <div>
                  <span className="block text-xs font-bold text-gray-500 uppercase mb-0.5">Ubicación</span>
                  <p className="font-bold text-gray-800 text-sm">{offer.ubicacion}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-500 uppercase mb-0.5">Sueldo y Régimen</span>
                  <p className="font-black text-institutional-green text-sm">{offer.sueldo}</p>
                </div>
                <div className="md:col-span-2 pt-2 border-t border-teal-100/60">
                  <span className="block text-xs font-bold text-gray-500 uppercase mb-0.5">Turno / Horario</span>
                  <p className="font-semibold text-gray-700 text-sm">{offer.turno}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-1.5 mb-2.5">
                  Principales Funciones
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
                  {offer.funciones.map((fn, idx) => (
                    <li key={idx} className="leading-relaxed">{fn}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-1.5 mb-2.5">
                  Beneficios
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                  {offer.beneficios}
                </p>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex gap-3 text-emerald-900 text-xs items-center">
                <MessageCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <p>
                  <strong>Contacto directo por WhatsApp:</strong> Al postular, la empresa revisará tus datos y te enviará un mensaje para agendar la entrevista.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowDetails(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors text-sm"
              >
                Cerrar
              </button>
              {status === 'pending' && (
                <button 
                  onClick={handleApply}
                  className="px-6 py-2.5 rounded-xl font-bold bg-institutional-green hover:bg-emerald-600 text-white transition-colors shadow-sm text-sm flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  ¡Me interesa! Postular en 1 clic
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CandidateDashboardPage() {
  const [candidateName, setCandidateName] = useState("Juan Carlos Pérez");
  const [showAllOffers, setShowAllOffers] = useState(false);
  
  // Checklist rápido interactivo
  const [dniValidado, setDniValidado] = useState(false);
  const [distritosElegidos, setDistritosElegidos] = useState(false);
  const [carnetSanidad, setCarnetSanidad] = useState(false);

  // Explorador de Trabajos Disponibles State
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [activeChipFilter, setActiveChipFilter] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<typeof OPERATIONAL_ROLES[0] | null>(OPERATIONAL_ROLES[0]);
  const [isComparing, setIsComparing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("Labora_candidate_name") || "Juan Carlos Pérez";
      setCandidateName(savedName);
    }
  }, []);

  // Cálculo dinámico de completitud
  const basePercent = 75;
  const extraDni = dniValidado ? 10 : 0;
  const extraDistritos = distritosElegidos ? 10 : 0;
  const extraCarnet = carnetSanidad ? 5 : 0;
  const profileCompletion = Math.min(100, basePercent + extraDni + extraDistritos + extraCarnet);

  const displayedOffers = showAllOffers ? MOCK_OFFERS : MOCK_OFFERS.slice(0, 3);
  
  // Filtrado de roles según búsqueda y chip activo
  const filteredRoles = OPERATIONAL_ROLES.filter(role => {
    const matchesSearch = role.role.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
                          role.tag.toLowerCase().includes(jobSearchTerm.toLowerCase());
    if (activeChipFilter === "🌟 Sin Experiencia") {
      return matchesSearch && role.sinExperiencia;
    }
    if (activeChipFilter === "🕒 Medio Tiempo") {
      return matchesSearch && role.partTime;
    }
    if (activeChipFilter) {
      return matchesSearch && role.tag.includes(activeChipFilter.replace(/[🌟🛒📦🍔🎧🕒]/g, '').trim());
    }
    return matchesSearch;
  });

  const handleChipClick = (chip: string) => {
    if (activeChipFilter === chip) {
      setActiveChipFilter(null);
      setJobSearchTerm("");
    } else {
      setActiveChipFilter(chip);
      setJobSearchTerm("");
      const found = OPERATIONAL_ROLES.find(r => {
        if (chip === "🌟 Sin Experiencia") return r.sinExperiencia;
        if (chip === "🕒 Medio Tiempo") return r.partTime;
        return r.tag.includes(chip.replace(/[🌟🛒📦🍔🎧🕒]/g, '').trim());
      });
      if (found) setSelectedRole(found);
    }
    setShowFeedback(false);
  };

  const handleSelectRole = (role: typeof OPERATIONAL_ROLES[0]) => {
    setSelectedRole(role);
    setJobSearchTerm(role.role);
    setShowSuggestions(false);
    setShowFeedback(false);
  };

  const handleCompareCV = () => {
    setIsComparing(true);
    setShowFeedback(false);
    setTimeout(() => {
      setIsComparing(false);
      setShowFeedback(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-institutional-light font-sans pb-16">

      <div className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
        
        {/* BANNER WHATSAPP (Visible y tranquilizador para candidatos en Perú) */}
        <div className="mb-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse"></span>
                <h4 className="font-black text-sm tracking-wide">Alertas WhatsApp Activas</h4>
              </div>
              <p className="text-xs text-emerald-100">
                Te avisaremos al celular apenas una empresa revise tu perfil y solicite entrevistarte.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-bold text-white border border-white/20 whitespace-nowrap">
            Número verificado: +51 987 654 321
          </span>
        </div>

        {/* CONTENEDOR PRINCIPAL:
            En Desktop (lg): 2 columnas a la izquierda (Perfil/Radar/Explorador), 1 columna a la derecha (Ofertas).
            En Mobile (< lg): Jerarquía estricta:
              1. Ofertas (Propuestas directas)
              2. Tu Perfil Labora (Completitud)
              3. Explora Trabajos Disponibles
              4. Radar de Oportunidades Hoy
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          {/* COLUMNA DE OFERTAS:
              Mobile: order-1 (Arriba de todo)
              Desktop: order-2 (Columna derecha lg:col-span-1)
          */}
          <div className="order-1 lg:order-2 lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 md:p-6 lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-black text-gray-800 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-institutional-blue" /> Ofertas ({MOCK_OFFERS.length})
                  </h2>
                  <p className="text-gray-500 text-xs mt-0.5">Propuestas directas según tu perfil y ubicación.</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full animate-pulse">
                  Nuevas
                </span>
              </div>
              
              <div className="space-y-4">
                {displayedOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                {MOCK_OFFERS.length > 3 && !showAllOffers && (
                  <button 
                    onClick={() => setShowAllOffers(true)}
                    className="w-full flex items-center justify-center gap-1 text-xs font-bold text-institutional-blue bg-blue-50 px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    Ver más ofertas ({MOCK_OFFERS.length - 3} restantes) <ChevronDown className="w-4 h-4" />
                  </button>
                )}
                {showAllOffers && MOCK_OFFERS.length > 3 && (
                  <button 
                    onClick={() => setShowAllOffers(false)}
                    className="w-full flex items-center justify-center gap-2 font-bold text-gray-500 bg-gray-100 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors text-xs"
                  >
                    <ChevronUp className="w-4 h-4" /> Mostrar menos
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* COLUMNA PRINCIPAL (Perfil, Explorador, Radar):
              Mobile: order-2 (Renders 2. Perfil -> 3. Explorador -> 4. Radar)
              Desktop: order-1 (Columna izquierda lg:col-span-2)
          */}
          <div className="order-2 lg:order-1 lg:col-span-2 flex flex-col gap-6">
            
            {/* GRID / FLEX WRAPPER PARA COMPONENTES DE LA IZQUIERDA:
                En Desktop: Tu Perfil y Radar se ponen en fila de 2, Explorador va debajo.
                En Mobile: Orden estricto 2. Perfil -> 3. Explorador -> 4. Radar.
            */}
            <div className="contents lg:grid lg:grid-cols-2 lg:gap-6">
              
              {/* COMPONENTE 2: Tu Perfil Labora (Porcentaje de Completitud)
                  Mobile: order-1 (segundo elemento visible)
                  Desktop: order-1 (columna 1 de la fila superior)
              */}
              <div className="order-1 lg:order-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-black text-gray-800 text-lg">Tu Perfil Labora</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Nivel de visibilidad ante empresas contratistas.</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-base border-4 transition-all ${
                      profileCompletion === 100 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-500' 
                        : 'bg-blue-50 text-institutional-blue border-institutional-blue'
                    }`}>
                      {profileCompletion}%
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        profileCompletion === 100 ? 'bg-emerald-500' : 'bg-institutional-blue'
                      }`}
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>

                  {/* Alerta Destacada Reestructurada */}
                  <div className="bg-amber-50 text-amber-900 text-xs px-3.5 py-3 rounded-xl border border-amber-200 flex items-start gap-2.5 mb-4">
                    <Zap className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>⚡ ¡Sube al 100% y recibe el doble de ofertas!</strong> Confirma tus distritos disponibles y horarios de trabajo.
                    </p>
                  </div>
                </div>

                {/* Checklist Rápido con 1 Clic Directo */}
                <div className="pt-2 border-t border-gray-100">
                  <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Completar con 1 clic:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setDniValidado(!dniValidado)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                        dniValidado 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-institutional-blue hover:bg-blue-50'
                      }`}
                    >
                      {dniValidado ? <Check className="w-3.5 h-3.5" /> : '+'} 
                      {dniValidado ? 'DNI Validado' : 'Validar DNI'}
                    </button>

                    <button
                      onClick={() => setDistritosElegidos(!distritosElegidos)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                        distritosElegidos 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-institutional-blue hover:bg-blue-50'
                      }`}
                    >
                      {distritosElegidos ? <Check className="w-3.5 h-3.5" /> : '+'} 
                      {distritosElegidos ? 'Distritos seleccionados' : 'Elegir distritos'}
                    </button>

                    <button
                      onClick={() => setCarnetSanidad(!carnetSanidad)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 ${
                        carnetSanidad 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-institutional-blue hover:bg-blue-50'
                      }`}
                    >
                      {carnetSanidad ? <Check className="w-3.5 h-3.5" /> : '+'} 
                      {carnetSanidad ? 'Carnet de Sanidad Sí' : '¿Tienes Carnet de Sanidad?'}
                    </button>
                  </div>
                </div>
              </div>

              {/* COMPONENTE 4: Radar de Oportunidades Hoy
                  Mobile: order-3 (cuarto elemento visible)
                  Desktop: order-2 (columna 2 de la fila superior)
              */}
              <div className="order-3 lg:order-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 md:p-6 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <TrendingUp className="w-24 h-24 text-institutional-blue" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-gray-800 text-lg">Radar de Oportunidades Hoy</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <p className="text-xs text-gray-500 mb-5">Oportunidades activas en tus zonas de preferencia.</p>
                  
                  <div className="space-y-4">
                    {/* Indicador 1: Vacantes cerca de ti */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-bold text-gray-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-institutional-blue" />
                          Vacantes cerca de ti
                        </span>
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-black text-[11px]">
                          ¡Alta demanda!
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full w-[90%]"></div>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Hay <strong>28 puestos activos hoy</strong> en tus distritos seleccionados.
                      </p>
                    </div>

                    {/* Indicador 2: Velocidad de respuesta */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-bold text-gray-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-institutional-blue" />
                          Velocidad de respuesta
                        </span>
                        <span className="text-institutional-blue bg-blue-100 px-2 py-0.5 rounded-md font-black text-[11px]">
                          Rápida (24h - 48h)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1.5 overflow-hidden">
                        <div className="bg-institutional-blue h-2 rounded-full w-[85%]"></div>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium">
                        Las empresas están agendando entrevistas esta misma semana.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COMPONENTE 3: Explora Trabajos Disponibles
                  Mobile: order-2 (tercer elemento visible)
                  Desktop: order-3 (ocupa ambas columnas abajo)
              */}
              <div className="order-2 lg:order-3 lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-200 p-5 md:p-8">
                <div className="mb-4">
                  <h2 className="text-xl md:text-2xl font-black text-institutional-blue flex items-center gap-2">
                    <FileSearch className="w-6 h-6 text-institutional-green" /> Explora Trabajos Disponibles
                  </h2>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">
                    Busca por puesto o elige una categoría para ver cuánto pagan y qué turnos piden hoy.
                  </p>
                </div>

                {/* BUSCADOR */}
                <div className="relative w-full mb-3">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar puesto (Ej. Cajero, Almacén, Atención al cliente, Call Center...)"
                      className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-2xl outline-none focus:border-institutional-blue focus:ring-2 focus:ring-blue-100 transition-all font-medium text-sm text-gray-800"
                      value={jobSearchTerm}
                      onChange={(e) => {
                        setJobSearchTerm(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                    />
                  </div>

                  {/* Dropdown de Sugerencias */}
                  {showSuggestions && jobSearchTerm.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 max-h-60 overflow-y-auto">
                      {filteredRoles.length > 0 ? (
                        filteredRoles.map((role, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSelectRole(role)}
                            className="w-full text-left px-5 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 font-medium text-sm text-gray-700 flex items-center justify-between"
                          >
                            <span>{role.role}</span>
                            <span className="text-xs text-gray-400">{role.tag}</span>
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-xs text-gray-500">No se encontraron puestos con ese nombre. Prueba uno de los botones abajo.</div>
                      )}
                    </div>
                  )}
                </div>

                {/* CHIPS DE BÚSQUEDA RÁPIDA (Debajo del input) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "🌟 Sin Experiencia",
                    "🛒 Tiendas y Caja",
                    "📦 Almacén y Reparto",
                    "🍔 Restaurantes",
                    "🎧 Call Center",
                    "🕒 Medio Tiempo"
                  ].map(chip => {
                    const isSelected = activeChipFilter === chip;
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipClick(chip)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-institutional-blue text-white border-institutional-blue shadow-xs'
                            : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>

                {/* DETALLE DEL PUESTO SELECCIONADO */}
                {selectedRole && (
                  <div className="bg-institutional-light/60 border border-teal-200/80 rounded-2xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-white text-institutional-blue border border-blue-200 mb-1.5">
                          {selectedRole.tag}
                        </span>
                        <h3 className="text-lg md:text-xl font-black text-gray-800">{selectedRole.role}</h3>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="block text-[11px] font-bold text-gray-400 uppercase">Sueldo Promedio</span>
                        <span className="text-lg font-black text-institutional-green">
                          S/ {selectedRole.salarioMin} - S/ {selectedRole.salarioMax}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      <div className="bg-white p-4 rounded-xl border border-gray-200/70 shadow-xs">
                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-institutional-green" /> Lo que piden las empresas
                        </span>
                        <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1.5 font-medium">
                          {selectedRole.requisitos.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white p-3.5 rounded-xl border border-gray-200/70 shadow-xs">
                          <span className="block text-[11px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-500" /> Horarios y Turnos habituales
                          </span>
                          <p className="text-xs font-semibold text-gray-800">{selectedRole.turnos}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-gray-200/70 shadow-xs">
                          <span className="block text-[11px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-institutional-blue" /> Zonas de mayor contratación
                          </span>
                          <p className="text-xs font-semibold text-gray-800">{selectedRole.ubicacionHabitual}</p>
                        </div>
                      </div>
                    </div>

                    {!showFeedback && (
                      <button 
                        onClick={handleCompareCV}
                        disabled={isComparing}
                        className="w-full bg-institutional-blue hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm flex items-center justify-center gap-2 text-sm"
                      >
                        {isComparing ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Verificando compatibilidad con tu perfil...</>
                        ) : (
                          <><Sparkles className="w-4 h-4 text-emerald-400" /> Comparar con mi perfil</>
                        )}
                      </button>
                    )}

                    {/* Resultado de Comparación con IA */}
                    {showFeedback && (
                      <div className="mt-3 bg-white border border-teal-300 rounded-xl p-4 flex items-start gap-3.5 shadow-xs animate-in fade-in zoom-in-95">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shadow-xs flex-shrink-0 text-emerald-700">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-institutional-blue text-sm mb-0.5">Diagnóstico para este puesto</h4>
                          <p className="text-gray-700 text-xs leading-relaxed">{selectedRole.feedback}</p>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
