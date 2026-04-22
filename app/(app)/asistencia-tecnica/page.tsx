"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { LineSeries } from "@/components/charts";
import { VISITAS_TECNICAS } from "@/lib/mock/catalogo";
import { COOPS } from "@/lib/mock/coops";
import { HeartPulse, Users, ClipboardCheck, CalendarCheck } from "lucide-react";

export default function AsistenciaPage() {
  const meses = ["Nov", "Dic", "Ene", "Feb", "Mar", "Abr"];
  const adopcion = meses.map((m, i) => ({ mes: m, bpa: 58 + i * 3.4, adoptadores: 42 + i * 4.1 }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Visitas este mes" value="142" delta={12.0} icon={<HeartPulse className="w-4 h-4" />} tone="success" />
        <KpiCard label="Técnicos activos" value="18" hint="6 cooperativas" icon={<Users className="w-4 h-4" />} />
        <KpiCard label="Adopción BPA" value="78%" delta={6.8} icon={<ClipboardCheck className="w-4 h-4" />} tone="success" />
        <KpiCard label="Planes de cultivo" value="1.862" hint="activos" icon={<CalendarCheck className="w-4 h-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Adopción de Buenas Prácticas" description="Promedio móvil 6 meses (%)" />
          <LineSeries
            xKey="mes"
            data={adopcion}
            series={[
              { key: "bpa", label: "Índice BPA", color: "#3c6e2c" },
              { key: "adoptadores", label: "% Socios adoptando", color: "#8b5e3c" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Próximas visitas" />
          <ul className="space-y-3 text-sm">
            {VISITAS_TECNICAS.slice(0, 5).map((v) => (
              <li key={v.tecnico} className="p-3 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{v.tecnico}</div>
                  <span className="chip bg-agro-50 border-agro-200 text-agro-800">{v.proxima.slice(5)}</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">{v.zona} · {v.socios} socios · BPA {v.bpa}%</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Equipo de campo" />
        <table className="table-sm w-full">
          <thead>
            <tr><th>Técnico</th><th>Cooperativa</th><th>Zona</th><th className="text-right">Socios atendidos</th><th className="text-right">BPA</th><th>Próxima visita</th></tr>
          </thead>
          <tbody>
            {VISITAS_TECNICAS.map((v) => (
              <tr key={v.tecnico}>
                <td className="font-medium">{v.tecnico}</td>
                <td>{COOPS.find((c) => c.id === v.coopId)?.nombre}</td>
                <td className="text-neutral-500">{v.zona}</td>
                <td className="text-right">{v.socios}</td>
                <td className="text-right font-semibold text-agro-800">{v.bpa}%</td>
                <td>{v.proxima}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
