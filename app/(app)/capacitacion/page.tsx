"use client";

import { Card, KpiCard, SectionHeader } from "@/components/kpi";
import { BarSeries } from "@/components/charts";
import { CURSOS } from "@/lib/mock/catalogo";
import { GraduationCap, BookOpen, Award, Users } from "lucide-react";

export default function CapacitacionPage() {
  const data = CURSOS.map((c) => ({
    curso: c.nombre.split(" ").slice(0, 2).join(" "),
    inscritos: c.inscritos,
    completado: Math.round((c.completado / 100) * c.inscritos),
  }));
  const totalIns = CURSOS.reduce((s, c) => s + c.inscritos, 0);
  const prom = Math.round(CURSOS.reduce((s, c) => s + c.completado, 0) / CURSOS.length);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Cursos activos" value={CURSOS.length} icon={<BookOpen className="w-4 h-4" />} />
        <KpiCard label="Inscripciones" value={totalIns} delta={14.0} icon={<Users className="w-4 h-4" />} tone="success" />
        <KpiCard label="Tasa finalización" value={`${prom}%`} delta={5.2} icon={<Award className="w-4 h-4" />} />
        <KpiCard label="Certificados emitidos" value="418" hint="últimos 12m" icon={<GraduationCap className="w-4 h-4" />} tone="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionHeader title="Inscritos vs. completados" description="Por curso activo" />
          <BarSeries
            xKey="curso"
            data={data}
            series={[
              { key: "inscritos", label: "Inscritos", color: "#c9a984" },
              { key: "completado", label: "Completados", color: "#3c6e2c" },
            ]}
          />
        </Card>
        <Card>
          <SectionHeader title="Principio educativo cooperativo" description="5° principio" />
          <p className="text-sm text-neutral-700">
            Las cooperativas proporcionan educación y formación a sus socios, representantes
            elegidos, directivos y empleados. El fondo de educación financia:
          </p>
          <ul className="text-sm mt-3 space-y-1.5">
            <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-agro-700 mt-2" />Capacitación técnica en BPA y calidad</li>
            <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-agro-700 mt-2" />Educación financiera familiar</li>
            <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-agro-700 mt-2" />Formación de líderes juveniles y mujeres</li>
            <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-agro-700 mt-2" />Gobernanza cooperativa</li>
          </ul>
        </Card>
      </div>

      <Card>
        <SectionHeader title="Catálogo de cursos" actions={<button className="btn-primary text-xs">+ Publicar curso</button>} />
        <table className="table-sm w-full">
          <thead>
            <tr><th>Curso</th><th>Categoría</th><th className="text-right">Inscritos</th><th className="text-right">% Completado</th><th>Duración</th></tr>
          </thead>
          <tbody>
            {CURSOS.map((c) => (
              <tr key={c.nombre}>
                <td className="font-medium">{c.nombre}</td>
                <td><span className="chip bg-neutral-50 border-neutral-200 text-neutral-600">{c.categoria}</span></td>
                <td className="text-right">{c.inscritos}</td>
                <td className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full bg-agro-600" style={{ width: `${c.completado}%` }} />
                    </div>
                    <span>{c.completado}%</span>
                  </div>
                </td>
                <td>{c.duracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
