import Link from "next/link";
import { User, Building2, Zap, CheckCircle2 } from "lucide-react";
import LaboraLogo from "@/components/LaboraLogo";

export default function Home() {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-80px)] overflow-x-hidden font-sans"
      style={{
        backgroundImage: "url('/hero-warehouse.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Mobile/Tablet Background Tint */}
      <div className="absolute inset-0 bg-[#08223A]/70 lg:hidden pointer-events-none z-10" />

      {/* Bloque izquierdo azul marino con corte diagonal exacto */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-[58%] bg-[#08223A] hero-diagonal-cut z-10 shadow-2xl"
        style={{
          backgroundColor: "#08223A",
          clipPath: "polygon(0 0, 100% 0, 84% 100%, 0% 100%)",
        }}
      >
        {/* Cápsula/píldora verde translúcida inclinada en la parte superior derecha del corte */}
        <div className="absolute -top-12 right-12 pointer-events-none z-10">
          <div className="relative w-16 h-80 rounded-full rotate-[42deg] bg-gradient-to-b from-[#05B378]/40 via-[#05B378]/15 to-transparent">
            {/* Tapa redondeada verde brillante */}
            <div className="w-14 h-14 rounded-full bg-[#05B378] shadow-lg shadow-[#05B378]/50 absolute top-1 left-1" />
          </div>
        </div>
      </div>

      {/* Contenedor central anti-deformación con max-width: 1440px y margin: 0 auto */}
      <div className="w-full min-h-[calc(100vh-80px)] max-w-[1440px] mx-auto px-[5%] flex flex-col lg:flex-row items-center justify-between relative z-20">
        
        {/* Columna Izquierda: Bloque de texto (max-width: 540px) */}
        <div
          className="w-full lg:w-[50%] py-10 sm:py-14 lg:py-16 flex flex-col justify-center"
          style={{ maxWidth: "540px" }}
        >
          {/* Logo 'Labora' grande en blanco con isotipo verde */}
          <div className="mb-6">
            <LaboraLogo variant="light" size={42} textSize="text-3xl sm:text-4xl" />
          </div>

          {/* Título H1 en dos líneas */}
          <h1
            className="text-white tracking-tight"
            style={{
              fontSize: "3.25rem",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Tu próximo trabajo <br />
            <span style={{ color: "#05B378" }}>está más cerca</span>
          </h1>

          {/* Párrafo descriptivo en gris claro (#CBD5E1) */}
          <p
            className="mt-5 font-normal"
            style={{
              color: "#CBD5E1",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Conectamos tu talento con empresas que buscan personas como tú. Sin
            complicaciones, sin búsquedas eternas. Aquí las oportunidades te
            encuentran.
          </p>

          {/* Grid de 2 columnas de beneficios (2 arriba y 1 abajo) */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 pt-6 border-t border-white/10">
            {/* 1: Postulación rápida */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#05B378",
                }}
              >
                <Zap className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  Postulación rápida
                </h4>
                <p
                  className="text-xs leading-tight mt-0.5"
                  style={{ color: "#CBD5E1" }}
                >
                  En 1 clic (perfil express)
                </p>
              </div>
            </div>

            {/* 2: Sin experiencia previa */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#05B378",
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-white fill-[#08223A] stroke-2" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  Sin experiencia previa
                </h4>
                <p
                  className="text-xs leading-tight mt-0.5"
                  style={{ color: "#CBD5E1" }}
                >
                  Tu talento es suficiente
                </p>
              </div>
            </div>

            {/* 3: Empresas verificadas (debajo a la izquierda) */}
            <div className="flex items-center gap-3 sm:col-span-2 sm:max-w-[260px]">
              <div
                className="rounded-full flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#05B378",
                }}
              >
                <Building2 className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight">
                  Empresas verificadas
                </h4>
                <p
                  className="text-xs leading-tight mt-0.5"
                  style={{ color: "#CBD5E1" }}
                >
                  Trabaja con confianza
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta Flotante Derecha (Proporción Bloqueada) */}
        <div className="w-full lg:w-[42%] flex items-center justify-center lg:justify-end py-10 lg:py-0">
          <div
            className="bg-white shrink-0"
            style={{
              width: "380px",
              maxWidth: "100%",
              padding: "36px",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-[#08223A]">Comienza ahora</h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 font-medium">
                Elige cómo quieres acceder a la plataforma
              </p>
            </div>

            <div className="space-y-4">
              {/* Regístrate gratis */}
              <Link
                href="/candidate/register"
                className="flex items-center justify-center gap-2.5 w-full text-white font-bold text-sm sm:text-base transition-all hover:opacity-95 shadow-md hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#05B378",
                  height: "48px",
                  borderRadius: "9999px",
                }}
              >
                <User className="w-5 h-5 fill-white" />
                <span>Regístrate gratis</span>
              </Link>

              {/* Ya tengo una cuenta */}
              <Link
                href="/candidate/login"
                className="flex items-center justify-center w-full bg-white text-[#08223A] font-bold text-sm sm:text-base border border-slate-300 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
                style={{
                  height: "48px",
                  borderRadius: "9999px",
                }}
              >
                <span>Ya tengo una cuenta</span>
              </Link>

              {/* Divisor EMPRESAS */}
              <div className="relative py-1 flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
                  EMPRESAS
                </span>
              </div>

              {/* Portal Empresas */}
              <Link
                href="/company/login"
                className="flex items-center justify-center gap-2.5 w-full text-white font-bold text-sm sm:text-base transition-all hover:opacity-95 shadow-md hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#08223A",
                  height: "48px",
                  borderRadius: "9999px",
                }}
              >
                <Building2 className="w-5 h-5 text-white" />
                <span>Portal Empresas</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
