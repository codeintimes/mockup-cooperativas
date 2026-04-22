"use client";

import { useMemo } from "react";
import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { BarSeries, LineSeries } from "@/components/charts";
import { useCoop } from "@/lib/coop-context";
import { produccionMensual } from "@/lib/mock/series";
import { fmtNumber } from "@/lib/utils";
import { Sprout, Package, Truck, TrendingUp } from "lucide-react";

export default function ProduccionPage() {
  const { coops, activeCoops } = useCoop();
  const prod = useMemo(() => produccionMensual(), []);

  const ids = activeCoops.map((c) => c.id);
  const porMes = prod.map((r) => {
    const row: any = { mes: r.mes };
    for (const c of coops) row[c.id] = r[c.id];
    return row;
  });

  const totalYTD = prod.slice(-12).reduce((s, r) => s + ids.reduce((a, id) => a + (r[id] as number), 0), 0);
  const ultimoMes = prod[prod.length - 1];
  const ultimoTotal = ids.reduce((a, id) => a + (ultimoMes[id] as number), 0);

  const lotes = [
    { id: "LOT-2026-0412", coop: "Café del Norte", cultivo: "Café SHG", peso: "18 t", destino: "Exportación EU", estado: "En tránsito" },
    { id: "LOT-2026-0411", coop: "Cacao del Sur", cultivo: "Cacao fermentado", peso: "12 t", destino: "Nestlé FR", estado: "Listo" },
    { id: "LOT-2026-0410", coop: "Granos Verdes", cultivo: "Frijol rojo", peso: "42 t", destino: "Walmart CA", estado: "En empaque" },
    { id: "LOT-2026-0409", coop: "Arroz del Río", cultivo: "Arroz 80/20", peso: "65 t", destino: "Mercado local", estado: "Entregado" },
    { id: "LOT-2026-0408", coop: "Miel Madre Tierra", cultivo: "Miel multifloral", peso: "3.2 t", destino: "Fairtrade NL", estado: "En tránsito" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Producción últimos 12m" value={`${fmtNumber(totalYTD)} qq`} delta={5.8} icon={<Sprout className="w-4 h-4" />} tone="success" />
        <KpiCard label="Producción último mes" value={`${fmtNumber(ultimoTotal)} qq`} delta={-1.4} icon={<TrendingUp className="w-4 h-4" />} />
        <KpiCard label="Lotes activos" value="37" hint="en acopio / tránsito" icon={<Package className="w-4 h-4" />} />
        <KpiCard label="Entregas semana" value="12" hint="hacia puerto/planta" icon={<Truck className="w-4 h-4" />} tone="warn" />
      </div>

      <Card>
        <SectionHeader title="Producción por cooperativa" description="Apilado mensual (qq), últimos 24 meses" />
        <BarSeries
          xKey="mes"
          data={porMes}
          stacked
          height={300}
          series={coops.map((c) => ({ key: c.id, label: c.nombre, color: c.color }))}
        />
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Rendimiento por cultivo" description="qq/ha promedio móvil" />
          <LineSeries
            xKey="mes"
            data={prod.slice(-12).map((r, i) => ({
              mes: r.mes,
              cafe: 14 + Math.sin(i / 2) * 1.6,
              cacao: 9 + Math.cos(i / 3) * 0.8,
              granos: 18 + Math.sin(i / 1.5) * 1.2,
            }))}
            series={[
              { key: "cafe", label: "Café", color: "#3c6e2c" },
              { key: "cacao", label: "Cacao", color: "#8b5e3c" },
              { key: "granos", label: "Granos", color: "#508a3c" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Trazabilidad de lotes" description="Lote → coop → destino" />
          <table className="table-sm w-full">
            <thead>
              <tr>
                <th>Lote</th><th>Cooperativa</th><th>Cultivo</th><th>Peso</th><th>Destino</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map((l) => (
                <tr key={l.id}>
                  <td className="font-mono text-xs">{l.id}</td>
                  <td>{l.coop}</td>
                  <td>{l.cultivo}</td>
                  <td>{l.peso}</td>
                  <td className="text-neutral-500">{l.destino}</td>
                  <td><span className="chip bg-agro-50 border-agro-200 text-agro-800">{l.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
