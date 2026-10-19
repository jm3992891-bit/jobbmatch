"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, FileCheck, CheckCircle2, Send, X, Phone, Mail, MessageCircle, FileText } from "lucide-react";
import Link from "next/link";

interface Candidate {
  id: number;
  name: string;
  role: string;
  skills: string[];
  location: string;
  verified: boolean;
  match: number;
  email: string;
  phone: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, name: "Juan Pérez", role: "Desarrollador Frontend", skills: ["react", "javascript", "tailwind"], location: "Lima", verified: true, match: 95, email: "juan.perez@email.com", phone: "+51 987 654 321" },
  { id: 2, name: "María Gómez", role: "Analista de Datos", skills: ["sql", "python", "excel"], location: "Arequipa", verified: true, match: 88, email: "maria.gomez@email.com", phone: "+51 987 654 322" },
  { id: 3, name: "Carlos Ruiz", role: "Diseñador UI/UX", skills: ["figma", "adobe xd", "css"], location: "Lima", verified: false, match: 70, email: "carlos.ruiz@email.com", phone: "+51 987 654 323" },
  { id: 4, name: "Ana Torres", role: "Desarrollador Backend", skills: ["node.js", "python", "sql"], location: "Trujillo", verified: true, match: 92, email: "ana.torres@email.com", phone: "+51 987 654 324" },
  { id: 5, name: "Luis Vargas", role: "Desarrollador Fullstack", skills: ["react", "node.js", "javascript"], location: "Lima", verified: true, match: 85, email: "luis.vargas@email.com", phone: "+51 987 654 325" },
  { id: 6, name: "Sofía Castro", role: "Anfitriona", skills: ["atención al cliente", "inglés avanzado", "comunicación"], location: "Lima", verified: true, match: 98, email: "sofia.castro@email.com", phone: "+51 912 345 678" },
  { id: 7, name: "Pedro Silva", role: "Analista de Operaciones", skills: ["operaciones", "análisis", "excel avanzado"], location: "Lima", verified: true, match: 91, email: "pedro.silva@email.com", phone: "+51 999 888 777" },
];

