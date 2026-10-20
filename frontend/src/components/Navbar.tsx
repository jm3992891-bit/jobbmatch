"use client";

import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LaboraLogo from "./LaboraLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCandidateDashboard = pathname?.startsWith("/candidate/dashboard");
  const isCompanyDashboard = pathname?.startsWith("/company/dashboard");

  const [candidateName, setCandidateName] = useState("Juan Carlos Pérez");
  const [companyName, setCompanyName] = useState("Logística Perú S.A.C.");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCandidate = localStorage.getItem("Labora_candidate_name") || "Juan Carlos Pérez";
      setCandidateName(savedCandidate);
      const savedCompany = localStorage.getItem("jobmatch_company_name") || "Logística Perú S.A.C.";
      setCompanyName(savedCompany);
    }
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-200 ${
        isHome
          ? "bg-white border-b border-gray-100 shadow-sm text-slate-800"
          : "bg-institutional-blue text-institutional-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Menú Principal */}
          <div className="flex items-center gap-6">
            <Link
              href={
                isCompanyDashboard
                  ? "/company/dashboard"
                  : isCandidateDashboard
                  ? "/candidate/dashboard"
                  : "/"
              }
              className="flex items-center shrink-0"
            >
              <LaboraLogo variant={isHome ? "dark" : "light"} size={32} />
            </Link>

            {isCandidateDashboard && (
              <span className="hidden sm:inline-flex items-center px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-semibold tracking-wide">
                Mi Panel
              </span>
            )}

            {isCompanyDashboard && (
              <nav className="hidden md:flex space-x-1 font-semibold text-sm text-blue-100">
                <Link
                  href="/company/dashboard"
                  className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  Principal
                </Link>
                <Link
                  href="/company/dashboard"
                  className="px-3 py-1.5 rounded-lg bg-white/15 text-white font-bold transition-colors border border-white/20"
                >
                  Procesos
                </Link>
                <Link
                  href="/company/dashboard/candidates?jobId=1"
                  className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  Candidatos
                </Link>
                <Link
                  href="/company/dashboard"
                  className="px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  Reportes
                </Link>
              </nav>
            )}
          </div>

          {/* LADO DERECHO SEGÚN SESIÓN O LANDING */}
          {isCandidateDashboard ? (
            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="hidden sm:inline">Alertas WhatsApp Activas</span>
                <span className="sm:hidden">WhatsApp Activo</span>
              </div>

              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <span className="text-white text-sm font-medium hidden md:block">
                  {candidateName}
                </span>
                <div className="w-8 h-8 rounded-full bg-institutional-green/30 border border-institutional-green flex items-center justify-center text-white">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ) : isCompanyDashboard ? (
            <div className="flex items-center gap-3 md:gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Empresa Verificada
              </span>

              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <span className="text-white text-sm font-bold hidden md:block truncate max-w-[200px]">
                  {companyName}
                </span>
                <div className="w-8 h-8 rounded-full bg-blue-800 border border-blue-400/30 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                  {companyName.substring(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="#como-funciona"
                  className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                >
                  Cómo funciona
                </Link>
                <Link
                  href="#empresas-aliadas"
                  className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                >
                  Empresas aliadas
                </Link>
                <Link
                  href="#preguntas-frecuentes"
                  className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                >
                  Preguntas frecuentes
                </Link>
              </div>

              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-colors ${
                    isHome
                      ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      : "text-white hover:bg-blue-800"
                  }`}
                >
                  <span className="sr-only">Abrir menú principal</span>
                  {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div
          className={`md:hidden pb-3 px-4 pt-2 space-y-2 border-t ${
            isHome
              ? "bg-white border-gray-100 text-slate-700 shadow-md"
              : "bg-institutional-blue border-white/10 text-white shadow-inner"
          }`}
        >
          <Link
            href="#como-funciona"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-medium hover:text-emerald-600 transition-colors"
          >
            Cómo funciona
          </Link>
          <Link
            href="#empresas-aliadas"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-medium hover:text-emerald-600 transition-colors"
          >
            Empresas aliadas
          </Link>
          <Link
            href="#preguntas-frecuentes"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-medium hover:text-emerald-600 transition-colors"
          >
            Preguntas frecuentes
          </Link>
        </div>
      )}
    </nav>
  );
}
