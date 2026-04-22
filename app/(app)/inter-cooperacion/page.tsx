"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { SERVICIOS_INTERCOOP } from "@/lib/mock/catalogo";
import { COOPS } from "@/lib/mock/coops";
import { Network, ArrowLeftRight, Truck, Package } from "lucide-react";

export default function InterCoopPage() {
  const flujos = [
    { de: "Arroz del Río", a: "Café del Norte", servicio: "Almacén seco", monto: "$4.800", mes: "Abr" },
    { de: "Lácteos Coop.", a: "Miel Madre Tierra", servicio: "Transporte refrigerado", monto: "$2.100", mes: "Abr" },
    { de: "Granos Verdes", a: "Cacao del Sur", servicio: "Análisis de suelos", monto: "$3.600", mes: "Mar" },
    { de: "Café del Norte", a: "Granos Verdes", servicio: "Secado (contrato)", monto: "$7.200", mes: "Mar" },
    { de: "Miel Madre Tierra", a: "Arroz del Río", servicio: "Envasado pruebas", monto: "$1.400", mes: "Mar" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Servicios compartidos" value={SERVICIOS_INTERCOOP.length} icon={<Network className="w-4 h-4" />} />
        <KpiCard label="Transacciones inter-coop" value="142" delta={18} hint="últimos 90 días" icon={<ArrowLeftRight className="w-4 h-4" />} tone="success" />
        <KpiCard label="Volumen movido" value="$84.200" delta={22.4} icon={<Truck className="w-4 h-4" />} />
        <KpiCard label="Capacidad disponible" value="68%" hint="promedio servicios" icon={<Package className="w-4 h-4" />} />
      </div>

      <Card>
        <SectionHeader title="Catálogo de servicios compartidos" description="6° principio cooperativo: cooperación entre cooperativas" />
        <table className="table-sm w-full">
          <thead>
            <tr><th>Servicio</th><th>Ofrecido por</th><th>Disponibilidad</th><th>Tarifa inter-coop</th><th></th></tr>
          </thead>
          <tbody>
            {SERVICIOS_INTERCOOP.map((s) => (
              <tr key={s.servicio}>
                <td className="font-medium">{s.servicio}</td>
                <td>{s.origen}</td>
                <td className="text-neutral-500">{s.disponible}</td>
                <td className="font-semibold text-agro-800">{s.tarifa}</td>
                <td><button className="btn-ghost text-xs">Solicitar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Últimas transacciones" />
          <table className="table-sm w-full">
            <thead>
              <tr><th>De</th><th>A</th><th>Servicio</th><th className="text-right">Monto</th><th>Mes</th></tr>
            </thead>
            <tbody>
              {flujos.map((f, i) => (
                <tr key={i}>
                  <td className="text-neutral-600">{f.de}</td>
                  <td className="font-medium">{f.a}</td>
                  <td>{f.servicio}</td>
                  <td className="text-right">{f.monto}</td>
                  <td>{f.mes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <SectionHeader title="Directorio de cooperativas" />
          <div className="grid grid-cols-2 gap-2">
            {COOPS.map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-neutral-200 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span className="font-semibold">{c.nombre}</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">{c.ubicacion} · {c.cultivoPrincipal}</div>
                <div className="text-xs text-neutral-500">Desde {c.fundada}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
