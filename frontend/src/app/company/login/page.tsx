"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

function CompanyLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("correo") as string;
    const password = formData.get("password") as string;

    // Simulate login verification
    setTimeout(() => {
      const savedEmail = localStorage.getItem("jobmatch_company_email");
      const savedPwd = localStorage.getItem("jobmatch_company_pwd");

      if (email === savedEmail && password === savedPwd) {
        // Success
        localStorage.setItem("jobmatch_company", localStorage.getItem("jobmatch_company_name") || "Empresa");
        router.push("/company/dashboard");
      } else {
        setError("Correo o contraseña incorrectos. Por favor, intenta de nuevo.");
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {isRegistered && (
          <div className="mb-6 p-4 bg-green-50 border border-institutional-green rounded-lg flex items-start text-green-700">
            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">¡Cuenta creada con éxito! Por favor, inicia sesión.</p>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-50 text-institutional-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Acceso Reclutadores
          </h1>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-institutional-red rounded-lg flex items-start text-institutional-red">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              name="correo" 
              required 
              placeholder="Ej: reclutamiento@empresa.com" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="Tu contraseña" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" 
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-8 py-3 rounded-lg shadow-sm font-bold text-white bg-institutional-blue hover:bg-blue-800 focus:outline-none transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes una cuenta? <Link href="/company/register" className="text-institutional-blue font-semibold hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}

export default function CompanyLoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto px-4 py-16 text-center text-gray-500 font-medium">Cargando...</div>}>
      <CompanyLoginContent />
    </Suspense>
  );
}