export default function CandidatesPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  
  const [job, setJob] = useState<any>(null);
  
  // Tabs state
  const [activeTab, setActiveTab] = useState<'aptos' | 'interesados'>('aptos');
  
  // Lists
  const [aptos, setAptos] = useState<Candidate[]>([]);
  const [interesados, setInteresados] = useState<Candidate[]>([]);
  
  // Selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (jobId) {
      const savedJobs = JSON.parse(localStorage.getItem("jobmatch_jobs") || "[]");
      const currentJob = savedJobs.find((j: any) => j.id.toString() === jobId);
      
      if (currentJob) {
        setJob(currentJob);
        
        const queryTitulo = currentJob.titulo.toLowerCase();
        let filtered = MOCK_CANDIDATES.filter(c => 
          c.role.toLowerCase().includes(queryTitulo) ||
          c.skills.some(skill => queryTitulo.includes(skill.toLowerCase())) ||
          (currentJob.habilidades && currentJob.habilidades.some((h: string) => c.skills.includes(h.toLowerCase())))
        );
        
        if (filtered.length === 0) {
            filtered = [MOCK_CANDIDATES[0], MOCK_CANDIDATES[4]];
        }
        
        // Simulamos que al cargar, todos están en aptos
        setAptos(filtered.sort((a, b) => b.match - a.match));
      }
    }
  }, [jobId]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(aptos.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleConfirmOffers = () => {
    // Move selected from 'aptos' to 'interesados' (Simulating they instantly accepted for demo purposes)
    const candidatesToMove = aptos.filter(c => selectedIds.includes(c.id));
    const remainingAptos = aptos.filter(c => !selectedIds.includes(c.id));
    
    setInteresados([...interesados, ...candidatesToMove]);
    setAptos(remainingAptos);
    setSelectedIds([]);
    setShowModal(false);
    
    // Switch tab to see them
    setActiveTab('interesados');
  };

  if (!job) return <div className="p-12 text-center">Cargando...</div>;

  const isAllSelected = aptos.length > 0 && selectedIds.length === aptos.length;

  return (
    <div className="min-h-screen bg-institutional-light font-sans">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <Link href="/company/dashboard" className="text-gray-500 hover:text-institutional-blue flex items-center gap-2 mb-6 w-fit">
          <ArrowLeft className="w-4 h-4" /> Volver a Mis Procesos
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Candidatos del Proceso
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Vacante: <strong className="text-institutional-blue">{job.titulo}</strong>
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('aptos')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${activeTab === 'aptos' ? 'border-institutional-blue text-institutional-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Candidatos Aptos ({aptos.length})
          </button>
          <button
            onClick={() => setActiveTab('interesados')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'interesados' ? 'border-institutional-green text-institutional-green' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            Candidatos Interesados 
            <span className={`px-2 py-0.5 rounded-full text-xs text-white ${activeTab === 'interesados' ? 'bg-institutional-green' : 'bg-gray-400'}`}>
              {interesados.length}
            </span>
          </button>
        </div>

        {/* CONTENIDO: APTOS */}
        {activeTab === 'aptos' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Selecciona candidatos para enviarles una oferta
              </h3>
              <button 
                onClick={() => setShowModal(true)}
                disabled={selectedIds.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white transition-colors shadow-sm ${selectedIds.length > 0 ? 'bg-institutional-green hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                <Send className="w-4 h-4" />
                Enviar Oferta ({selectedIds.length})
              </button>
            </div>

            {aptos.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                No hay más candidatos aptos por revisar en esta lista.
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-institutional-light border-b border-gray-200 px-6 py-3 flex items-center gap-4 text-sm font-semibold text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-institutional-blue focus:ring-institutional-blue cursor-pointer" 
                  />
                  <div className="w-[30%]">Candidato</div>
                  <div className="w-[15%]">Match</div>
                  <div className="w-[20%]">Ubicación y Estado</div>
                  <div className="flex-1">Habilidades</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {aptos.map((candidate) => (
                    <div key={candidate.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-blue-50 transition-colors ${selectedIds.includes(candidate.id) ? 'bg-blue-50/50' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(candidate.id)}
                        onChange={() => handleSelect(candidate.id)}
                        className="w-4 h-4 rounded border-gray-300 text-institutional-blue focus:ring-institutional-blue cursor-pointer" 
                      />
                      <div className="w-[30%] pr-4">
                        <h4 className="font-bold text-gray-800">{candidate.name}</h4>
                        <p className="text-institutional-blue font-medium text-xs flex items-center gap-1 mt-1">
                          <Briefcase className="w-3 h-3" /> {candidate.role}
                        </p>
                      </div>
                      <div className="w-[15%]">
                        <div className="inline-flex bg-green-50 text-institutional-green font-bold text-sm px-2 py-1 rounded-md border border-green-200">
                          {candidate.match}%
                        </div>
                      </div>
                      <div className="w-[20%] flex flex-col gap-1.5 text-xs">
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-3 h-3 text-gray-400" /> {candidate.location}
                        </span>
                        {candidate.verified ? (
                          <span className="flex items-center gap-1 text-institutional-green font-medium">
                            <CheckCircle2 className="w-3 h-3" /> Certiadulto OK
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-500">
                            <FileCheck className="w-3 h-3" /> No verificado
                          </span>
                        )}
                      </div>
                      <div className="flex-1 flex justify-between items-center gap-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill: string) => (
                            <span key={skill} className="px-2 py-0.5 bg-white text-gray-600 border border-gray-200 text-[11px] rounded-md">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="px-2 py-0.5 text-gray-400 text-[11px]">+{candidate.skills.length - 3}</span>
                          )}
                        </div>
                        <button className="text-sm font-semibold text-institutional-blue hover:underline whitespace-nowrap">
                          Ver Perfil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO: INTERESADOS */}
        {activeTab === 'interesados' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Candidatos que aceptaron tu oferta
              </h3>
              <p className="text-sm text-gray-500">Sus datos de contacto están desbloqueados.</p>
            </div>

            {interesados.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                Aún no tienes candidatos interesados para esta vacante.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {interesados.map((candidate) => (
                  <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 relative">
                    <div className="absolute top-4 right-4 bg-green-50 text-institutional-green px-2 py-1 rounded text-xs font-bold border border-green-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Aceptó la oferta
                    </div>

                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 text-institutional-blue rounded-full flex items-center justify-center text-xl font-bold">
                        {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{candidate.name}</h3>
                      <p className="text-sm text-institutional-blue font-medium mb-4">{candidate.role}</p>

                      <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" /> 
                          <span className="font-medium">{candidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                          <Mail className="w-4 h-4 text-gray-400" /> 
                          <a href={`mailto:${candidate.email}`} className="text-institutional-blue hover:underline font-medium">{candidate.email}</a>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-institutional-blue text-institutional-blue px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                          <FileText className="w-4 h-4" /> Ver CV
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal Oferta Enviada */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 bg-green-100 text-institutional-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              ¡Ofertas Enviadas!
            </h2>
            
            <p className="text-center text-gray-600 mb-6">
              Se ha enviado la propuesta laboral a <strong>{selectedIds.length} {selectedIds.length === 1 ? 'candidato' : 'candidatos'}</strong>.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-blue-800">
              <p>🔔 <strong>Notificación PUSH y Correo Electrónico</strong> enviado con éxito.</p>
              <p className="mt-2">El candidato deberá seleccionar <strong>"Aceptar"</strong> para que puedas ver sus datos de contacto completos.</p>
            </div>

            <button
              onClick={handleConfirmOffers}
              className="w-full bg-institutional-blue text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors"
            >
              Entendido (Simular Aceptación)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
