import Link from "next/link";
import { ArrowRight, Sprout, BarChart3, Handshake, ShoppingCart, Leaf, Vote } from "lucide-react";
import { COOPS, TOTAL_HECTAREAS, TOTAL_SOCIOS } from "@/lib/mock/coops";
import { fmtNumber } from "@/lib/utils";

const HIGHLIGHTS = [
  { icon: BarChart3, title: "Inteligencia consolidada", desc: "KPIs en tiempo real de producción, ventas y finanzas de todas las cooperativas base." },
  { icon: Handshake, title: "Poder de venta conjunto", desc: "Contratos forward agregados con compradores internacionales. Mejor precio, menor riesgo." },
  { icon: ShoppingCart, title: "Compras por volumen", desc: "Licitaciones de insumos entre coops con ahorros medidos de 15–22%." },
  { icon: Leaf, title: "Balance social e impacto", desc: "Reporte ESG cooperativo listo para auditoría, incluyendo carbono, género y BPA." },
  { icon: Vote, title: "Gobernanza digital", desc: "Asambleas, actas y votaciones inter-cooperativas con trazabilidad." },
  { icon: Sprout, title: "Asistencia técnica medible", desc: "Adopción de BPA por socio, visitas georreferenciadas y planes de cultivo." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-crema via-agro-50/30 to-crema">
      <header className="px-8 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-agro-600 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-serif text-xl text-agro-800 leading-none">AgroUnión</div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Plataforma cooperativa</div>
          </div>
        </div>
        <Link href="/dashboard" className="btn-primary">
          Entrar a la demo <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-8 pt-10 pb-16">
        <div className="max-w-3xl">
          <div className="chip border-agro-200 bg-agro-50 text-agro-800 mb-5">Mockup de producto · demo navegable</div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] text-agro-900">
            Una sola plataforma para <em className="text-tierra-500">el conglomerado</em> de cooperativas agropecuarias.
          </h1>
          <p className="mt-5 text-lg text-neutral-700 max-w-2xl">
            Dirección ejecutiva con visión cruzada: producción, acopio, ventas, crédito,
            certificaciones, clima e impacto — de {COOPS.length} cooperativas, {fmtNumber(TOTAL_SOCIOS)} socios
            productores y {fmtNumber(TOTAL_HECTAREAS)} hectáreas, en un mismo lugar.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <Link href="/dashboard" className="btn-primary">Explorar el dashboard <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/mapa" className="btn-ghost">Ver mapa del conglomerado</Link>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div key={h.title} className="card p-5">
                <div className="w-10 h-10 rounded-lg bg-agro-100 text-agro-700 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-agro-900">{h.title}</div>
                <div className="text-sm text-neutral-600 mt-1">{h.desc}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 card p-6 bg-agro-800 text-white border-agro-800">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-agro-200">Cooperativas base</div>
              <div className="font-serif text-3xl mt-1">{COOPS.length}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-agro-200">Socios productores</div>
              <div className="font-serif text-3xl mt-1">{fmtNumber(TOTAL_SOCIOS)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-agro-200">Hectáreas bajo gestión</div>
              <div className="font-serif text-3xl mt-1">{fmtNumber(TOTAL_HECTAREAS)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-agro-200">Cultivos principales</div>
              <div className="font-serif text-3xl mt-1">6</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-8 py-8 text-sm text-neutral-500 border-t border-neutral-200/70">
        Mockup de producto · sin datos reales · © AgroUnión demo
      </footer>
    </div>
  );
}
