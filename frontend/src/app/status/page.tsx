"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function StatusPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from global state
    const currentStatus = localStorage.getItem("jobmatch_status");
    setStatus(currentStatus);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center p-12">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {!status ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">No hay postulaciones activas</h2>
            <p className="text-gray-600">Aún no has enviado tus documentos.</p>
            <div className="pt-6">
              <Link href="/upload" className="bg-institutional-blue text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors">
                Ir a Subir Documentos
              </Link>
            </div>
          </div>
        ) : status === "submitted" ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-institutional-green" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">¡Postulación Recibida!</h2>
            <p className="text-gray-600 mb-6">
              Hemos recibido tu CV, DNI y Certiadulto. Nuestro equipo está revisando tu perfil.
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6 text-left">
              <h3 className="font-semibold text-institutional-blue flex items-center gap-2">
                <Clock className="w-4 h-4" /> Estado Actual
              </h3>
              <p className="text-sm text-blue-800 mt-1">En revisión (Paso 1 de 3)</p>
              
              <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                <div className="bg-institutional-blue h-2 rounded-full w-1/3"></div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => {
                  localStorage.removeItem("jobmatch_status");
                  window.location.reload();
                }}
                className="text-institutional-red text-sm font-medium hover:underline"
              >
                Cancelar postulación
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-institutional-red" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Atención Requerida</h2>
            <p className="text-gray-600">Hubo un problema con tus documentos.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
