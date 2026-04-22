"use client";

import { useMemo } from "react";
import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { LineSeries, BarSeries } from "@/components/charts";
import { preciosReferencia } from "@/lib/mock/series";
import { CONTRATOS_VENTA } from "@/lib/mock/catalogo";
import { fmtCurrency } from "@/lib/utils";
import { Handshake, TrendingUp, Globe, BadgePercent } from "lucide-react";

export default function ComercializacionPage() {
  const precios = useMemo(() => preciosReferencia(), []);
  const canales = [
    { canal: "Ene", exportacion: 420, local: 180, agroindustria: 110 },
    { canal: "Feb", exportacion: 480, local: 160, agroindustria: 120 },
    { canal: "Mar", exportacion: 520, local: 190, agroindustria: 140 },
    { canal: "Abr", exportacion: 560, local: 200, agroindustria: 150 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Ventas YTD" value={fmtCurrency(2840000)} delta={8.3} icon={<TrendingUp className="w-4 h-4" />} tone="success" />
        <KpiCard label="Contratos forward" value="18 activos" hint={fmtCurrency(3960000)} icon={<Handshake className="w-4 h-4" />} />
        <KpiCard label="% Exportación" value="64%" delta={4.0} icon={<Globe className="w-4 h-4" />} />
        <KpiCard label="Premio sobre ref." value="+14.2%" hint="cosecha 2025/26" icon={<BadgePercent className="w-4 h-4" />} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Ventas por canal" description="Últimos 4 meses, miles USD" />
          <BarSeries
            data={canales}
            xKey="canal"
            stacked
            series={[
              { key: "exportacion", label: "Exportación", color: "#3c6e2c" },
              { key: "local", label: "Mercado local", color: "#72a85c" },
              { key: "agroindustria", label: "Agroindustria", color: "#c9a984" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Precio logrado vs. referencia" description="Café SHG ¢/lb" />
          <LineSeries
            xKey="mes"
            data={precios.slice(-12).map((r) => ({ mes: r.mes, referencia: r.cafe, logrado: r.cafe * 1.14 }))}
            series={[
              { key: "logrado", label: "AgroUnión logrado", color: "#3c6e2c" },
              { key: "referencia", label: "Referencia ICE NY", color: "#8b5e3c" },
            ]}
          />
          <p className="text-xs text-neutral-500 mt-2">
            Diferencial atribuible a: consolidación, calidad, certificaciones.
          </p>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Contratos de venta" description="Consolidado del conglomerado" actions={<button className="btn-primary text-xs">+ Nuevo contrato</button>} />
        <table className="table-sm w-full">
          <thead>
            <tr>
              <th>Contraparte</th><th>Producto</th><th>Volumen</th><th>Precio</th><th>Canal</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {CONTRATOS_VENTA.map((c) => (
              <tr key={c.contraparte}>
                <td className="font-medium">{c.contraparte}</td>
                <td>{c.producto}</td>
                <td>{c.volumen}</td>
                <td>{typeof c.precio === "number" ? c.precio.toLocaleString("es-ES") : c.precio}</td>
                <td><span className="chip bg-neutral-50 border-neutral-200 text-neutral-600">{c.canal}</span></td>
                <td><span className="chip bg-agro-50 border-agro-200 text-agro-800">{c.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
