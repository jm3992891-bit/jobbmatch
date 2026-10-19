"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  LayoutList, 
  KanbanSquare, 
  Building2, 
  Users, 
  Clock, 
  ArrowUpRight, 
  MapPin, 
  Briefcase, 
  Share2, 
  Edit2, 
  PauseCircle, 
  Trash2, 
  Zap, 
  Target, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ChevronRight, 
  MessageCircle, 
  Send, 
  X, 
  Sparkles,
  Check
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Plantillas preconfiguradas para publicación masiva en 30 segundos
const QUICK_TEMPLATES = [
  {
    titulo: "Operario de Almacén y Picking",
    sede: "Ate - Planta Santa Clara",
    sueldo: "S/ 1,130 + Horas Extras",
    turno: "Turnos Rotativos",
    experiencia: "Sin Experiencia",
    cuposTotal: 12,
    departamento: "Operaciones",
    modalidad: "Turnos Rotativos"
  },
  {
    titulo: "Atención al Cliente y Caja",
    sede: "San Juan de Lurigancho - Sede Los Jardines",
    sueldo: "S/ 1,025 + Bonos",
    turno: "Turno Tarde (2pm - 10:30pm)",
    experiencia: "Sin Experiencia",
    cuposTotal: 10,
    departamento: "Tiendas y Caja",
    modalidad: "Full-time"
  },
  {
    titulo: "Asesor Telefónico / Call Center",
    sede: "Cercado de Lima - Av. Nicolás Dueñas",
    sueldo: "S/ 1,025 + Comisiones",
    turno: "Part-time (Mañanas)",
    experiencia: "Sin Experiencia",
    cuposTotal: 15,
    departamento: "Call Center",
    modalidad: "Part-time"
  },
  {
    titulo: "Operario de Limpieza y Mantenimiento",
    sede: "San Isidro - Centro Financiero",
    sueldo: "S/ 1,025 + Movilidad S/ 120",
    turno: "Lunes a Sábado (7am - 4pm)",
    experiencia: "Sin Experiencia",
    cuposTotal: 6,
    departamento: "Servicios",
    modalidad: "Full-time"
  }
];

