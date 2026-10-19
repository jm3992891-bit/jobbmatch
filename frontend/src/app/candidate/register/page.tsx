"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Upload, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const SKILLS_CATALOG = [
  "Python", "JavaScript", "React", "Node.js", "Java", "C#", "SQL", "Excel", 
  "Figma", "Atención al Cliente", "Ventas", "Inglés", "Diseño UX/UI", 
  "AWS", "Docker", "Gestión de Proyectos", "Scrum", "Marketing Digital",
  "Logística", "Call center", "Retail"
];

export default function CandidateRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = Elección de modo
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [creationMode, setCreationMode] = useState<'upload' | 'manual' | null>(null);
  
  // Base Data
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [experiencia, setExperiencia] = useState("");

  // Experience Tags
  const [selectedExpTags, setSelectedExpTags] = useState<string[]>([]);
  
  const COMMON_EXP_TAGS = [
    "Atención al cliente", "Ventas", "Cajero", "Operario de limpieza", 
    "Almacenero", "Call center", "Reponedor", "Atención en salón/Mozo", 
    "Seguridad", "Administrativo", "Logística"
  ];

  const toggleExpTag = (tag: string) => {
    if (selectedExpTags.includes(tag)) {
      setSelectedExpTags(selectedExpTags.filter(t => t !== tag));
    } else {
      setSelectedExpTags([...selectedExpTags, tag]);
    }
  };

  // Competencies
  const [skillInput, setSkillInput] = useState("");
  const [skillLevel, setSkillLevel] = useState("Intermedio");
  const [selectedSkills, setSelectedSkills] = useState<{name: string, level: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleParseCV();
    }
  };

  const filteredSkills = SKILLS_CATALOG.filter(s => 
    s.toLowerCase().includes(skillInput.toLowerCase()) && 
    !selectedSkills.some(sel => sel.name === s)
  );

  const handleParseCV = () => {
    setIsParsing(true);
    setCreationMode('upload');
    // Simulando lectura de PDF
    setTimeout(() => {
      setNombres("Juan Carlos");
      setApellidos("Pérez Gómez");
      setCorreo("juan.perez@email.com");
      setTelefono("+51 987654321");
      setUbicacion("Lima, Perú");
      
      setSelectedExpTags(["Ventas", "Atención al cliente", "Almacenero"]);
      
      setSelectedSkills([
        { name: "Ventas", level: "Avanzado" },
        { name: "Atención al Cliente", level: "Avanzado" },
        { name: "Logística", level: "Intermedio" }
      ]);
      
      setIsParsing(false);
      setStep(1); // Mover al primer paso para revisión
    }, 2500);
  };

  const addSkill = (name: string) => {
    if (name && !selectedSkills.some(s => s.name === name)) {
      setSelectedSkills([...selectedSkills, { name, level: skillLevel }]);
      setSkillInput("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (name: string) => {
    setSelectedSkills(selectedSkills.filter(s => s.name !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem("jobmatch_candidate_email", correo);
      localStorage.setItem("jobmatch_candidate_pwd", password);
      localStorage.setItem("jobmatch_candidate_name", `${nombres} ${apellidos}`);
      router.push("/candidate/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-institutional-light pt-24 pb-12 px-4 font-sans flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl border border-white overflow-hidden">
        
        {/* PANTALLA DE ELECCIÓN INICIAL (STEP 0) */}
        {step === 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-500 p-10 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-institutional-blue mb-4">Crea tu Perfil Profesional</h2>
              <p className="text-gray-600 text-lg">Elige cómo deseas registrarte en Labora para conectarte con las mejores empresas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              
              {/* Opción 1: Cargar CV */}
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing}
                className="relative bg-white border-2 border-institutional-blue rounded-3xl p-10 flex flex-col items-center text-center hover:bg-slate-50 transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute top-0 right-0 bg-institutional-green text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl flex items-center gap-1 shadow-lg shadow-teal-500/20">
                  <Sparkles className="w-4 h-4" /> Recomendado
                </div>
                <div className="w-20 h-20 bg-institutional-light text-institutional-green rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {isParsing ? <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-institutional-green"></div> : <Upload className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-bold text-institutional-blue mb-3">Cargar CV Automático</h3>
                <p className="text-gray-600">
                  {isParsing ? 'Analizando documento con Inteligencia Artificial...' : 'Sube tu currículum y autocompletaremos tu experiencia y datos en segundos.'}
                </p>
              </button>

              {/* Opción 2: Manual */}
              <button 
                onClick={() => { setCreationMode('manual'); setStep(1); }}
                className="bg-white border-2 border-gray-200 rounded-3xl p-10 flex flex-col items-center text-center hover:border-gray-300 hover:bg-gray-50 transition-colors group"
              >
                <div className="w-20 h-20 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UserCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Hacer CV Manualmente</h3>
                <p className="text-gray-600">
                  Llena el formulario paso a paso. Ideal si aún no tienes un documento armado. Toma apenas 5 minutos.
                </p>
              </button>

            </div>

            <div className="text-center mt-12">
              <Link href="/candidate/login" className="text-gray-500 hover:text-institutional-blue font-semibold hover:underline">
                ¿Ya tienes cuenta? Inicia sesión aquí
              </Link>
            </div>
          </div>
        )}

        {/* CONTENIDO DEL FORMULARIO (STEP > 0) */}
        {step > 0 && (
          <div className="p-8 md:p-12">
            {/* Progress Bar */}
            <div className="mb-10 max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-sm font-bold ${step >= 1 ? 'text-institutional-blue' : 'text-gray-400'}`}>1. Datos Base</span>
                <span className={`text-sm font-bold ${step >= 2 ? 'text-institutional-blue' : 'text-gray-400'}`}>2. Experiencia</span>
                <span className={`text-sm font-bold ${step >= 3 ? 'text-institutional-blue' : 'text-gray-400'}`}>3. Competencias</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full flex overflow-hidden">
                <div className={`h-full bg-institutional-green transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              {creationMode === 'upload' && step === 1 && (
                <div className="mb-8 bg-teal-50 border border-teal-200 rounded-2xl p-5 flex items-center gap-4 text-teal-800">
                  <CheckCircle2 className="w-8 h-8 text-institutional-green flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">¡CV procesado con éxito!</h4>
                    <p className="text-sm">Por favor, verifica que los datos extraídos sean correctos y complétalos si es necesario.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* STEP 1: DATOS BASE */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-3xl font-black text-institutional-blue mb-8">Datos Base y Contacto</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Nombres *</label>
                        <input type="text" value={nombres} onChange={e=>setNombres(e.target.value)} required className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-gray-50 focus:bg-white transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Apellidos *</label>
                        <input type="text" value={apellidos} onChange={e=>setApellidos(e.target.value)} required className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-gray-50 focus:bg-white transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Correo Electrónico *</label>
                        <input type="email" value={correo} onChange={e=>setCorreo(e.target.value)} required className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-gray-50 focus:bg-white transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Contraseña *</label>
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-gray-50 focus:bg-white transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Ubicación (Distrito/Ciudad) *</label>
                        <input type="text" value={ubicacion} onChange={e=>setUbicacion(e.target.value)} required placeholder="Ej. Lima, Perú" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-gray-50 focus:bg-white transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">Teléfono Celular *</label>
                        <input type="tel" value={telefono} onChange={e=>setTelefono(e.target.value)} required placeholder="+51 999 999 999" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-gray-50 focus:bg-white transition-colors" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: EXPERIENCIA (Tags) */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-3xl font-black text-institutional-blue mb-2">Tu Experiencia Laboral</h2>
                    <p className="text-gray-600 text-lg mb-8">
                      {creationMode === 'upload' 
                        ? 'Hemos detectado esta experiencia en tu CV. Confírmala o ajusta las etiquetas según corresponda.' 
                        : 'Selecciona las áreas en las que tienes experiencia previa.'}
                    </p>
                    
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                      <div className="flex flex-wrap gap-3">
                        {COMMON_EXP_TAGS.map(tag => {
                          const isSelected = selectedExpTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleExpTag(tag)}
                              className={`px-5 py-3 rounded-full font-bold text-sm transition-all border-2 ${
                                isSelected 
                                  ? 'bg-institutional-green text-white border-institutional-green shadow-md shadow-teal-500/20' 
                                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 text-institutional-green border-gray-300 rounded focus:ring-institutional-green"
                            checked={selectedExpTags.length === 0}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedExpTags([]);
                            }}
                          />
                          <span className="font-bold text-gray-600">No tengo experiencia previa (Busco mi primer empleo)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: COMPETENCIAS */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    
                    {/* Competencias */}
                    <div>
                      <h2 className="text-2xl font-black text-institutional-blue mb-2">Competencias</h2>
                      <p className="text-gray-600 mb-6">Añade habilidades clave para que las empresas te encuentren más rápido.</p>
                      
                      <div className="bg-institutional-light rounded-2xl p-6 border border-teal-100">
                        <div className="flex flex-col md:flex-row gap-4 mb-2">
                          <div className="flex-1 relative">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Habilidad (Buscar)</label>
                            <input 
                              type="text" 
                              value={skillInput}
                              onChange={(e) => {
                                setSkillInput(e.target.value);
                                setShowSuggestions(true);
                              }}
                              onFocus={() => setShowSuggestions(true)}
                              placeholder="Ej. Ventas, Call center..."
                              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-white"
                            />
                            
                            {/* Autocomplete */}
                            {showSuggestions && skillInput && filteredSkills.length > 0 && (
                              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                {filteredSkills.map(skill => (
                                  <div 
                                    key={skill} 
                                    onClick={() => { setSkillInput(skill); setShowSuggestions(false); }}
                                    className="px-5 py-3 hover:bg-institutional-light cursor-pointer text-gray-800 font-medium"
                                  >
                                    {skill}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="w-full md:w-48">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nivel</label>
                            <select 
                              value={skillLevel} 
                              onChange={e=>setSkillLevel(e.target.value)}
                              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-institutional-green outline-none bg-white font-medium text-gray-700"
                            >
                              <option>Básico</option>
                              <option>Intermedio</option>
                              <option>Avanzado</option>
                            </select>
                          </div>
                          
                          <div className="flex items-end">
                            <button 
                              type="button"
                              onClick={() => addSkill(skillInput)}
                              disabled={!skillInput}
                              className="w-full md:w-auto h-[52px] px-8 bg-institutional-blue text-white rounded-xl font-bold hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
                            >
                              Añadir
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Lista de Habilidades */}
                      <div className="mt-6">
                        {selectedSkills.length === 0 ? (
                          <div className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">Aún no has añadido habilidades.</div>
                        ) : (
                          <div className="flex flex-wrap gap-3">
                            {selectedSkills.map(s => (
                              <div key={s.name} className="flex items-center gap-2 bg-white border-2 border-institutional-blue px-4 py-2 rounded-xl">
                                <span className="font-bold text-institutional-blue">{s.name}</span>
                                <span className="text-xs text-institutional-green bg-teal-50 px-2 py-1 rounded-md font-bold">{s.level}</span>
                                <button type="button" onClick={() => removeSkill(s.name)} className="text-gray-400 hover:text-red-500 ml-2 transition-colors">✕</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-8 border-t border-gray-100 flex justify-between items-center mt-10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2 px-6 py-4 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" /> Atrás
                    </button>
                  ) : <div></div>}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || (step === 3 && selectedSkills.length === 0)}
                    className="flex items-center gap-2 bg-institutional-green text-white px-10 py-4 rounded-xl font-bold hover:bg-[#009672] transition-colors shadow-lg shadow-teal-500/30 disabled:opacity-50 text-lg"
                  >
                    {step < 3 ? (
                      <>Siguiente <ChevronRight className="w-5 h-5" /></>
                    ) : (
                      isSubmitting ? 'Registrando...' : 'Finalizar y ver ofertas'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
