"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Users,
  Sprout,
  Handshake,
  ShoppingCart,
  Wallet,
  HeartPulse,
  BadgeCheck,
  CloudRain,
  Leaf,
  Vote,
  GraduationCap,
  Network,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { group: "General", items: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/mapa", label: "Mapa del conglomerado", icon: Map },
    { href: "/socios", label: "Socios productores", icon: Users },
  ]},
  { group: "Operación", items: [
    { href: "/produccion", label: "Producción y acopio", icon: Sprout },
    { href: "/comercializacion", label: "Comercialización", icon: Handshake },
    { href: "/compras", label: "Compras conjuntas", icon: ShoppingCart },
    { href: "/finanzas", label: "Finanzas consolidadas", icon: Wallet },
  ]},
  { group: "Campo", items: [
    { href: "/asistencia-tecnica", label: "Asistencia técnica", icon: HeartPulse },
    { href: "/certificaciones", label: "Certificaciones", icon: BadgeCheck },
    { href: "/clima", label: "Clima y riesgo", icon: CloudRain },
  ]},
  { group: "Institucional", items: [
    { href: "/sostenibilidad", label: "Sostenibilidad / ESG", icon: Leaf },
    { href: "/gobernanza", label: "Gobernanza", icon: Vote },
    { href: "/capacitacion", label: "Capacitación", icon: GraduationCap },
    { href: "/inter-cooperacion", label: "Inter-cooperación", icon: Network },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-neutral-200/80 bg-white/70 backdrop-blur-sm h-screen sticky top-0 overflow-y-auto">
      <div className="px-5 py-5 border-b border-neutral-200/80">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-agro-600 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg text-agro-800">AgroUnión</div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">Plataforma cooperativa</div>
          </div>
        </Link>
      </div>
      <nav className="px-2 py-3 text-sm">
        {NAV.map((g) => (
          <div key={g.group} className="mb-4">
            <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">{g.group}</div>
            <ul>
              {g.items.map((it) => {
                const Icon = it.icon;
                const active = pathname === it.href;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-lg transition",
                        active ? "bg-agro-100 text-agro-800 font-semibold" : "text-neutral-700 hover:bg-agro-50",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-neutral-200/80 text-xs text-neutral-500">
        v0.1 · Mockup demo
      </div>
    </aside>
  );
}