export default function CompanyDashboardPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("Logística Perú S.A.C.");
  const [jobs, setJobs] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activos' | 'inactivos'>('activos');
  const [filtroUrgencia, setFiltroUrgencia] = useState("todos");
  const [filtroSede, setFiltroSede] = useState("todas");
  const [filtroTurno, setFiltroTurno] = useState("todos");

  // Modales
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [citarModalJob, setCitarModalJob] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const savedName = localStorage.getItem("jobmatch_company_name") || "Logística Perú S.A.C.";
    setCompanyName(savedName);

    // Inicializar o cargar procesos con estructura operativa peruana
    const savedJobs = JSON.parse(localStorage.getItem("jobmatch_jobs") || "[]");
    if (savedJobs.length === 0 || !savedJobs[0].cuposTotal) {
      const initialJobs = [
        {
          id: 1,
          titulo: "Operario de Almacén y Picking",
          sede: "Ate - Planta Santa Clara",
          sueldo: "S/ 1,130 + Horas Extras",
          turno: "Turnos Rotativos",
          experiencia: "Sin Experiencia",
          estado: "Activo",
          urgencia: "urgente",
          modalidad: "Turnos Rotativos",
          fecha: "Creado hace 2 días",
          cuposTotal: 10,
          cuposCubiertos: 3,
          matches: 24,
          interesados: 8,
          nuevosInteresados: 3,
          enEntrevista: 4,
          contratados: 3,
          departamento: "Operaciones"
        },
        {
          id: 2,
          titulo: "Atención al Cliente y Cajero Polifuncional",
          sede: "San Juan de Lurigancho - Sede Los Jardines",
          sueldo: "S/ 1,025 + Bonos",
          turno: "Turno Tarde (2pm - 10:30pm)",
          experiencia: "Sin Experiencia",
          estado: "Activo",
          urgencia: "urgente",
          modalidad: "Full-time",
          fecha: "Creado hace 4 días",
          cuposTotal: 8,
          cuposCubiertos: 5,
          matches: 31,
          interesados: 12,
          nuevosInteresados: 5,
          enEntrevista: 6,
          contratados: 5,
          departamento: "Tiendas y Caja"
        },
        {
          id: 3,
          titulo: "Operario de Limpieza y Mantenimiento",
          sede: "San Isidro - Centro Financiero",
          sueldo: "S/ 1,025 + Movilidad S/ 120",
          turno: "Lunes a Sábado (7am - 4pm)",
          experiencia: "Sin Experiencia",
          estado: "Activo",
          urgencia: "completo",
          modalidad: "Full-time",
          fecha: "Creado hace 1 semana",
          cuposTotal: 5,
          cuposCubiertos: 5,
          matches: 18,
          interesados: 7,
          nuevosInteresados: 0,
          enEntrevista: 3,
          contratados: 5,
          departamento: "Servicios"
        }
      ];
      setJobs(initialJobs);
      localStorage.setItem("jobmatch_jobs", JSON.stringify(initialJobs));
    } else {
      setJobs(savedJobs);
    }
  }, []);

  const saveJobs = (newJobs: any[]) => {
    setJobs(newJobs);
    localStorage.setItem("jobmatch_jobs", JSON.stringify(newJobs));
  };

  // KPI Calculations
  const activeJobs = jobs.filter(j => j.estado === 'Activo');
  const totalCupos = activeJobs.reduce((acc, j) => acc + (j.cuposTotal || 0), 0);
  const totalCubiertos = activeJobs.reduce((acc, j) => acc + (j.cuposCubiertos || 0), 0);
  const cuposPorCubrir = Math.max(0, totalCupos - totalCubiertos);
  const totalConfirmadosHoy = activeJobs.reduce((acc, j) => acc + (j.nuevosInteresados || 0), 0) + 10;
  const pctTotalCubiertos = totalCupos > 0 ? Math.round((totalCubiertos / totalCupos) * 100) : 0;

  // Filtrado de Procesos
  const filteredJobs = jobs.filter(job => {
    // Texto
    const matchesSearch = job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (job.sede && job.sede.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Estado
    if (filtroEstado === 'activos' && job.estado !== 'Activo') return false;
    if (filtroEstado === 'inactivos' && job.estado === 'Activo') return false;

    // Urgencia / Cobertura
    if (filtroUrgencia === 'urgentes' && job.cuposCubiertos >= job.cuposTotal) return false;
    if (filtroUrgencia === 'completos' && job.cuposCubiertos < job.cuposTotal) return false;

    // Sede
    if (filtroSede !== 'todas' && !job.sede?.toLowerCase().includes(filtroSede.toLowerCase())) return false;

    // Turno
    if (filtroTurno !== 'todos' && !job.modalidad?.toLowerCase().includes(filtroTurno.toLowerCase())) return false;

    return matchesSearch;
  });

  // Acciones en Proceso
  const handleTogglePause = (id: number) => {
    const updated = jobs.map(j => {
      if (j.id === id) {
        const nuevoEstado = j.estado === 'Activo' ? 'Pausado' : 'Activo';
        return { ...j, estado: nuevoEstado };
      }
      return j;
    });
    saveJobs(updated);
    showToast("Estado del proceso actualizado");
  };

  const handleDeleteJob = (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este proceso de selección?")) {
      const updated = jobs.filter(j => j.id !== id);
      saveJobs(updated);
      showToast("Proceso eliminado");
    }
  };

  const handleDuplicateJob = (jobToDup: any) => {
    const duplicated = {
      ...jobToDup,
      id: Date.now(),
      titulo: `${jobToDup.titulo} (Copia)`,
      fecha: "Creado hoy",
      cuposCubiertos: 0,
      matches: Math.floor(Math.random() * 15) + 10,
      interesados: 0,
      nuevosInteresados: 0,
      enEntrevista: 0,
      contratados: 0,
      estado: "Activo"
    };
    saveJobs([duplicated, ...jobs]);
    setShowTemplateModal(false);
    showToast(`Proceso "${duplicated.titulo}" duplicado.`);
  };

  const handleCreateFromTemplate = (template: typeof QUICK_TEMPLATES[0]) => {
    const newJob = {
      id: Date.now(),
      ...template,
      fecha: "Creado hoy",
      estado: "Activo",
      urgencia: "urgente",
      cuposCubiertos: 0,
      matches: Math.floor(Math.random() * 20) + 12,
      interesados: 0,
      nuevosInteresados: 0,
      enEntrevista: 0,
      contratados: 0
    };
    saveJobs([newJob, ...jobs]);
    setShowTemplateModal(false);
    showToast(`Vacante "${template.titulo}" publicada con éxito.`);
  };

  const handleSendBatchWhatsApp = () => {
    if (!citarModalJob) return;
    showToast(`${citarModalJob.interesados} citaciones enviadas por WhatsApp.`);
    setCitarModalJob(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16">

      {/* TOAST NOTIFICACIÓN MINIMALISTA */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-8">
        
        {/* CABECERA PRINCIPAL Y BOTONES SUPERIORES */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Procesos de Selección</h1>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 font-semibold rounded-md text-xs border border-slate-200">
                  {jobs.length} vacantes
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Gestión operativa y seguimiento de candidatos en tiempo real.
              </p>
            </div>

            {/* BOTONES LIMPIOS B2B */}
            <div className="flex items-center gap-2.5">
              {/* Botón Usar Plantilla Rápida: fondo blanco, borde sutil, solo 1 icono de rayo */}
              <button 
                onClick={() => setShowTemplateModal(true)}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3.5 py-2 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-slate-500" />
                <span>Usar Plantilla Rápida</span>
              </button>

              {/* Botón Crear Proceso: sólido oscuro, un solo icono de más */}
              <button 
                onClick={() => router.push("/company/dashboard/create")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4 text-slate-300" />
                <span>Crear Proceso</span>
              </button>
            </div>
          </div>

          {/* 2. REFINAMIENTO DE LOS 3 KPIS SUPERIORES (ESTILO CLEAN B2B) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* KPI 1: VACANTES ACTIVAS / CUPOS */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Vacantes Activas / Cupos</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold text-slate-900">{activeJobs.length} Activas</span>
                  <span className="text-xs text-slate-500">• {cuposPorCubrir} cupos por cubrir</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {totalCubiertos} de {totalCupos} posiciones cubiertas ({pctTotalCubiertos}%)
                </p>
              </div>
            </div>
            
            {/* KPI 2: CANDIDATOS CONFIRMADOS HOY */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 flex-shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Candidatos Confirmados Hoy</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold text-slate-900">{totalConfirmadosHoy}</span>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> +28% vs ayer
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Aceptaron propuesta para agendar entrevista
                </p>
              </div>
            </div>

            {/* KPI 3: TIEMPO PROMEDIO DE RESPUESTA / ASISTENCIA */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-600 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Tiempo Promedio de Respuesta</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-bold text-slate-900">&lt; 24 horas</span>
                  <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    88% Asistencia
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Velocidad de contacto y agendamiento
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CONTENEDOR PRINCIPAL: FILTROS A LA IZQUIERDA Y LISTADO AL CENTRO */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 4. BARRA LATERAL: FILTROS LIMPIOS (SIN FONDOS DE COLOR) */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                  <Filter className="w-3.5 h-3.5 text-slate-500" /> Filtros
                </h3>
                {(searchTerm || filtroEstado !== 'activos' || filtroUrgencia !== 'todos' || filtroSede !== 'todas' || filtroTurno !== 'todos') && (
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setFiltroEstado("activos");
                      setFiltroUrgencia("todos");
                      setFiltroSede("todas");
                      setFiltroTurno("todos");
                    }}
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:underline"
                  >
                    Limpiar
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {/* Palabra clave */}
                <div>
                  <label className="text-[11px] font-medium text-slate-500 uppercase block mb-1">Buscar Puesto</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Ej. Almacén, Cajero..." 
                      className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-400 text-slate-800 bg-white" 
                    />
                  </div>
                </div>

                {/* Filtro: Urgencia / Cobertura (LIMPIO, SIN FONDOS DE COLOR NI EMOJIS) */}
                <div>
                  <label className="text-[11px] font-medium text-slate-500 uppercase block mb-1">Urgencia / Cobertura</label>
                  <div className="space-y-1 text-xs">
                    <label className="flex items-center gap-2 p-1 text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="urgencia" 
                        checked={filtroUrgencia === 'todos'} 
                        onChange={() => setFiltroUrgencia('todos')}
                        className="text-slate-900 focus:ring-slate-900 border-slate-300"
                      />
                      <span>Todos los niveles</span>
                    </label>
                    <label className="flex items-center gap-2 p-1 text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="urgencia" 
                        checked={filtroUrgencia === 'urgentes'} 
                        onChange={() => setFiltroUrgencia('urgentes')}
                        className="text-slate-900 focus:ring-slate-900 border-slate-300"
                      />
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                        Urgentes / Sin cubrir
                      </span>
                    </label>
                    <label className="flex items-center gap-2 p-1 text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="urgencia" 
                        checked={filtroUrgencia === 'completos'} 
                        onChange={() => setFiltroUrgencia('completos')}
                        className="text-slate-900 focus:ring-slate-900 border-slate-300"
                      />
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        Cupos completos
                      </span>
                    </label>
                  </div>
                </div>

                {/* Filtro: Ubicación por Distrito / Sede */}
                <div>
                  <label className="text-[11px] font-medium text-slate-500 uppercase block mb-1">Distrito / Sede</label>
                  <select 
                    value={filtroSede}
                    onChange={e => setFiltroSede(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-slate-400 bg-white text-slate-700 font-medium"
                  >
                    <option value="todas">Todas las sedes</option>
                    <option value="Ate">Ate - Planta Santa Clara</option>
                    <option value="San Juan de Lurigancho">San Juan de Lurigancho</option>
                    <option value="San Isidro">San Isidro - Financiero</option>
                    <option value="Lurín">Lurín - Almacén Central</option>
                    <option value="Callao">Callao - Puerto</option>
                    <option value="Cercado">Cercado de Lima</option>
                  </select>
                </div>

                {/* Filtro: Turno / Modalidad */}
                <div>
                  <label className="text-[11px] font-medium text-slate-500 uppercase block mb-1">Turno / Horario</label>
                  <select 
                    value={filtroTurno}
                    onChange={e => setFiltroTurno(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-slate-400 bg-white text-slate-700 font-medium"
                  >
                    <option value="todos">Todos los turnos</option>
                    <option value="Rotativo">Turnos Rotativos</option>
                    <option value="Full-time">Full-time (Turno fijo)</option>
                    <option value="Part-time">Part-time (Medio tiempo)</option>
                    <option value="Campaña">Campaña / Fiestas</option>
                  </select>
                </div>

                {/* Estado del proceso */}
                <div>
                  <label className="text-[11px] font-medium text-slate-500 uppercase block mb-1">Estado</label>
                  <div className="space-y-1 text-xs">
                    <label className="flex items-center gap-2 p-1 text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="estado"
                        checked={filtroEstado === 'activos'} 
                        onChange={() => setFiltroEstado('activos')}
                        className="text-slate-900 focus:ring-slate-900 border-slate-300" 
                      /> Solo Activos ({jobs.filter(j=>j.estado==='Activo').length})
                    </label>
                    <label className="flex items-center gap-2 p-1 text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="estado"
                        checked={filtroEstado === 'inactivos'} 
                        onChange={() => setFiltroEstado('inactivos')}
                        className="text-slate-900 focus:ring-slate-900 border-slate-300" 
                      /> Pausados / Cerrados ({jobs.filter(j=>j.estado!=='Activo').length})
                    </label>
                    <label className="flex items-center gap-2 p-1 text-slate-600 cursor-pointer hover:text-slate-900">
                      <input 
                        type="radio" 
                        name="estado"
                        checked={filtroEstado === 'todos'} 
                        onChange={() => setFiltroEstado('todos')}
                        className="text-slate-900 focus:ring-slate-900 border-slate-300" 
                      /> Ver todos
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ÁREA PRINCIPAL: LISTADO DE PROCESOS */}
          <div className="flex-grow">
            
            {/* Toolbar Principal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-medium text-slate-500">
                Mostrando <strong className="text-slate-800">{filteredJobs.length}</strong> procesos
              </span>
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-200/80 rounded-lg p-0.5 border border-slate-200">
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-xs text-slate-800 font-semibold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <LayoutList className="w-3.5 h-3.5" /> Lista
                  </button>
                  <button 
                    onClick={() => setViewMode('kanban')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 ${
                      viewMode === 'kanban' 
                        ? 'bg-white shadow-xs text-slate-800 font-semibold' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <KanbanSquare className="w-3.5 h-3.5" /> Pipeline
                  </button>
                </div>
              </div>
            </div>

            {/* 3. LISTA DE TARJETAS REDISEÑADAS (MENOS CAJAS, MÁS ORDEN B2B) */}
            {viewMode === 'list' && (
              <div className="space-y-3.5">
                {filteredJobs.length === 0 ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <p className="text-slate-500 text-xs">No se encontraron procesos con los filtros aplicados.</p>
                    <button 
                      onClick={() => {
                        setSearchTerm("");
                        setFiltroEstado("todos");
                        setFiltroUrgencia("todos");
                      }}
                      className="mt-2 text-xs font-semibold text-slate-800 underline"
                    >
                      Restablecer filtros
                    </button>
                  </div>
                ) : (
                  filteredJobs.map((job) => {
                    const pctCubiertos = Math.round(((job.cuposCubiertos || 0) / (job.cuposTotal || 1)) * 100);
                    const estaCompleto = job.cuposCubiertos >= job.cuposTotal;

                    return (
                      <div 
                        key={job.id} 
                        className={`bg-white rounded-xl border p-5 shadow-xs hover:border-slate-300 transition-all ${
                          job.estado === 'Pausado' ? 'opacity-65 border-slate-200' : 'border-slate-200/80'
                        }`}
                      >
                        <div className="flex flex-col xl:flex-row justify-between gap-5">
                          
                          {/* Columna Izquierda: Información de la Vacante */}
                          <div className="flex gap-4 flex-grow">
                            
                            {/* Identificador de Depto Sobrio */}
                            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200/70 flex-shrink-0 mt-0.5">
                              {job.departamento ? job.departamento.substring(0, 2).toUpperCase() : 'OP'}
                            </div>

                            <div className="flex-grow">
                              
                              {/* Título y Badges Sutiles */}
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 
                                  onClick={() => router.push(`/company/dashboard/candidates?jobId=${job.id}`)}
                                  className="text-base font-bold text-slate-900 hover:text-slate-700 cursor-pointer transition-colors"
                                >
                                  {job.titulo}
                                </h3>

                                <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${
                                  job.estado === 'Activo' 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' 
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}>
                                  {job.estado}
                                </span>

                                {job.urgencia === 'urgente' && !estaCompleto && (
                                  <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                                    Urgente
                                  </span>
                                )}
                              </div>
                              
                              {/* Metadatos del puesto: Sueldo sin icono de dólar y sin verde chillón */}
                              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mb-3.5">
                                <span className="font-medium text-slate-700 flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                  {job.sede || 'Lima Metropolitana'}
                                </span>
                                <span>•</span>
                                <span className="font-semibold text-slate-700">
                                  {job.sueldo || 'S/ 1,130 + Beneficios'}
                                </span>
                                <span>•</span>
                                <span className="text-slate-500">
                                  {job.turno || 'Turnos Rotativos'}
                                </span>
                                <span>•</span>
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                                  {job.experiencia || 'Sin Experiencia'}
                                </span>
                              </div>

                              {/* SECCIÓN COBERTURA DE CUPOS (DIRECTA SOBRE EL FONDO BLANCO, SIN RECUADRO GRIS) */}
                              <div className="max-w-xl mb-4">
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                  <span className="text-slate-700 font-medium">
                                    Progreso de cobertura: {job.cuposCubiertos} de {job.cuposTotal} vacantes ({pctCubiertos}%)
                                  </span>
                                  <span className="text-slate-400">
                                    {estaCompleto ? 'Cupos cubiertos' : `Faltan ${job.cuposTotal - job.cuposCubiertos} por contratar`}
                                  </span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div 
                                    className="h-1.5 rounded-full bg-slate-900 transition-all duration-500"
                                    style={{ width: `${pctCubiertos}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* LAS 4 CAJAS DEL EMBUDO (FONDO NEUTRO, DESTACANDO SOLO "INTERESADOS") */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
                                
                                {/* 1. Matches */}
                                <Link href={`/company/dashboard/candidates?jobId=${job.id}`}>
                                  <div className="bg-slate-50/60 border border-slate-200/80 hover:border-slate-300 p-2.5 rounded-lg text-center transition-colors cursor-pointer">
                                    <span className="text-base font-bold text-slate-900 block">{job.matches}</span>
                                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">Matches</span>
                                    <span className="text-[9px] text-slate-400 block mt-0.5">Algoritmo</span>
                                  </div>
                                </Link>

                                {/* 2. Interesados (SOLO ESTA CAJA TIENE DESTACADO SUTIL CON NOTIFICACIÓN) */}
                                <Link href={`/company/dashboard/candidates?jobId=${job.id}`}>
                                  <div className="bg-white border border-slate-300 hover:border-slate-400 p-2.5 rounded-lg text-center transition-colors cursor-pointer relative shadow-xs">
                                    {job.nuevosInteresados > 0 && (
                                      <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                                        {job.nuevosInteresados}
                                      </span>
                                    )}
                                    <span className="text-base font-bold text-slate-900 block">{job.interesados}</span>
                                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mt-0.5">Interesados</span>
                                    <span className="text-[9px] text-emerald-700 font-medium block mt-0.5">Aceptaron</span>
                                  </div>
                                </Link>

                                {/* 3. En Entrevista */}
                                <div className="bg-slate-50/60 border border-slate-200/80 p-2.5 rounded-lg text-center">
                                  <span className="text-base font-bold text-slate-900 block">{job.enEntrevista}</span>
                                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">Entrevista</span>
                                  <span className="text-[9px] text-slate-400 block mt-0.5">Citados</span>
                                </div>

                                {/* 4. Contratados */}
                                <div className="bg-slate-50/60 border border-slate-200/80 p-2.5 rounded-lg text-center">
                                  <span className="text-base font-bold text-slate-900 block">{job.contratados}</span>
                                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">Contratados</span>
                                  <span className="text-[9px] text-slate-400 block mt-0.5">Validados</span>
                                </div>

                              </div>

                            </div>
                          </div>

                          {/* Columna Derecha: Acciones Rápidas Superiores y Botones de Acción */}
                          <div className="flex flex-col justify-between items-start xl:items-end gap-4 pt-3 xl:pt-0 border-t xl:border-t-0 border-slate-100">
                            
                            {/* ACCIONES RÁPIDAS ALINEADAS EN LA ESQUINA SUPERIOR DERECHA */}
                            <div className="flex items-center gap-1 self-end">
                              <button 
                                onClick={() => handleDuplicateJob(job)}
                                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                title="Duplicar proceso"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleTogglePause(job.id)}
                                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                title={job.estado === 'Activo' ? 'Pausar proceso' : 'Reactivar proceso'}
                              >
                                <PauseCircle className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteJob(job.id)}
                                className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Eliminar proceso"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* BOTONES DE ACCIÓN: BOTÓN PRIMARIO SÓLIDO + BOTÓN SECUNDARIO WHATSAPP LIMPIO */}
                            <div className="flex flex-col sm:flex-row xl:flex-col gap-2 w-full xl:w-auto">
                              {/* 1. Botón Principal: Ver Candidatos */}
                              <Link 
                                href={`/company/dashboard/candidates?jobId=${job.id}`}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                              >
                                <span>Ver Candidatos ({job.interesados})</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>

                              {/* 2. Botón Secundario: Citar por WhatsApp (Fondo blanco, borde sutil, icono verde) */}
                              {job.interesados > 0 && (
                                <button
                                  onClick={() => setCitarModalJob(job)}
                                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-3.5 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Citar por WhatsApp</span>
                                </button>
                              )}
                            </div>

                          </div>

                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* CONTENIDO: PIPELINE KANBAN (SOBRIO) */}
            {viewMode === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 overflow-x-auto pb-4">
                
                {/* 1. Matches */}
                <div className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200/60">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">Matches Algoritmo</h3>
                    <span className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded">
                      {filteredJobs.reduce((acc, j) => acc + j.matches, 0)}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/80">
                        <span className="text-[10px] text-slate-400 block">{job.sede}</span>
                        <h4 className="font-semibold text-xs text-slate-900 leading-snug mt-0.5 mb-2">{job.titulo}</h4>
                        <span className="text-xs font-bold text-slate-800">{job.matches} afines</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Interesados */}
                <div className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200/60">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-slate-800 uppercase text-[11px] tracking-wider">Interesados</h3>
                    <span className="text-xs font-semibold bg-emerald-600 text-white px-1.5 py-0.2 rounded">
                      {filteredJobs.reduce((acc, j) => acc + j.interesados, 0)}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/80">
                        <span className="text-[10px] text-emerald-700 font-medium block">Aceptaron propuesta</span>
                        <h4 className="font-semibold text-xs text-slate-900 leading-snug mt-0.5 mb-2">{job.titulo}</h4>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800">{job.interesados} esperando</span>
                          <button 
                            onClick={() => setCitarModalJob(job)}
                            className="text-[11px] text-slate-700 hover:text-slate-900 font-medium underline"
                          >
                            Citar WhatsApp
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. En Entrevista */}
                <div className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200/60">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">En Entrevista</h3>
                    <span className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded">
                      {filteredJobs.reduce((acc, j) => acc + j.enEntrevista, 0)}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/80">
                        <h4 className="font-semibold text-xs text-slate-900 leading-snug mb-1">{job.titulo}</h4>
                        <span className="text-xs text-slate-600">{job.enEntrevista} citados</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Contratados */}
                <div className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200/60">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-slate-700 uppercase text-[11px] tracking-wider">Contratados</h3>
                    <span className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-1.5 py-0.2 rounded">
                      {filteredJobs.reduce((acc, j) => acc + j.contratados, 0)}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {filteredJobs.map(job => (
                      <div key={job.id} className="bg-white p-3 rounded-lg shadow-xs border border-slate-200/80">
                        <h4 className="font-semibold text-xs text-slate-900 leading-snug mb-1">{job.titulo}</h4>
                        <span className="text-xs font-medium text-emerald-700 block">{job.contratados} validados</span>
                        <span className="text-[10px] text-slate-400">Cupos: {job.cuposCubiertos}/{job.cuposTotal}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* MODAL: PLANTILLAS RÁPIDAS (DISEÑO CLEAN SAAS) */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 border border-slate-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Plantillas Rápidas</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publica puestos operativos frecuentes en menos de 30 segundos.
                </p>
              </div>
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 max-h-[65vh] overflow-y-auto space-y-2.5">
              {QUICK_TEMPLATES.map((tmpl, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50/70 hover:bg-slate-100/70 border border-slate-200 p-3.5 rounded-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">
                      {tmpl.departamento} • {tmpl.cuposTotal} cupos
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-0.5">{tmpl.titulo}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {tmpl.sede} • {tmpl.sueldo} • {tmpl.turno}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCreateFromTemplate(tmpl)}
                    className="w-full sm:w-auto px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors whitespace-nowrap"
                  >
                    Publicar
                  </button>
                </div>
              ))}

              {/* Opción: Duplicar último proceso */}
              {jobs.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleDuplicateJob(jobs[0])}
                    className="w-full p-3 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 text-left font-medium text-xs text-slate-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Duplicar último proceso abierto: "{jobs[0].titulo}"</span>
                    </div>
                    <span className="text-slate-900 font-semibold text-xs">Duplicar &gt;</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button 
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CITAR POR WHATSAPP (DISEÑO CLEAN SAAS) */}
      {citarModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-slate-900">Citar por WhatsApp</h3>
                <p className="text-xs text-slate-500 mt-0.5">{citarModalJob.titulo} • {citarModalJob.interesados} candidatos</p>
              </div>
              <button 
                onClick={() => setCitarModalJob(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <span className="font-semibold text-slate-500 text-[10px] uppercase block">
                  Vista previa del mensaje:
                </span>
                <p className="italic bg-white p-3 rounded-lg border border-slate-200 text-slate-600 leading-relaxed text-xs">
                  "Hola, somos de {companyName}. Vimos que aceptaste la propuesta para {citarModalJob.titulo} en nuestra sede de {citarModalJob.sede}. Queremos agendar tu entrevista presencial para mañana a las 10:00 am. Responde este mensaje para confirmar tu asistencia."
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                <span>
                  Los candidatos que confirmen pasarán a la columna <strong>En Entrevista</strong>.
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
              <button
                onClick={() => setCitarModalJob(null)}
                className="px-3.5 py-2 rounded-lg font-medium text-xs text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendBatchWhatsApp}
                className="px-4 py-2 rounded-lg font-medium text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar {citarModalJob.interesados} Citaciones</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
