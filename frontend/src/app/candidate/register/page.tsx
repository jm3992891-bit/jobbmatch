"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  MapPin,
  Clock,
  Briefcase,
  Award,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Sparkles,
  Zap,
  Info,
} from "lucide-react";
import { DISTRITOS_LIMA, ZONAS_LIMA, RUBROS_LABORA, HABILIDADES_LABORA } from "@/lib/catalogos";
import { LaboraStorage } from "@/lib/storage";
import { calcularCompletitudPerfil } from "@/lib/types";
import LaboraLogo from "@/components/LaboraLogo";

export default function CandidateRegisterPage() {
  const router = useRouter();

  // Paso actual (1 a 7)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  // Paso 1: Consentimientos (RN13)
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

  // Paso 2: Datos básicos
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nivelEducativo, setNivelEducativo] = useState<
    | "Secundaria completa"
    | "Técnico en curso"
    | "Técnico completo"
    | "Universitario en curso"
    | "Universitario completo"
    | "Otro"
  >("Secundaria completa");

  // Paso 3: Ubicación y zonas
  const [distritoId, setDistritoId] = useState("san_miguel");
  const [zonasAceptadas, setZonasAceptadas] = useState<string[]>(["Lima Centro"]);
  const [tiempoMaxTraslado, setTiempoMaxTraslado] = useState<number>(45);

  // Paso 4: Disponibilidad y jornada
  const [fechaDisponible, setFechaDisponible] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tipoJornada, setTipoJornada] = useState<"completa" | "parcial" | "indiferente">("completa");
  const [franjasHorarias, setFranjasHorarias] = useState<("manana" | "tarde" | "noche" | "rotativo")[]>([
    "manana",
    "tarde",
  ]);

  // Paso 5: Rubros y habilidades
  const [rubrosInteres, setRubrosInteres] = useState<string[]>([
    "Logística y Almacén",
    "Ventas y Atención al Cliente",
  ]);
  const [habilidades, setHabilidades] = useState<string[]>([
    "Puntualidad y compromiso",
    "Atención cordial al cliente",
    "Trabajo en equipo y comunicación",
  ]);

  // Paso 6: Experiencia laboral (Opcional)
  const [sinExperiencia, setSinExperiencia] = useState(false);
  const [experienciaMeses, setExperienciaMeses] = useState<number>(6);
  const [rolPrevio, setRolPrevio] = useState("Auxiliar de atención al cliente");

  // Paso 7: CV Opcional (RN10)
  const [cvNombre, setCvNombre] = useState<string | undefined>(undefined);

  // Cálculo en tiempo real del porcentaje de completitud (RN10)
  const completitudActual = useMemo(() => {
    return calcularCompletitudPerfil({
      nombres,
      apellidos,
      distrito_id: distritoId,
      zonas_aceptadas: zonasAceptadas,
      tiempo_max_traslado_min: tiempoMaxTraslado,
      fecha_disponible: fechaDisponible,
      horarios_disponibles: {
        dias: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        franjas: franjasHorarias,
      },
      tipo_jornada: tipoJornada,
      rubros_interes: rubrosInteres,
      habilidades: habilidades,
      sin_experiencia: sinExperiencia,
      experiencia_meses: sinExperiencia ? 0 : experienciaMeses,
      cv_nombre: cvNombre,
    });
  }, [
    nombres,
    apellidos,
    distritoId,
    zonasAceptadas,
    tiempoMaxTraslado,
    fechaDisponible,
    franjasHorarias,
    tipoJornada,
    rubrosInteres,
    habilidades,
    sinExperiencia,
    experienciaMeses,
    cvNombre,
  ]);

  // Validaciones por paso
  const validarPaso = (step: number): boolean => {
    setErrorMsg(null);
    if (step === 1) {
      if (!aceptaTerminos || !aceptaPrivacidad) {
        setErrorMsg("Debes aceptar los Términos y la Política de Tratamiento de Datos (RN13).");
        return false;
      }
    } else if (step === 2) {
      if (!nombres.trim() || !apellidos.trim() || !email.trim() || !telefono.trim()) {
        setErrorMsg("Por favor completa tus nombres, apellidos, correo y teléfono.");
        return false;
      }
      if (!email.includes("@") || email.length < 5) {
        setErrorMsg("Ingresa un correo electrónico válido.");
        return false;
      }
      if (telefono.trim().length < 8) {
        setErrorMsg("Ingresa un número de teléfono o WhatsApp válido.");
        return false;
      }
    } else if (step === 3) {
      if (!distritoId) {
        setErrorMsg("Selecciona tu distrito de residencia.");
        return false;
      }
      if (zonasAceptadas.length === 0) {
        setErrorMsg("Selecciona al menos una zona de Lima donde puedas trabajar.");
        return false;
      }
    } else if (step === 4) {
      if (!fechaDisponible) {
        setErrorMsg("Indica la fecha desde la cual estás disponible.");
        return false;
      }
      if (franjasHorarias.length === 0) {
        setErrorMsg("Selecciona al menos una franja horaria disponible.");
        return false;
      }
    } else if (step === 5) {
      if (rubrosInteres.length === 0) {
        setErrorMsg("Selecciona al menos un rubro de trabajo de tu interés.");
        return false;
      }
      if (habilidades.length === 0) {
        setErrorMsg("Selecciona al menos una habilidad o fortaleza.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validarPaso(currentStep)) {
      if (currentStep < 7) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        handleFinalizarRegistro();
      }
    }
  };

  const handlePrev = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleZona = (zona: string) => {
    if (zonasAceptadas.includes(zona)) {
      if (zonasAceptadas.length > 1) {
        setZonasAceptadas(zonasAceptadas.filter((z) => z !== zona));
      }
    } else {
      setZonasAceptadas([...zonasAceptadas, zona]);
    }
  };

  const toggleFranja = (franja: "manana" | "tarde" | "noche" | "rotativo") => {
    if (franjasHorarias.includes(franja)) {
      if (franjasHorarias.length > 1) {
        setFranjasHorarias(franjasHorarias.filter((f) => f !== franja));
      }
    } else {
      setFranjasHorarias([...franjasHorarias, franja]);
    }
  };

  const toggleRubro = (nombre: string) => {
    if (rubrosInteres.includes(nombre)) {
      if (rubrosInteres.length > 1) {
        setRubrosInteres(rubrosInteres.filter((r) => r !== nombre));
      }
    } else {
      setRubrosInteres([...rubrosInteres, nombre]);
    }
  };

  const toggleHabilidad = (habilidad: string) => {
    if (habilidades.includes(habilidad)) {
      if (habilidades.length > 1) {
        setHabilidades(habilidades.filter((h) => h !== habilidad));
      }
    } else {
      setHabilidades([...habilidades, habilidad]);
    }
  };

  const handleSimularSubidaCV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvNombre(file.name);
    }
  };

  const handleFinalizarRegistro = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        nombres,
        apellidos,
        email,
        telefono,
        distrito_id: distritoId,
        zonas_aceptadas: zonasAceptadas,
        tiempo_max_traslado_min: tiempoMaxTraslado,
        fecha_disponible: fechaDisponible,
        tipo_jornada: tipoJornada,
        franjas_horarias: franjasHorarias,
        rubros_interes: rubrosInteres,
        habilidades: habilidades,
        sin_experiencia: sinExperiencia,
        experiencia_meses: sinExperiencia ? 0 : experienciaMeses,
        nivel_educativo: nivelEducativo,
        cv_nombre: cvNombre,
        consentimiento_terminos: aceptaTerminos,
        consentimiento_privacidad: aceptaPrivacidad,
      };

      // 1. Guardar en almacenamiento estructurado (RN05 y RN13)
      LaboraStorage.registrarCandidatoExpress(payload);

      // 2. Notificar a la API
      await fetch("/api/v1/candidates/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Fallback silencioso si estuviera offline
      });

      // 3. Guardar nombre de sesión para la barra
      if (typeof window !== "undefined") {
        localStorage.setItem("Labora_candidate_name", `${nombres} ${apellidos}`);
      }

      setRegistroExitoso(true);
    } catch {
      setErrorMsg("Ocurrió un error al procesar el registro. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registroExitoso) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg w-full text-center border border-slate-100">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#05B378] mx-auto flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-[#08223A] mb-3">
            ¡Perfil Express Creado!
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Bienvenido a Labora, <span className="font-bold text-[#08223A]">{nombres}</span>.
            Tu perfil ha quedado registrado con un{" "}
            <span className="font-extrabold text-[#05B378]">{completitudActual}% de completitud</span>.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left mb-8 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#05B378] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#08223A] uppercase tracking-wider">
                Nuestra promesa de valor
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Conectamos tu perfil directamente con empresas formales verificadas en Lima.
                Recibirás tus primeras invitaciones a entrevista en un plazo de{" "}
                <span className="font-bold text-[#05B378]">3 a 7 días</span>.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left mb-8 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Privacidad garantizada (RN05): Tu teléfono y correo están protegidos.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Consentimientos versionados registrados en hora Lima (RN13).</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/candidate/dashboard")}
            className="w-full py-4 rounded-xl bg-[#05B378] hover:bg-[#049d68] text-white font-bold text-base shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
          >
            Ir a mi Bandeja de Ofertas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabecera con Logo y Medidor de Completitud */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LaboraLogo variant="dark" size={32} textSize="text-xl" />
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
              Registro Express (&lt; 5 min)
            </span>
          </div>

          {/* Medidor dinámico de completitud (RN10) */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Completitud del perfil
              </p>
              <p className="text-lg font-black text-[#05B378] leading-none">
                {completitudActual}%
              </p>
            </div>
            <div className="w-24 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-[#05B378] transition-all duration-300 rounded-full"
                style={{ width: `${completitudActual}%` }}
              />
            </div>
          </div>
        </div>

        {/* Indicador de Pasos (1 al 7) */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Paso {currentStep} de 7</span>
            <span>
              {currentStep === 1 && "Consentimientos"}
              {currentStep === 2 && "Datos Básicos"}
              {currentStep === 3 && "Ubicación y Zonas"}
              {currentStep === 4 && "Disponibilidad"}
              {currentStep === 5 && "Rubros y Habilidades"}
              {currentStep === 6 && "Experiencia Laboral"}
              {currentStep === 7 && "CV Opcional"}
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 h-2">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div
                key={s}
                className={`h-full rounded-full transition-colors duration-200 ${
                  s < currentStep
                    ? "bg-[#05B378]"
                    : s === currentStep
                    ? "bg-[#08223A]"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Alerta de error si aplica */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Contenedor del Asistente */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10">
          {/* ==========================================
              PASO 1: CONSENTIMIENTOS (RN13)
             ========================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#05B378] rounded-full text-xs font-bold mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Regla de Negocio RN13 y Seguridad
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  Consentimiento y Privacidad
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  En Labora protegemos tus datos personales. Antes de continuar, necesitamos tu autorización informada.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="term-check"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#05B378] cursor-pointer"
                  />
                  <label htmlFor="term-check" className="text-xs sm:text-sm text-slate-700 cursor-pointer">
                    <span className="font-bold text-[#08223A]">
                      Acepto los Términos y Condiciones de Uso (v1.0)
                    </span>
                    <br />
                    Entiendo que las ofertas enviadas por las empresas son invitaciones a entrevista de empleo formal y no constituyen un contrato laboral directo (RN01).
                  </label>
                </div>

                <div className="border-t border-slate-200 pt-3 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="priv-check"
                    checked={aceptaPrivacidad}
                    onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#05B378] cursor-pointer"
                  />
                  <label htmlFor="priv-check" className="text-xs sm:text-sm text-slate-700 cursor-pointer">
                    <span className="font-bold text-[#08223A]">
                      Acepto la Política de Tratamiento de Datos Personales (v1.0)
                    </span>
                    <br />
                    Autorizo a Labora a procesar mis preferencias laborales para calcular mi compatibilidad con vacantes.{" "}
                    <strong className="text-[#08223A]">
                      Mis datos de contacto (teléfono y correo) no serán revelados a ninguna empresa hasta que yo decida aceptar su invitación (RN05).
                    </strong>
                  </label>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-amber-800 text-xs">
                <Info className="w-5 h-5 shrink-0 text-amber-600" />
                <span>
                  Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento desde tu panel de configuración.
                </span>
              </div>
            </div>
          )}

          {/* ==========================================
              PASO 2: DATOS BÁSICOS
             ========================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#08223A] rounded-full text-xs font-bold mb-2">
                  <User className="w-4 h-4" />
                  Paso 2
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  Tus Datos de Contacto
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Ingresa tu información personal. Recuerda que estará protegida en todo momento.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    placeholder="Ej. Juan Carlos"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    placeholder="Ej. Pérez Gómez"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Teléfono celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+51 987 654 321"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nivel Educativo Alcanzado *
                </label>
                <select
                  value={nivelEducativo}
                  onChange={(e) => setNivelEducativo(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium bg-white"
                >
                  <option value="Secundaria completa">Secundaria completa</option>
                  <option value="Técnico en curso">Técnico en curso</option>
                  <option value="Técnico completo">Técnico completo</option>
                  <option value="Universitario en curso">Universitario en curso</option>
                  <option value="Universitario completo">Universitario completo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
          )}

          {/* ==========================================
              PASO 3: UBICACIÓN Y ZONAS
             ========================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#08223A] rounded-full text-xs font-bold mb-2">
                  <MapPin className="w-4 h-4" />
                  Paso 3
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  ¿Dónde vives y dónde puedes trabajar?
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Filtro clave de cercanía (40% del matching). Te conectaremos solo con empleos que respeten tu tiempo de traslado.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Distrito de Residencia (Lima Metropolitana) *
                </label>
                <select
                  value={distritoId}
                  onChange={(e) => setDistritoId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium bg-white"
                >
                  {DISTRITOS_LIMA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre} ({d.zona})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Zonas de Lima donde estás dispuesto(a) a laborar *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {ZONAS_LIMA.map((zona) => {
                    const isSelected = zonasAceptadas.includes(zona);
                    return (
                      <button
                        key={zona}
                        type="button"
                        onClick={() => toggleZona(zona)}
                        className={`p-3 rounded-xl text-xs font-bold border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-50 border-[#05B378] text-[#08223A]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <span>{zona}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#05B378]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Tiempo máximo de viaje en transporte que toleras
                  </label>
                  <span className="text-xs font-extrabold text-[#05B378]">
                    Hasta {tiempoMaxTraslado} minutos
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="5"
                  value={tiempoMaxTraslado}
                  onChange={(e) => setTiempoMaxTraslado(Number(e.target.value))}
                  className="w-full accent-[#05B378] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>20 min (Muy cerca)</span>
                  <span>45 min (Recomendado)</span>
                  <span>90 min</span>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              PASO 4: DISPONIBILIDAD Y HORARIOS
             ========================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#08223A] rounded-full text-xs font-bold mb-2">
                  <Clock className="w-4 h-4" />
                  Paso 4
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  Disponibilidad y Jornada
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Indica desde cuándo puedes empezar y qué tipo de horario prefieres.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ¿A partir de qué fecha puedes comenzar a trabajar? *
                </label>
                <input
                  type="date"
                  value={fechaDisponible}
                  onChange={(e) => setFechaDisponible(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Si estás libre hoy, déjalo con la fecha actual para postulaciones inmediatas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Tipo de Jornada Preferida *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "completa", label: "Tiempo Completo", desc: "48h semanales" },
                    { id: "parcial", label: "Medio Tiempo", desc: "20-24h semanales" },
                    { id: "indiferente", label: "Indiferente", desc: "Cualquiera" },
                  ].map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => setTipoJornada(j.id as any)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        tipoJornada === j.id
                          ? "bg-emerald-50 border-[#05B378] text-[#08223A] shadow-sm font-bold"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold">{j.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{j.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Franjas Horarias Disponibles *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "manana", label: "Mañana", range: "07:00 a 15:00" },
                    { id: "tarde", label: "Tarde", range: "14:00 a 22:00" },
                    { id: "noche", label: "Noche", range: "22:00 a 06:00" },
                    { id: "rotativo", label: "Rotativo", range: "Turnos cambiantes" },
                  ].map((f) => {
                    const isSelected = franjasHorarias.includes(f.id as any);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFranja(f.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-emerald-50 border-[#05B378] text-[#08223A]"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{f.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#05B378]" />}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{f.range}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              PASO 5: RUBROS Y HABILIDADES
             ========================================== */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#08223A] rounded-full text-xs font-bold mb-2">
                  <Briefcase className="w-4 h-4" />
                  Paso 5
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  Rubros de Interés y Habilidades
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Elige los sectores donde te gustaría trabajar y las habilidades que posees.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Rubros de Interés * (Selecciona al menos uno)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {RUBROS_LABORA.map((r) => {
                    const isSelected = rubrosInteres.includes(r.nombre);
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => toggleRubro(r.nombre)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-50 border-[#05B378] text-[#08223A] font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{r.icono}</span>
                          <span className="text-xs font-bold">{r.nombre}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#05B378]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Tus Habilidades y Fortalezas * (Selecciona las que apliquen)
                </label>
                <div className="flex flex-wrap gap-2">
                  {HABILIDADES_LABORA.map((h) => {
                    const isSelected = habilidades.includes(h);
                    return (
                      <button
                        key={h}
                        type="button"
                        onClick={() => toggleHabilidad(h)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? "bg-[#08223A] border-[#08223A] text-white font-bold"
                            : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {h} {isSelected ? "✓" : "+"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              PASO 6: EXPERIENCIA LABORAL (OPCIONAL)
             ========================================== */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#08223A] rounded-full text-xs font-bold mb-2">
                  <Award className="w-4 h-4" />
                  Paso 6 (Opcional)
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  Experiencia Laboral
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  En Labora muchas empresas buscan personas sin experiencia para capacitarlas desde cero.
                </p>
              </div>

              {/* Botón switch: Sin experiencia previa */}
              <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#05B378] text-white flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#08223A]">
                      No tengo experiencia previa
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      ¡Tu talento y ganas son suficientes! Te emparejaremos con vacantes con inducción pagada.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSinExperiencia(!sinExperiencia)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    sinExperiencia
                      ? "bg-[#05B378] text-white shadow-md"
                      : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {sinExperiencia ? "Seleccionado ✓" : "Elegir esta opción"}
                </button>
              </div>

              {!sinExperiencia && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Meses de experiencia acumulada (aproximado)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={experienciaMeses}
                      onChange={(e) => setExperienciaMeses(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Último puesto desempeñado o funciones realizadas
                    </label>
                    <input
                      type="text"
                      value={rolPrevio}
                      onChange={(e) => setRolPrevio(e.target.value)}
                      placeholder="Ej. Operario de almacén, Cajero, Mozo, etc."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#05B378] text-sm font-medium"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              PASO 7: CV OPCIONAL (RN10)
             ========================================== */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#05B378] rounded-full text-xs font-bold mb-2">
                  <FileText className="w-4 h-4" />
                  Paso 7 · Regla RN10
                </div>
                <h3 className="text-2xl font-black text-[#08223A]">
                  Curriculum Vitae (100% Opcional)
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  En Labora el CV <strong className="text-[#08223A]">NO es obligatorio</strong>. Puedes terminar tu registro ya mismo sin subirlo.
                </p>
              </div>

              {/* Banner RN10 */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#05B378] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#08223A]">¿Por qué el CV es opcional?</strong>
                  <br />
                  Con las respuestas que diste en los pasos anteriores, ya hemos construido tu{" "}
                  <strong>Perfil Express</strong>. Subir tu CV en PDF es opcional y añade un{" "}
                  <strong className="text-[#05B378]">+10%</strong> a tu completitud, pero no te limitará a recibir ofertas.
                </div>
              </div>

              {/* Selector de CV */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#05B378] transition-colors">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                {cvNombre ? (
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-[#05B378]">Archivo cargado:</p>
                    <p className="text-xs text-slate-700 font-mono bg-slate-100 py-1.5 px-3 rounded-lg inline-block">
                      {cvNombre}
                    </p>
                    <div>
                      <button
                        type="button"
                        onClick={() => setCvNombre(undefined)}
                        className="text-xs text-red-500 hover:underline font-bold mt-2"
                      >
                        Quitar archivo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="cv-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#08223A] font-bold text-xs rounded-xl transition-all"
                    >
                      <span>Seleccionar archivo PDF o Word</span>
                    </label>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleSimularSubidaCV}
                      className="hidden"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">
                      Máx. 5MB. Si no tienes uno, simplemente presiona el botón verde abajo.
                    </p>
                  </div>
                )}
              </div>

              {/* Resumen final previo */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
                <p className="font-bold text-[#08223A]">Resumen de tu registro:</p>
                <p>• Candidato: <span className="font-semibold text-slate-800">{nombres} {apellidos}</span></p>
                <p>• Distrito: <span className="font-semibold text-slate-800">{DISTRITOS_LIMA.find(d => d.id === distritoId)?.nombre}</span></p>
                <p>• Zonas aceptadas: <span className="font-semibold text-slate-800">{zonasAceptadas.join(", ")}</span></p>
                <p>• Completitud alcanzada: <span className="font-bold text-[#05B378]">{completitudActual}%</span></p>
              </div>
            </div>
          )}

          {/* Botones de Navegación del Asistente */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                disabled={isSubmitting}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Atrás
              </button>
            ) : (
              <Link
                href="/"
                className="text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Cancelar y volver
              </Link>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-7 py-3 rounded-xl bg-[#05B378] hover:bg-[#049d68] text-white font-bold text-sm shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Guardando perfil...</span>
              ) : currentStep === 7 ? (
                <>
                  <span>Finalizar y Activar Perfil</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Continuar</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
