"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("correo") as string;
    const password = formData.get("password") as string;
    const razonSocial = formData.get("razonSocial") as string;

    // Simulate request and save credentials
    setTimeout(() => {
      localStorage.setItem("Labora_company_email", email);
      localStorage.setItem("Labora_company_pwd", password);
      localStorage.setItem("Labora_company_name", razonSocial);
      
      router.push("/company/login?registered=true");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Regístrate en Labora y empieza a publicar vacantes
          </h1>
          <p className="text-institutional-blue mt-2 font-medium">
            Únete a la mejor red de talento validado
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-institutional-red rounded-lg flex items-start text-institutional-red">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="sr-only">Nombre y apellidos</label>
              <input type="text" name="nombres" required placeholder="Nombre y apellidos" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>
            
            <div>
              <label className="sr-only">Teléfono</label>
              <input type="tel" name="telefono" required placeholder="Teléfono" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>

            <div>
              <label className="sr-only">Correo de acceso</label>
              <input type="email" name="correo" required placeholder="Correo de acceso" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>
            
            <div>
              <label className="sr-only">Contraseña</label>
              <input type="password" name="password" required placeholder="Contraseña" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>

            <div>
              <label className="sr-only">Nombre comercial de la empresa</label>
              <input type="text" name="nombreComercial" required placeholder="Nombre comercial de la empresa" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>
            
            <div>
              <label className="sr-only">Razón social</label>
              <input type="text" name="razonSocial" required placeholder="Razón social" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white text-gray-600">
                <option>Perú</option>
              </select>
              <input type="text" name="ruc" required placeholder="Nº registro social" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>

            <div>
              <label className="sr-only">Ciudad o Código postal</label>
              <input type="text" name="ciudad" required placeholder="Ciudad o Código postal" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none" />
            </div>

            <div>
              <select name="sector" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white text-gray-600" required>
                <option value="">Selecciona sector</option>
                <option value="tecnologia">Tecnología y Sistemas</option>
                <option value="comercio">Comercio y Retail</option>
                <option value="salud">Salud</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div>
              <select name="trabajadores" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white text-gray-600" required>
                <option value="">Nº de trabajadores</option>
                <option value="1-10">1 - 10</option>
                <option value="11-50">11 - 50</option>
                <option value="50+">Más de 50</option>
              </select>
            </div>

            <div>
              <select name="vacantes" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-institutional-blue outline-none bg-white text-gray-600" required>
                <option value="">Nº de vacantes anuales</option>
                <option value="1-5">1 - 5</option>
                <option value="6-20">6 - 20</option>
                <option value="20+">Más de 20</option>
              </select>
            </div>

          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-8 py-3 border border-transparent rounded-lg shadow-sm font-bold text-white bg-institutional-blue hover:bg-blue-800 focus:outline-none transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4 max-w-2xl">
            Al hacer clic en crear cuenta, aceptas las Condiciones Legales y la Política de Privacidad de Labora para crear una cuenta, publicar vacantes de empleo, contactar con candidatos y recibir comunicaciones.
          </p>

          <div className="text-sm mt-4 text-gray-600">
            ¿Ya tienes cuenta? <Link href="/company/login" className="text-institutional-blue font-semibold hover:underline">Inicia sesión aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
