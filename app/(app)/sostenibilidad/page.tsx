"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { BarSeries, DonutChart } from "@/components/charts";
import { ESG } from "@/lib/mock/catalogo";
import { fmtCurrency, fmtPct } from "@/lib/utils";
import { Leaf, Users, Droplets, FileDown } from "lucide-react";

export default function SostenibilidadPage() {
  const huella = [
    { coop: "Café", emisiones: 820, secuestro: 340 },
    { coop: "Cacao", emisiones: 520, secuestro: 620 },
    { coop: "Granos", emisiones: 640, secuestro: 180 },
    { coop: "Arroz", emisiones: 980, secuestro: 90 },
    { coop: "Miel", emisiones: 120, secuestro: 220 },
    { coop: "Lácteos", emisiones: 1240, secuestro: 410 },
  ];
  const genero = [
    { cultivo: "Mujeres", valor: ESG.mujeres, color: "#8b5e3c" },
    { cultivo: "Hombres", valor: 100 - ESG.mujeres, color: "#3c6e2c" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Reducción huella CO₂" value={fmtPct(Math.abs(ESG.carbono))} delta={ESG.carbono} hint="vs línea base 2022" icon={<Leaf className="w-4 h-4" />} tone="success" />
        <KpiCard label="Mujeres productoras" value={fmtPct(ESG.mujeres)} delta={3.2} icon={<Users className="w-4 h-4" />} />
        <KpiCard label="Uso de agua" value={fmtPct(Math.abs(ESG.agua))} hint="reducción" icon={<Droplets className="w-4 h-4" />} tone="success" />
        <KpiCard label="Horas capacitación" value={ESG.horas_capacitacion.toLocaleString("es-ES")} delta={22} icon={<Users className="w-4 h-4" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Huella de carbono por cultivo" description="tCO₂eq · emisión vs. secuestro" />
          <BarSeries
            xKey="coop"
            data={huella}
            series={[
              { key: "emisiones", label: "Emisiones", color: "#8b5e3c" },
              { key: "secuestro", label: "Secuestro", color: "#3c6e2c" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Equidad de género" description="Socios productores" />
          <DonutChart data={genero} />
          <div className="text-xs text-neutral-500 mt-2">
            Jóvenes (&lt;30 años): <span className="font-semibold text-agro-800">{ESG.jovenes}%</span>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader
          title="Balance Social Cooperativo 2025"
          description="Principios cooperativos · ODS 2, 5, 8, 12, 13, 15"
          actions={<button className="btn-primary text-xs"><FileDown className="w-3 h-3" /> Descargar PDF</button>}
        />
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-lg border border-agro-100 bg-agro-50/50">
            <div className="text-xs uppercase tracking-wider text-agro-700 font-semibold">Fondo educación</div>
            <div className="font-serif text-2xl text-agro-900 mt-1">{fmtCurrency(ESG.fondos_educacion)}</div>
            <div className="text-xs text-neutral-600 mt-1">5° principio cooperativo</div>
          </div>
          <div className="p-4 rounded-lg border border-agro-100 bg-agro-50/50">
            <div className="text-xs uppercase tracking-wider text-agro-700 font-semibold">Fondo reserva</div>
            <div className="font-serif text-2xl text-agro-900 mt-1">{fmtCurrency(ESG.fondos_reserva)}</div>
            <div className="text-xs text-neutral-600 mt-1">Resiliencia financiera</div>
          </div>
          <div className="p-4 rounded-lg border border-agro-100 bg-agro-50/50">
            <div className="text-xs uppercase tracking-wider text-agro-700 font-semibold">Biodiversidad</div>
            <div className="font-serif text-2xl text-agro-900 mt-1">+{ESG.biodiversidad}%</div>
            <div className="text-xs text-neutral-600 mt-1">Cobertura arbórea en fincas</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
