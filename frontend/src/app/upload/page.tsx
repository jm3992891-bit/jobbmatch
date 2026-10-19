"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Simulate network request
    setTimeout(() => {
      // Simulate success and save to localStorage for global state sim
      localStorage.setItem("jobmatch_status", "submitted");
      router.push("/status");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-institutional-blue mb-6">Completa tu Postulación</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-institutional-red rounded-lg flex items-start text-institutional-red">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo personal actualizado *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue focus:border-institutional-blue outline-none transition-all"
              placeholder="tu@correo.com"
            />
          </div>

          {/* CV */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currículum Vitae (CV) *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-institutional-blue transition-colors bg-institutional-light cursor-pointer relative">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="cv-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-institutional-blue hover:text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-institutional-blue">
                    <span>Sube un archivo</span>
                    <input id="cv-upload" name="cv-upload" type="file" className="sr-only" required accept=".pdf,.doc,.docx" />
                  </label>
                  <p className="pl-1">o arrastra y suelta</p>
                </div>
                <p className="text-xs text-gray-500">PDF o Word hasta 5MB</p>
              </div>
            </div>
          </div>

          {/* DNI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DNI Frontal *
              </label>
              <input type="file" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-institutional-blue hover:file:bg-blue-100 cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DNI Reverso *
              </label>
              <input type="file" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-institutional-blue hover:file:bg-blue-100 cursor-pointer" />
            </div>
          </div>

          {/* Certiadulto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certiadulto actualizado *
            </label>
            <input type="file" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-institutional-green hover:file:bg-green-100 cursor-pointer" />
            <p className="text-xs text-gray-500 mt-1">Obligatorio para verificar antecedentes legales.</p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-institutional-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-institutional-blue transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
