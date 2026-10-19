"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProcessPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [listaHabilidades, setListaHabilidades] = useState<string[]>([]);
  const [distrito, setDistrito] = useState("");

  const handleAddHabilidad = () => {
    if (habilidades.trim() && !listaHabilidades.includes(habilidades.trim())) {
      setListaHabilidades([...listaHabilidades, habilidades.trim()]);
      setHabilidades("");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob = {
      id: Date.now(),
      titulo,
      distrito: distrito || "Lima",
      habilidades: listaHabilidades,
      fecha: new Date().toLocaleDateString("es-ES", { day: 'numeric', month: 'short', year: 'numeric' }),
      referencia: Math.floor(100000 + Math.random() * 900000).toString(),
      candidatos: Math.floor(Math.random() * 20) // Random simulated candidates count
    };

    const existingJobs = JSON.parse(localStorage.getItem("jobmatch_jobs") || "[]");
    localStorage.setItem("jobmatch_jobs", JSON.stringify([newJob, ...existingJobs]));
    
    router.push(`/company/dashboard/candidates?jobId=${newJob.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/company/dashboard" className="text-gray-500 hover:text-institutional-blue flex items-center gap-2 mb-6 w-fit">
        <ArrowLeft className="w-4 h-4" /> Volver al panel
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Crear Proceso de Selección</h1>
        <p className="text-gray-600 mt-2">Publica tu vacante completando la información básica.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
        <div className="bg-institutional-light px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Información básica</h2>
        </div>
        
        <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la vacante *</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                placeholder="Ej. Anfitriona / Inglés avanzado"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sede de trabajo (Ubicación) *</label>
              <div className="grid grid-cols-2 gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white">
                  <option>Perú</option>
                </select>
                <input
                  type="text"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  placeholder="Ciudad o Distrito"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad de trabajo</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white">
                <option>Presencial</option>
                <option>Híbrido</option>
                <option>Remoto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de contrato</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white">
                <option>Contrato por Obra Determinada</option>
                <option>Tiempo Indefinido</option>
                <option>Recibo por Honorarios</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jornada laboral</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white">
                <option>Tiempo completo</option>
                <option>Tiempo parcial</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-sm font-medium text-gray-700">Descripción de la vacante</label>
              <button type="button" className="text-xs flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded border border-indigo-200 hover:bg-indigo-100 transition-colors font-medium">
                <Sparkles className="w-3 h-3" /> Generar con IA
              </button>
            </div>
            <textarea
              rows={6}
              placeholder="Escribe las responsabilidades, funciones principales y expectativas del puesto..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none resize-y"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Habilidades</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHabilidad())}
                placeholder="Incluya las habilidades y competencias que los candidatos deben tener."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none"
              />
              <button
                type="button"
                onClick={handleAddHabilidad}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Añadir
              </button>
            </div>
            
            {listaHabilidades.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {listaHabilidades.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-50 text-institutional-blue border border-blue-200 text-sm rounded-full flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => setListaHabilidades(listaHabilidades.filter(s => s !== skill))} className="hover:text-red-500 font-bold ml-1">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-institutional-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Publicar Vacante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
