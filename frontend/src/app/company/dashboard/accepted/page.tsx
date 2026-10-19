"use client";

import { useEffect, useState } from "react";
import { User, Phone, Mail, FileText, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";

const MOCK_ACCEPTED = [
  { 
    id: 1, 
    name: "Juan Pérez", 
    role: "Desarrollador Frontend", 
    processTitle: "Desarrollador Frontend React",
    email: "juan.perez@email.com",
    phone: "+51 987 654 321",
    date: "Hace 2 horas",
    verified: true 
  },
  { 
    id: 6, 
    name: "Sofía Castro", 
    role: "Anfitriona", 
    processTitle: "Anfitriona / Inglés avanzado",
    email: "sofia.castro@email.com",
    phone: "+51 912 345 678",
    date: "Ayer",
    verified: true 
  },
];

export default function AcceptedCandidatesPage() {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("jobmatch_company_name") || "Empresa";
    setCompanyName(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-institutional-light font-sans">
      {/* Top Navbar Simulation for ATS */}
      <div className="bg-[#1a232c] text-white">
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold">
              JM
            </div>
            <nav className="flex space-x-4 font-medium text-gray-300">
              <Link href="/company/dashboard" className="hover:text-white">Principal</Link>
              <Link href="/company/dashboard" className="hover:text-white">Procesos</Link>
              <Link href="#" className="hover:text-white">Solicitudes</Link>
              <Link href="/company/dashboard/accepted" className="text-white border-b-2 border-white pb-[18px]">Candidatos Aceptados</Link>
              <Link href="#" className="hover:text-white">Reportes</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-300">{companyName}</span>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="mb-8 border-b border-gray-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Candidatos que Aceptaron la Oferta</h1>
            <p className="text-gray-600 mt-2">
              Estas personas aceptaron tu invitación. Sus datos de contacto completos han sido desbloqueados.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MOCK_ACCEPTED.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 relative">
              <div className="absolute top-6 right-6 bg-green-50 text-institutional-green px-3 py-1 rounded-md text-xs font-bold border border-green-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Oferta Aceptada
              </div>

              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-blue-100 text-institutional-blue rounded-full flex items-center justify-center text-2xl font-bold">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Postuló a: <strong className="text-gray-700">{candidate.processTitle}</strong></p>

                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Información de Contacto</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" /> 
                    <span className="font-medium">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" /> 
                    <a href={`mailto:${candidate.email}`} className="text-institutional-blue hover:underline font-medium">{candidate.email}</a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-institutional-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    <MessageCircle className="w-4 h-4" /> Contactar por WhatsApp
                  </button>
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4 text-gray-400" /> Descargar CV Completo
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 text-xs text-gray-400 font-medium">
                Respondió {candidate.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
