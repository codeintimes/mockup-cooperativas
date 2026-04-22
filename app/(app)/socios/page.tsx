"use client";

import { useMemo } from "react";
import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { DonutChart, BarSeries } from "@/components/charts";
import { SOCIOS } from "@/lib/mock/socios";
import { COOPS } from "@/lib/mock/coops";
import { useCoop } from "@/lib/coop-context";
import { fmtNumber, fmtPct, fmtCurrency } from "@/lib/utils";
import { Users, UserPlus, BadgeCheck, Sparkles } from "lucide-react";

export default function SociosPage() {
  const { selected } = useCoop();
  const lista = useMemo(() => (selected === "all" ? SOCIOS : SOCIOS.filter((s) => s.coopId === selected)), [selected]);

  const total = lista.length;
  const mujeres = lista.filter((s) => s.genero === "F").length;
  const certificados = lista.filter((s) => s.certificado).length;
  const ingresoProm = lista.reduce((s, x) => s + x.ingreso, 0) / Math.max(total, 1);

  const scoreData = ["A", "B", "C", "D"].map((k, i) => ({
    cultivo: `Score ${k}`,
    valor: lista.filter((s) => s.score === k).length,
    color: ["#3c6e2c", "#72a85c", "#c9a984", "#b45309"][i],
  }));

  const porCoop = COOPS.map((c) => ({
    coop: c.nombre.split(" ")[0],
    socios: SOCIOS.filter((s) => s.coopId === c.id).length,
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Socios registrados" value={fmtNumber(total)} delta={1.8} icon={<Users className="w-4 h-4" />} />
        <KpiCard label="Mujeres productoras" value={fmtPct((mujeres / Math.max(total, 1)) * 100, 0)} delta={3.2} icon={<UserPlus className="w-4 h-4" />} tone="success" />
        <KpiCard label="Certificados" value={fmtPct((certificados / Math.max(total, 1)) * 100, 0)} delta={5.4} icon={<BadgeCheck className="w-4 h-4" />} tone="success" />
        <KpiCard label="Ingreso anual promedio" value={fmtCurrency(ingresoProm)} delta={7.1} icon={<Sparkles className="w-4 h-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <SectionHeader title="Calificación de crédito" description="Distribución por score" />
          <DonutChart data={scoreData} />
        </Card>
        <Card className="lg:col-span-2">
          <SectionHeader title="Socios por cooperativa" />
          <BarSeries
            xKey="coop"
            data={porCoop}
            series={[{ key: "socios", label: "Socios", color: "#3c6e2c" }]}
          />
        </Card>
      </div>

      <Card>
        <SectionHeader title="Padrón de socios" description={`${fmtNumber(total)} registros`} actions={<button className="btn-ghost text-xs">Exportar CSV</button>} />
        <div className="overflow-x-auto">
          <table className="table-sm w-full">
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Coop.</th><th>Gén.</th><th>Edad</th>
                <th className="text-right">Ha</th><th className="text-right">Rend.</th><th>Score</th>
                <th className="text-right">Ingreso</th><th>Cert.</th>
              </tr>
            </thead>
            <tbody>
              {lista.slice(0, 16).map((s) => (
                <tr key={s.id}>
                  <td className="font-mono text-xs">{s.id}</td>
                  <td className="font-medium">{s.nombre}</td>
                  <td className="text-neutral-500">{COOPS.find((c) => c.id === s.coopId)?.nombre.split(" ")[0]}</td>
                  <td>{s.genero}</td>
                  <td>{s.edad}</td>
                  <td className="text-right">{s.hectareas}</td>
                  <td className="text-right">{s.rendimiento}</td>
                  <td>
                    <span className={`chip ${s.score === "A" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : s.score === "B" ? "bg-agro-50 border-agro-200 text-agro-800" : s.score === "C" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                      {s.score}
                    </span>
                  </td>
                  <td className="text-right">{fmtCurrency(s.ingreso)}</td>
                  <td>{s.certificado ? "✓" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-neutral-500 mt-3">Mostrando 16 de {fmtNumber(total)}</div>
      </Card>
    </div>
  );
}
