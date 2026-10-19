import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row font-sans">
      
      {/* Left Panel - Dark Blue */}
      <div className="w-full md:w-1/2 bg-[#0B1E36] text-white p-10 md:p-16 flex flex-col justify-center relative">
        
        <div className="mb-10">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-[#00B489] text-white px-2 py-1 rounded text-lg">L</span>
            Labora
          </h1>
        </div>

        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          Ofertas de empleo en <span className="text-[#00B489]">3</span> a <span className="text-[#00B489]">7 días</span>
        </h2>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
          Encuentra trabajo rápido y sin complicaciones. Conectamos talento con empresas verificadas en Lima Metropolitana que necesitan personal hoy mismo.
        </p>

        <ul className="space-y-5 text-gray-300 font-medium text-lg">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-[#00B489] w-6 h-6 flex-shrink-0" />
            Postulación en 1 clic (perfil express)
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-[#00B489] w-6 h-6 flex-shrink-0" />
            Sin necesidad de experiencia previa
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="text-[#00B489] w-6 h-6 flex-shrink-0" />
            Empresas 100% verificadas
          </li>
        </ul>
      </div>

      {/* Right Panel - Login/Navigation */}
      <div 
        className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center items-center relative overflow-hidden bg-[#E0F2F1]"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Overlay para oscurecer/teñir la foto y resaltar la tarjeta */}
        <div className="absolute inset-0 bg-[#0B1E36]/40 backdrop-blur-[2px]"></div>

        <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#0B1E36] mb-2">Comienza ahora</h3>
            <p className="text-gray-500 text-sm">Elige cómo quieres acceder a la plataforma</p>
          </div>

          <div className="space-y-4">
            <Link href="/candidate/register" className="block w-full text-center bg-[#00B489] text-white py-4 rounded-xl font-bold hover:bg-[#009672] transition-colors shadow-lg shadow-teal-500/30 text-lg">
              Regístrate gratis
            </Link>
            
            <Link href="/candidate/login" className="block w-full text-center bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              Ya tengo una cuenta
            </Link>

            <div className="relative py-4 flex items-center justify-center">
              <div className="border-t border-gray-200 absolute w-full"></div>
              <span className="bg-white px-4 text-xs text-gray-400 relative z-10">EMPRESAS</span>
            </div>

            <Link href="/company/login" className="block w-full text-center bg-[#0B1E36] text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
              Portal Empresas
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
