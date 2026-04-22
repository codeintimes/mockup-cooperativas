"use client";

import { useState } from "react";
import { Card, SectionHeader } from "@/components/kpi";
import { COOPS } from "@/lib/mock/coops";
import { fmtNumber } from "@/lib/utils";
import { MapPin, Layers } from "lucide-react";

const LAT_RANGE = [12.2, 13.2];
const LNG_RANGE = [-86.5, -85.3];

function toXY(lat: number, lng: number) {
  const x = ((lng - LNG_RANGE[0]) / (LNG_RANGE[1] - LNG_RANGE[0])) * 100;
  const y = 100 - ((lat - LAT_RANGE[0]) / (LAT_RANGE[1] - LAT_RANGE[0])) * 100;
  return { x, y };
}

export default function MapaPage() {
  const [selected, setSelected] = useState(COOPS[0].id);
  const current = COOPS.find((c) => c.id === selected)!;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2 p-0 overflow-hidden">
        <div className="p-5 pb-3 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-xl text-agro-900">Mapa del conglomerado</h2>
            <p className="text-sm text-neutral-500">6 cooperativas base · norte de Nicaragua</p>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="chip bg-agro-100 border-agro-200 text-agro-800">
              <Layers className="w-3 h-3" /> Coops
            </button>
            <button className="chip bg-white border-neutral-200 text-neutral-500">Fincas</button>
            <button className="chip bg-white border-neutral-200 text-neutral-500">Acopios</button>
          </div>
        </div>
        <div className="relative bg-gradient-to-br from-agro-100 via-agro-50 to-crema aspect-[4/3] border-t border-neutral-200">
          {/* Decorative topo lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${10 + i * 7} Q ${20 + i * 3} ${5 + i * 6} ${50 + i * 2} ${12 + i * 7} T 100 ${14 + i * 7}`}
                stroke="#3c6e2c"
                fill="none"
                strokeWidth="0.2"
              />
            ))}
          </svg>
          {COOPS.map((c) => {
            const { x, y } = toXY(c.lat, c.lng);
            const active = c.id === selected;
            return (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition ${active ? "scale-150" : "scale-100 group-hover:scale-125"}`}
                  style={{ background: c.color }}
                />
                <div
                  className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium px-2 py-0.5 rounded border shadow-sm ${active ? "bg-agro-800 text-white border-agro-800" : "bg-white text-neutral-700 border-neutral-200"}`}
                >
                  {c.nombre}
                </div>
              </button>
            );
          })}
          <div className="absolute bottom-3 left-3 chip bg-white/90 border-neutral-200 text-neutral-600">
            <MapPin className="w-3 h-3" /> Escala ~120 km
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title={current.nombre} description={current.ubicacion} />
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-neutral-500">Cultivo principal</span><span className="font-medium">{current.cultivoPrincipal}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Socios</span><span className="font-medium">{fmtNumber(current.socios)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Hectáreas</span><span className="font-medium">{fmtNumber(current.hectareas)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-500">Fundada</span><span className="font-medium">{current.fundada}</span></div>
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Indicadores clave</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-md bg-agro-50 border border-agro-100"><div className="text-neutral-500">Rend. promedio</div><div className="font-semibold text-agro-900">16.4 qq/ha</div></div>
            <div className="p-2 rounded-md bg-agro-50 border border-agro-100"><div className="text-neutral-500">Adopción BPA</div><div className="font-semibold text-agro-900">78%</div></div>
            <div className="p-2 rounded-md bg-agro-50 border border-agro-100"><div className="text-neutral-500">Cartera activa</div><div className="font-semibold text-agro-900">$412k</div></div>
            <div className="p-2 rounded-md bg-agro-50 border border-agro-100"><div className="text-neutral-500">Mora 30d</div><div className="font-semibold text-agro-900">3.1%</div></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
