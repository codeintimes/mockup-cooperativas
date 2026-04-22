"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { AreaSeries } from "@/components/charts";
import { ALERTAS_CLIMA } from "@/lib/mock/catalogo";
import { CloudRain, Sun, Wind, ShieldCheck } from "lucide-react";

export default function ClimaPage() {
  const dias = Array.from({ length: 14 }).map((_, i) => ({
    dia: `D${i + 1}`,
    lluvia: Math.max(0, Math.round(6 + 8 * Math.sin(i / 2) + (i > 8 ? 10 : 0))),
    temp: Math.round(24 + 3 * Math.cos(i / 3)),
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Alertas activas" value={ALERTAS_CLIMA.length} icon={<CloudRain className="w-4 h-4" />} tone="warn" />
        <KpiCard label="Lluvia 14d prev." value="142 mm" hint="3 zonas en exceso" icon={<CloudRain className="w-4 h-4" />} />
        <KpiCard label="Temp. media" value="25.8°C" icon={<Sun className="w-4 h-4" />} />
        <KpiCard label="Pólizas activas" value="512" hint="seguro paramétrico" icon={<ShieldCheck className="w-4 h-4" />} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Pronóstico 14 días" description="Promedio zonas productoras" />
          <AreaSeries
            xKey="dia"
            data={dias}
            series={[
              { key: "lluvia", label: "Lluvia (mm)", color: "#3c6e2c" },
              { key: "temp", label: "Temperatura (°C)", color: "#c9a984" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Alertas emitidas" />
          <ul className="space-y-2.5 text-sm">
            {ALERTAS_CLIMA.map((a) => (
              <li key={a.zona} className="p-3 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{a.zona}</span>
                  <span className={`chip ${a.severidad === "Alta" ? "bg-rose-50 border-rose-200 text-rose-700" : a.severidad === "Media" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-neutral-50 border-neutral-200 text-neutral-600"}`}>
                    {a.severidad}
                  </span>
                </div>
                <div className="text-xs text-neutral-600 mt-1">{a.tipo} · {a.ventana}</div>
                <div className="text-xs text-agro-800 mt-1 font-medium flex items-center gap-1"><Wind className="w-3 h-3" />{a.accion}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Seguro agrícola paramétrico" description="Cobertura por cooperativa" />
        <table className="table-sm w-full">
          <thead>
            <tr><th>Cooperativa</th><th>Cobertura</th><th>Socios</th><th>Prima anual</th><th>Gatillo</th><th>Estado</th></tr>
          </thead>
          <tbody>
            <tr><td className="font-medium">Café del Norte</td><td>Exceso de lluvia cosecha</td><td>180</td><td>$42.500</td><td>&gt;450 mm / 30d</td><td><span className="chip bg-emerald-50 border-emerald-200 text-emerald-700">Activa</span></td></tr>
            <tr><td className="font-medium">Granos Verdes</td><td>Sequía veranera</td><td>240</td><td>$28.900</td><td>NDVI &lt; 0.4</td><td><span className="chip bg-emerald-50 border-emerald-200 text-emerald-700">Activa</span></td></tr>
            <tr><td className="font-medium">Arroz del Río</td><td>Plaga y lluvia</td><td>112</td><td>$34.000</td><td>Monitoreo multi-índice</td><td><span className="chip bg-amber-50 border-amber-200 text-amber-700">Por renovar</span></td></tr>
            <tr><td className="font-medium">Cacao del Sur</td><td>Humedad y hongos</td><td>86</td><td>$19.200</td><td>HR &gt; 88% / 20d</td><td><span className="chip bg-emerald-50 border-emerald-200 text-emerald-700">Activa</span></td></tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
