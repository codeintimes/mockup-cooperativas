"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { BarSeries } from "@/components/charts";
import { COMPRAS_CONJUNTAS } from "@/lib/mock/catalogo";
import { fmtCurrency, fmtPct } from "@/lib/utils";
import { ShoppingCart, PiggyBank, Gavel, Package2 } from "lucide-react";

export default function ComprasPage() {
  const ahorroTotal = 420000;
  const vsMercado = COMPRAS_CONJUNTAS.map((c) => ({
    insumo: c.insumo.split(" ").slice(0, 2).join(" "),
    lista: c.precioLista,
    coop: c.precioCoop,
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Ahorro acumulado 2026" value={fmtCurrency(ahorroTotal)} delta={18} hint="vs. compra individual" icon={<PiggyBank className="w-4 h-4" />} tone="success" />
        <KpiCard label="Licitaciones activas" value="3" icon={<Gavel className="w-4 h-4" />} />
        <KpiCard label="Proveedores homologados" value="42" icon={<Package2 className="w-4 h-4" />} />
        <KpiCard label="Descuento promedio" value={fmtPct(18.2)} hint="por volumen" icon={<ShoppingCart className="w-4 h-4" />} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Precios negociados vs. lista" description="USD por unidad o tonelada" />
          <BarSeries
            xKey="insumo"
            data={vsMercado}
            series={[
              { key: "lista", label: "Precio lista", color: "#c9a984" },
              { key: "coop", label: "Precio cooperativo", color: "#3c6e2c" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Próximas licitaciones" />
          <ul className="space-y-3 text-sm">
            <li className="p-3 rounded-lg border border-agro-200 bg-agro-50">
              <div className="font-semibold">Fertilizante NPK 15-15-15</div>
              <div className="text-xs text-neutral-600 mt-1">Cierra 2026-05-02 · 620 t estimadas · 8 ofertas</div>
            </li>
            <li className="p-3 rounded-lg border border-neutral-200">
              <div className="font-semibold">Bioinsumos (Trichoderma + Bacillus)</div>
              <div className="text-xs text-neutral-600 mt-1">Cierra 2026-05-09 · 14 t · 4 ofertas</div>
            </li>
            <li className="p-3 rounded-lg border border-neutral-200">
              <div className="font-semibold">Combustible diésel agroflota</div>
              <div className="text-xs text-neutral-600 mt-1">Cierra 2026-05-15 · 180k gal · 3 ofertas</div>
            </li>
          </ul>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Compras consolidadas" description="Histórico de licitaciones cerradas" />
        <table className="table-sm w-full">
          <thead>
            <tr>
              <th>Insumo</th><th>Proveedor</th><th>Volumen</th><th className="text-right">Precio lista</th><th className="text-right">Precio coop</th><th className="text-right">Ahorro</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {COMPRAS_CONJUNTAS.map((c) => (
              <tr key={c.insumo}>
                <td className="font-medium">{c.insumo}</td>
                <td className="text-neutral-500">{c.proveedor}</td>
                <td>{c.volumen}</td>
                <td className="text-right">{c.precioLista}</td>
                <td className="text-right">{c.precioCoop}</td>
                <td className="text-right font-semibold text-emerald-700">−{fmtPct(c.ahorro)}</td>
                <td><span className="chip bg-agro-50 border-agro-200 text-agro-800">{c.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
