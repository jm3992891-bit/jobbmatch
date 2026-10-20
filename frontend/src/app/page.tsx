import Link from "next/link";
import { User, Building2, Zap, CheckCircle2 } from "lucide-react";
import LaboraLogo from "@/components/LaboraLogo";

export default function Home() {
  return (
    <div
      className="relative min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] lg:min-h-[580px] lg:max-h-[680px] flex flex-col lg:flex-row font-sans overflow-hidden bg-cover bg-no-repeat bg-[position:center_center] lg:bg-[position:52%_center]"
      style={{
        backgroundImage: "url('/hero-warehouse.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Mobile/Tablet Background Tint */}
      <div className="absolute inset-0 bg-[#041628]/60 lg:hidden pointer-events-none" />

      {/* Left Panel - Dark Navy with Diagonal Cut */}
      <div
        className="w-full lg:w-[53%] xl:w-[51%] bg-[#041628] text-white flex flex-col justify-between py-8 px-6 sm:px-10 lg:py-10 lg:pl-12 lg:pr-20 xl:pl-16 xl:pr-24 relative z-10 hero-diagonal-cut shadow-2xl"
        style={{ backgroundColor: "#041628" }}
      >
        {/* 3D Glowing mint cylinder accent in top right */}
        <div className="hidden lg:block absolute -top-12 right-12 pointer-events-none">
          <div className="relative w-16 h-80 rounded-full rotate-[42deg] bg-gradient-to-b from-[#00D494]/40 via-[#00B489]/20 to-transparent">
            {/* Bright mint rounded top cap */}
            <div className="w-14 h-14 rounded-full bg-[#00E599] shadow-lg shadow-emerald-500/40 absolute top-1 left-1" />
          </div>
        </div>

        {/* Brand & Main Headline */}
        <div className="relative z-10 max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <LaboraLogo variant="light" size={32} textSize="text-3xl" />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[38px] font-black text-white leading-[1.14] tracking-tight">
            Tu próximo trabajo <br />
            <span className="text-[#00D494]">está más cerca</span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-slate-300 text-xs sm:text-[13px] lg:text-sm leading-relaxed max-w-[400px] font-normal">
            Conectamos tu talento con empresas que buscan personas como tú. Sin
            complicaciones, sin búsquedas eternas. Aquí las oportunidades te
            encuentran.
          </p>
        </div>

        {/* Feature Badges (Arranged in 2 neat rows matching mockup) */}
        <div className="relative z-10 mt-8 lg:mt-auto pt-5 border-t border-white/10 flex flex-col gap-3.5">
          {/* Row 1 */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6">
            {/* 1: Postulación rápida */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00D494] text-[#041628] flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="w-4 h-4 fill-[#041628] text-[#041628]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs leading-none whitespace-nowrap">
                  Postulación rápida
                </h4>
                <p className="text-slate-400 text-[10px] leading-tight whitespace-nowrap mt-1">
                  En 1 clic (perfil express)
                </p>
              </div>
            </div>

            {/* 2: Sin experiencia previa */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00D494] text-[#041628] flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-white fill-[#041628] stroke-2" />
              </div>
              <div>
                <h4 className="text-white font-bold text-xs leading-none whitespace-nowrap">
                  Sin experiencia previa
                </h4>
                <p className="text-slate-400 text-[10px] leading-tight whitespace-nowrap mt-1">
                  Tu talento es suficiente
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00D494] text-[#041628] flex items-center justify-center shrink-0 shadow-sm">
              <Building2 className="w-4 h-4 fill-[#041628] text-[#041628]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs leading-none whitespace-nowrap">
                Empresas verificadas
              </h4>
              <p className="text-slate-400 text-[10px] leading-tight whitespace-nowrap mt-1">
                Trabaja con confianza
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Floating Access Card */}
      <div className="w-full lg:flex-1 flex items-center justify-center lg:justify-end py-8 px-6 sm:px-10 lg:pr-14 xl:pr-24 relative z-20">
        <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-2xl p-7 border border-white">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#041628]">Comienza ahora</h2>
            <p className="text-slate-500 text-xs mt-1 font-medium">
              Elige cómo quieres acceder a la plataforma
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Regístrate gratis */}
            <Link
              href="/candidate/register"
              className="flex items-center justify-center gap-2.5 w-full bg-[#00B489] hover:bg-[#009E77] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              <User className="w-4 h-4 fill-white" />
              <span>Regístrate gratis</span>
            </Link>

            {/* Ya tengo una cuenta */}
            <Link
              href="/candidate/login"
              className="flex items-center justify-center w-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 py-2.5 px-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              <span>Ya tengo una cuenta</span>
            </Link>

            {/* Divider */}
            <div className="relative py-1 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest relative z-10">
                EMPRESAS
              </span>
            </div>

            {/* Portal Empresas */}
            <Link
              href="/company/login"
              className="flex items-center justify-center gap-2.5 w-full bg-[#071F36] hover:bg-[#0A2C4D] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
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
