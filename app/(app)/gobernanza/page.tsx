"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { ASAMBLEAS, VOTACIONES } from "@/lib/mock/catalogo";
import { Vote, ScrollText, UsersRound, Gavel } from "lucide-react";

export default function GobernanzaPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Asambleas este año" value="14" hint="4 del conglomerado" icon={<UsersRound className="w-4 h-4" />} />
        <KpiCard label="Votaciones abiertas" value={VOTACIONES.length} icon={<Vote className="w-4 h-4" />} tone="warn" />
        <KpiCard label="Quórum promedio" value="87%" delta={4.1} icon={<Gavel className="w-4 h-4" />} tone="success" />
        <KpiCard label="Actas publicadas" value="42" hint="últimos 12m" icon={<ScrollText className="w-4 h-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Calendario de asambleas" actions={<button className="btn-ghost text-xs">+ Convocar</button>} />
          <table className="table-sm w-full">
            <thead>
              <tr><th>Órgano</th><th>Tipo</th><th>Fecha</th><th>Quórum</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {ASAMBLEAS.map((a, i) => (
                <tr key={i}>
                  <td className="font-medium">{a.coop}</td>
                  <td>{a.tipo}</td>
                  <td>{a.fecha}</td>
                  <td>{a.quorum}</td>
                  <td><span className="chip bg-agro-50 border-agro-200 text-agro-800">{a.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <SectionHeader title="Consejo de administración" description="Rotación principio 2" />
          <ul className="space-y-2.5 text-sm">
            <li className="flex justify-between"><span>Presidencia</span><span className="font-medium">María Blandón</span></li>
            <li className="flex justify-between"><span>Vicepresidencia</span><span className="font-medium">Ramón Zeledón</span></li>
            <li className="flex justify-between"><span>Tesorería</span><span className="font-medium">Silvia Castillo</span></li>
            <li className="flex justify-between"><span>Secretaría</span><span className="font-medium">Jorge Rivera</span></li>
            <li className="flex justify-between"><span>Vocal 1</span><span className="font-medium">Ana Mendoza</span></li>
            <li className="flex justify-between"><span>Vocal 2</span><span className="font-medium">Luis Hernández</span></li>
          </ul>
          <div className="text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-100">Próxima renovación: AGE 2027</div>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Votaciones inter-cooperativas abiertas" description="Un socio = un voto · principio 2" />
        <div className="space-y-4">
          {VOTACIONES.map((v, i) => {
            const total = v.a_favor + v.en_contra + v.abstencion;
            const pctFavor = (v.a_favor / total) * 100;
            const pctContra = (v.en_contra / total) * 100;
            return (
              <div key={i} className="p-4 rounded-lg border border-neutral-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-agro-900">{v.titulo}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">Cierra {v.cierre}</div>
                  </div>
                  <button className="btn-primary text-xs shrink-0">Votar</button>
                </div>
                <div className="mt-3 h-2 rounded-full overflow-hidden bg-neutral-100 flex">
                  <div className="bg-agro-600" style={{ width: `${pctFavor}%` }} />
                  <div className="bg-rose-400" style={{ width: `${pctContra}%` }} />
                  <div className="bg-neutral-300 flex-1" />
                </div>
                <div className="flex gap-4 mt-2 text-xs text-neutral-600">
                  <span className="text-agro-700">A favor: {v.a_favor}</span>
                  <span className="text-rose-600">En contra: {v.en_contra}</span>
                  <span>Abstención: {v.abstencion}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
