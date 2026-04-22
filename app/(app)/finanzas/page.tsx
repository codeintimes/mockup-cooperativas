"use client";

import { useMemo } from "react";
import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { AreaSeries, BarSeries } from "@/components/charts";
import { ingresosMensual } from "@/lib/mock/series";
import { COOPS } from "@/lib/mock/coops";
import { fmtCurrency, fmtPct } from "@/lib/utils";
import { Wallet, TrendingUp, AlertCircle, PiggyBank } from "lucide-react";

export default function FinanzasPage() {
  const ingresos = useMemo(() => ingresosMensual(), []);
  const ingresos12 = ingresos.slice(-12);
  const totalIng = ingresos12.reduce((s, r) => s + r.ingresos, 0);
  const totalCos = ingresos12.reduce((s, r) => s + r.costos, 0);

  const cartera = COOPS.map((c) => ({
    coop: c.nombre.split(" ")[0],
    activa: Math.round(c.socios * 480 + Math.random() * 20000),
    mora: +(1.8 + Math.random() * 3.2).toFixed(1),
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Ingresos 12m" value={fmtCurrency(totalIng)} delta={6.2} icon={<TrendingUp className="w-4 h-4" />} tone="success" />
        <KpiCard label="Excedente neto" value={fmtCurrency(totalIng - totalCos)} delta={4.1} icon={<PiggyBank className="w-4 h-4" />} />
        <KpiCard label="Cartera activa" value={fmtCurrency(2140000)} hint="1.862 créditos" icon={<Wallet className="w-4 h-4" />} />
        <KpiCard label="Mora 30d" value={fmtPct(3.2)} delta={-0.4} icon={<AlertCircle className="w-4 h-4" />} tone="warn" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Flujo operativo consolidado" description="Ingresos vs. costos, últimos 12 meses" />
          <AreaSeries
            data={ingresos12}
            xKey="mes"
            series={[
              { key: "ingresos", label: "Ingresos", color: "#3c6e2c" },
              { key: "costos", label: "Costos", color: "#c9a984" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Distribución de excedentes 2025" />
          <ul className="space-y-2.5 text-sm">
            <li className="flex justify-between"><span>Retorno a socios</span><span className="font-semibold">{fmtCurrency(380000)}</span></li>
            <li className="flex justify-between"><span>Reserva legal</span><span className="font-semibold">{fmtCurrency(95000)}</span></li>
            <li className="flex justify-between"><span>Educación cooperativa</span><span className="font-semibold">{fmtCurrency(48000)}</span></li>
            <li className="flex justify-between"><span>Reinversión</span><span className="font-semibold">{fmtCurrency(160000)}</span></li>
            <li className="flex justify-between border-t border-neutral-100 pt-2 mt-2"><span>Total a distribuir</span><span className="font-semibold text-agro-800">{fmtCurrency(683000)}</span></li>
          </ul>
          <button className="btn-primary text-xs w-full mt-4">Ver propuesta de distribución</button>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Cartera de crédito por cooperativa" description="Monto activo (USD) y mora 30d (%)" />
        <BarSeries
          xKey="coop"
          data={cartera}
          series={[
            { key: "activa", label: "Cartera activa", color: "#3c6e2c" },
          ]}
        />
        <div className="grid md:grid-cols-6 gap-2 mt-4">
          {cartera.map((c) => (
            <div key={c.coop} className="p-2.5 rounded-lg border border-neutral-200 text-xs">
              <div className="text-neutral-500">{c.coop}</div>
              <div className="font-semibold text-agro-900">{fmtCurrency(c.activa)}</div>
              <div className={c.mora > 4 ? "text-rose-600" : "text-emerald-700"}>Mora {c.mora}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
