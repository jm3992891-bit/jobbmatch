import Link from "next/link";
import { User, Building2, Zap, CheckCircle2 } from "lucide-react";
import { LaboraIcon } from "@/components/LaboraLogo";

export default function Home() {
  return (
    <div
      className="relative min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row font-sans overflow-hidden bg-cover bg-center lg:bg-right"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Mobile/Tablet Background Tint */}
      <div className="absolute inset-0 bg-[#051829]/60 lg:hidden pointer-events-none" />

      {/* Left Panel - Dark Navy with Diagonal Cut */}
      <div
        className="w-full lg:w-[56%] xl:w-[53%] bg-[#051829] text-white flex flex-col justify-between p-8 sm:p-12 lg:py-14 lg:pl-16 lg:pr-24 xl:pl-24 xl:pr-28 relative z-10 hero-diagonal-cut shadow-2xl"
      >
        {/* Decorative subtle angled accent bars */}
        <div className="hidden lg:block absolute -top-12 right-12 w-20 h-96 bg-[#00D494]/10 rounded-full rotate-[35deg] pointer-events-none transform -translate-y-4" />
        <div className="hidden lg:block absolute top-20 right-32 w-12 h-64 bg-[#00D494]/5 rounded-full rotate-[35deg] pointer-events-none" />

        {/* Brand & Main Headline */}
        <div className="relative z-10 max-w-xl">
          {/* Logo */}
          <div className="flex items-center gap-3.5 mb-8">
            <LaboraIcon size={44} />
            <span className="text-white font-black text-3xl lg:text-4xl tracking-tight">
              Labora
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.12] tracking-tight">
            Tu próximo trabajo <br />
            <span className="text-[#00D494]">está más cerca</span>
          </h1>

          {/* Description */}
          <p className="mt-5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
            Conectamos tu talento con empresas que buscan personas como tú. Sin
            complicaciones, sin búsquedas eternas. Aquí las oportunidades te
            encuentran.
          </p>
        </div>

        {/* Feature Badges (3 items in a horizontal row) */}
        <div className="relative z-10 mt-10 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-4 xl:gap-6 pt-6 border-t border-white/10">
          {/* 1: Postulación rápida */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00D494] text-[#051829] flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs lg:text-[13px] leading-snug">
                Postulación rápida
              </h4>
              <p className="text-slate-400 text-[11px] leading-snug">
                En 1 clic (perfil express)
              </p>
            </div>
          </div>

          {/* 2: Sin experiencia previa */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00D494] text-[#051829] flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-5 h-5 fill-current text-white stroke-[#051829] stroke-2" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs lg:text-[13px] leading-snug">
                Sin experiencia previa
              </h4>
              <p className="text-slate-400 text-[11px] leading-snug">
                Tu talento es suficiente
              </p>
            </div>
          </div>

          {/* 3: Empresas verificadas */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00D494] text-[#051829] flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs lg:text-[13px] leading-snug">
                Empresas verificadas
              </h4>
              <p className="text-slate-400 text-[11px] leading-snug">
                Trabaja con confianza
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Floating Access Card */}
      <div className="w-full lg:flex-1 flex items-center justify-center lg:justify-end p-6 sm:p-10 lg:pr-16 xl:pr-24 py-12 relative z-20">
        <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-2xl p-7 sm:p-8 border border-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-[#051829]">Comienza ahora</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Elige cómo quieres acceder a la plataforma
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Regístrate gratis */}
            <Link
              href="/candidate/register"
              className="flex items-center justify-center gap-2.5 w-full bg-[#00B489] hover:bg-[#009E77] text-white py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/35 hover:-translate-y-0.5"
            >
              <User className="w-4 h-4 fill-white" />
              <span>Regístrate gratis</span>
            </Link>

            {/* Ya tengo una cuenta */}
            <Link
              href="/candidate/login"
              className="flex items-center justify-center w-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5"
            >
              <span>Ya tengo una cuenta</span>
            </Link>

            {/* Divider */}
            <div className="relative py-2 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
                EMPRESAS
              </span>
            </div>

            {/* Portal Empresas */}
            <Link
              href="/company/login"
              className="flex items-center justify-center gap-2.5 w-full bg-[#051829] hover:bg-[#092642] text-white py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5"
            >
              <Building2 className="w-4 h-4 text-white" />
              <span>Portal Empresas</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
