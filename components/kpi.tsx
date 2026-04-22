import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function KpiCard({
  label,
  value,
  delta,
  hint,
  icon,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  delta?: number;
  hint?: string;
  icon?: ReactNode;
  tone?: "default" | "success" | "warn" | "danger";
}) {
  const toneMap = {
    default: "text-agro-700 bg-agro-50",
    success: "text-emerald-700 bg-emerald-50",
    warn: "text-amber-700 bg-amber-50",
    danger: "text-rose-700 bg-rose-50",
  } as const;
  return (
    <div className="kpi">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500">{label}</span>
        {icon && <span className={cn("w-8 h-8 rounded-lg flex items-center justify-center", toneMap[tone])}>{icon}</span>}
      </div>
      <div className="text-2xl font-semibold font-serif text-agro-900 leading-tight">{value}</div>
      <div className="flex items-center gap-2 text-xs">
        {typeof delta === "number" && (
          <span className={cn("inline-flex items-center gap-0.5 font-medium", delta >= 0 ? "text-emerald-700" : "text-rose-700")}>
            {delta >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
        {hint && <span className="text-neutral-500">{hint}</span>}
      </div>
    </div>
  );
}

export function SectionHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="font-serif text-xl text-agro-900">{title}</h2>
        {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card p-5", className)}>{children}</div>;
}
