"use client";

import { ChevronDown, Building2 } from "lucide-react";
import { useState } from "react";
import { useCoop } from "@/lib/coop-context";
import { cn } from "@/lib/utils";

export function CoopSelector() {
  const { selected, setSelected, coops } = useCoop();
  const [open, setOpen] = useState(false);
  const current = selected === "all" ? null : coops.find((c) => c.id === selected);
  const label = current ? current.nombre : "Todo el conglomerado";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white border border-agro-200 text-agro-800 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-agro-50"
      >
        <Building2 className="w-4 h-4" />
        <span className="max-w-[180px] truncate">{label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-40 w-72 card p-1.5">
            <button
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm flex flex-col",
                selected === "all" ? "bg-agro-100 text-agro-800" : "hover:bg-agro-50",
              )}
              onClick={() => { setSelected("all"); setOpen(false); }}
            >
              <span className="font-semibold">Todo el conglomerado</span>
              <span className="text-xs text-neutral-500">Vista consolidada · 6 cooperativas</span>
            </button>
            <div className="my-1 h-px bg-neutral-100" />
            {coops.map((c) => (
              <button
                key={c.id}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between gap-2",
                  selected === c.id ? "bg-agro-100 text-agro-800" : "hover:bg-agro-50",
                )}
                onClick={() => { setSelected(c.id); setOpen(false); }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span>{c.nombre}</span>
                </span>
                <span className="text-xs text-neutral-500">{c.socios} socios</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
