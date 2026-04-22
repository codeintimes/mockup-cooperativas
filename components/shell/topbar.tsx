"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, CircleUserRound } from "lucide-react";
import { CoopSelector } from "./coop-selector";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard ejecutivo",
  "/mapa": "Mapa del conglomerado",
  "/socios": "Socios productores",
  "/produccion": "Producción y acopio",
  "/comercializacion": "Comercialización conjunta",
  "/compras": "Compras consolidadas",
  "/finanzas": "Finanzas consolidadas",
  "/asistencia-tecnica": "Asistencia técnica",
  "/certificaciones": "Certificaciones y trazabilidad",
  "/clima": "Clima y riesgo agroclimático",
  "/sostenibilidad": "Balance social e impacto",
  "/gobernanza": "Gobernanza",
  "/capacitacion": "Capacitación",
  "/inter-cooperacion": "Inter-cooperación",
};

export function Topbar() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "";
  return (
    <header className="sticky top-0 z-20 bg-crema/85 backdrop-blur border-b border-neutral-200/70">
      <div className="flex items-center gap-4 px-6 h-14">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-neutral-500">Conglomerado AgroUnión</div>
          <div className="font-serif text-lg leading-tight text-agro-900 truncate">{title}</div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-neutral-500 bg-white border border-neutral-200 rounded-lg px-3 py-1.5 w-64">
          <Search className="w-4 h-4" />
          <span>Buscar socio, contrato, lote…</span>
        </div>
        <CoopSelector />
        <button className="relative p-2 rounded-lg hover:bg-agro-50 text-neutral-600" aria-label="Notificaciones">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
          <CircleUserRound className="w-7 h-7 text-agro-700" />
          <div className="hidden sm:block text-sm leading-tight">
            <div className="font-medium">María Blandón</div>
            <div className="text-xs text-neutral-500">Directora ejecutiva</div>
          </div>
        </div>
      </div>
    </header>
  );
}
