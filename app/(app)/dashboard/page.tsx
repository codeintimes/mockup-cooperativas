"use client";

import { useMemo } from "react";
import { Users, Sprout, Wallet, AlertTriangle, TrendingUp, HandCoins, Sparkles } from "lucide-react";
import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { AreaSeries, BarSeries, DonutChart, LineSeries } from "@/components/charts";
import { useCoop } from "@/lib/coop-context";
import { distribucionCultivos, ingresosMensual, preciosReferencia, produccionMensual } from "@/lib/mock/series";
import { fmtCurrency, fmtNumber } from "@/lib/utils";

export default function DashboardPage() {
  const { activeCoops, isAll, coops } = useCoop();

  const totales = useMemo(() => {
    const socios = activeCoops.reduce((s, c) => s + c.socios, 0);
    const hectareas = activeCoops.reduce((s, c) => s + c.hectareas, 0);
    return { socios, hectareas };
  }, [activeCoops]);

  const produccion = useMemo(() => {
    const full = produccionMensual();
    const ids = activeCoops.map((c) => c.id);
    return full.map((row) => {
      const total = ids.reduce((s, id) => s + (row[id] as number), 0);
      return { mes: row.mes as string, total };
    });
  }, [activeCoops]);

  const ingresos = useMemo(() => ingresosMensual(), []);
  const precios = useMemo(() => preciosReferencia(), []);
  const cultivos = useMemo(() => distribucionCultivos(), []);

  const ingresosYTD = ingresos.slice(-12).reduce((s, r) => s + r.ingresos, 0);
  const costosYTD = ingresos.slice(-12).reduce((s, r) => s + r.costos, 0);
  const excedente = ingresosYTD - costosYTD;

  const rankingCoops = [...coops]
    .map((c) => {
      const rend = produccionMensual().slice(-3).reduce((s, r) => s + (r[c.id] as number), 0);
      return { ...c, rendTrim: rend };
    })
    .sort((a, b) => b.rendTrim - a.rendTrim);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Socios activos"
          value={fmtNumber(totales.socios)}
          delta={2.4}
          hint="vs. trim. anterior"
          icon={<Users className="w-4 h-4" />}
        />
        <KpiCard
          label="Hectáreas gestionadas"
          value={fmtNumber(totales.hectareas)}
          delta={0.8}
          hint="bajo registro"
          icon={<Sprout className="w-4 h-4" />}
          tone="success"
        />
        <KpiCard
          label="Ingresos últimos 12m"
          value={fmtCurrency(ingresosYTD)}
          delta={6.2}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <KpiCard
          label="Excedente consolidado"
          value={fmtCurrency(excedente)}
          delta={4.1}
          hint="neto 12m"
          icon={<HandCoins className="w-4 h-4" />}
          tone="success"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader
            title="Producción consolidada"
            description={isAll ? "Suma mensual de las 6 cooperativas (qq)" : `${activeCoops[0]?.nombre} — producción mensual (qq)`}
          />
          <AreaSeries
            data={produccion}
            xKey="mes"
            series={[{ key: "total", label: "Producción (qq)", color: "#3c6e2c" }]}
          />
        </Card>
        <Card>
          <SectionHeader title="Mix de cultivos" description="Participación del portafolio" />
          <DonutChart data={cultivos} />
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Ingresos vs. costos" description="Estado consolidado mensual" />
          <BarSeries
            data={ingresos.slice(-12)}
            xKey="mes"
            series={[
              { key: "ingresos", label: "Ingresos", color: "#3c6e2c" },
              { key: "costos", label: "Costos", color: "#c9a984" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Precios de referencia" description="Mercado internacional" />
          <LineSeries
            data={precios.slice(-12)}
            xKey="mes"
            series={[
              { key: "cafe", label: "Café (¢/lb)", color: "#3c6e2c" },
              { key: "cacao", label: "Cacao (USD/t ÷10)", color: "#8b5e3c" },
            ]}
          />
          <p className="text-xs text-neutral-500 mt-2">
            Fuente: ICE NY · LIFFE London (simulados)
          </p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Ranking de cooperativas" description="Producción del último trimestre" />
          <table className="table-sm w-full">
            <thead>
              <tr>
                <th>Cooperativa</th>
                <th>Cultivo</th>
                <th className="text-right">Socios</th>
                <th className="text-right">Ha</th>
                <th className="text-right">Producción 3m</th>
              </tr>
            </thead>
            <tbody>
              {rankingCoops.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                      <span className="font-medium">{c.nombre}</span>
                    </span>
                  </td>
                  <td className="text-neutral-500">{c.cultivoPrincipal}</td>
                  <td className="text-right">{fmtNumber(c.socios)}</td>
                  <td className="text-right">{fmtNumber(c.hectareas)}</td>
                  <td className="text-right font-medium">{fmtNumber(c.rendTrim)} qq</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <SectionHeader title="Alertas" description="Atención de la dirección" />
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">3 certificaciones por vencer en 60 días</div>
                <div className="text-xs text-neutral-500">Fairtrade (Café del Norte), Rainforest, SRP Arroz</div>
              </div>
            </li>
            <li className="flex gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Alerta fitosanitaria en Sébaco</div>
                <div className="text-xs text-neutral-500">Plaga activa en arroz — visita técnica urgente</div>
              </div>
            </li>
            <li className="flex gap-2.5">
              <Sparkles className="w-4 h-4 text-agro-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Licitación conjunta de urea cerrada</div>
                <div className="text-xs text-neutral-500">Ahorro estimado 16.5% — $84k vs. compra individual</div>
              </div>
            </li>
            <li className="flex gap-2.5">
              <Wallet className="w-4 h-4 text-agro-600 mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">Asamblea: distribución de excedentes</div>
                <div className="text-xs text-neutral-500">Votación abierta — cierre 30 abr</div>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
