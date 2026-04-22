"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { CERTIFICACIONES } from "@/lib/mock/catalogo";
import { COOPS } from "@/lib/mock/coops";
import { BadgeCheck, ShieldAlert, ClipboardList, Leaf } from "lucide-react";

export default function CertificacionesPage() {
  const vigentes = CERTIFICACIONES.filter((c) => c.estado === "Vigente").length;
  const porVencer = CERTIFICACIONES.filter((c) => c.estado === "Por renovar").length;
  const auditoria = CERTIFICACIONES.filter((c) => c.estado === "En auditoría").length;
  const nc = CERTIFICACIONES.reduce((s, c) => s + c.nc, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Certificaciones vigentes" value={vigentes} delta={0} icon={<BadgeCheck className="w-4 h-4" />} tone="success" />
        <KpiCard label="Por renovar 60d" value={porVencer} icon={<ShieldAlert className="w-4 h-4" />} tone="warn" />
        <KpiCard label="En auditoría" value={auditoria} icon={<ClipboardList className="w-4 h-4" />} />
        <KpiCard label="No conformidades abiertas" value={nc} icon={<Leaf className="w-4 h-4" />} tone="warn" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Matriz de certificaciones" description="Por cooperativa y sello" />
          <table className="table-sm w-full">
            <thead>
              <tr><th>Cooperativa</th><th>Sello</th><th>Estado</th><th>Vence</th><th className="text-right">NC</th></tr>
            </thead>
            <tbody>
              {CERTIFICACIONES.map((c, i) => (
                <tr key={i}>
                  <td className="font-medium">{COOPS.find((x) => x.id === c.coopId)?.nombre}</td>
                  <td>{c.cert}</td>
                  <td>
                    <span className={`chip ${c.estado === "Vigente" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : c.estado === "Por renovar" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-sky-50 border-sky-200 text-sky-700"}`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="text-neutral-500">{c.vence}</td>
                  <td className="text-right">{c.nc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <SectionHeader title="Trazabilidad lote → finca" description="Demostrable a comprador / auditor" />
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg border border-agro-200 bg-agro-50">
              <div className="font-mono text-xs">LOT-2026-0412</div>
              <div className="font-semibold mt-1">Café SHG · 18 t</div>
              <div className="text-xs text-neutral-600">Orgánico USDA + Fairtrade</div>
            </div>
            <ol className="relative border-l-2 border-agro-200 ml-2 space-y-3 pl-4 text-xs">
              <li><span className="absolute -left-[7px] w-3 h-3 rounded-full bg-agro-600" />Cosechado por 41 socios · Pantasma · 12–18 mar</li>
              <li><span className="absolute -left-[7px] w-3 h-3 rounded-full bg-agro-600" />Acopio beneficio húmedo · Café del Norte · 20 mar</li>
              <li><span className="absolute -left-[7px] w-3 h-3 rounded-full bg-agro-600" />Secado y trilla · 25 mar – 8 abr</li>
              <li><span className="absolute -left-[7px] w-3 h-3 rounded-full bg-agro-600" />Catación 84.2 pts SCA</li>
              <li><span className="absolute -left-[7px] w-3 h-3 rounded-full bg-amber-500" />En tránsito puerto Corinto</li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
}
