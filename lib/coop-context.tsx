"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { COOPS, type Coop } from "./mock/coops";

type Ctx = {
  selected: string; // "all" | coop.id
  setSelected: (v: string) => void;
  coops: Coop[];
  activeCoops: Coop[];
  isAll: boolean;
};

const CoopContext = createContext<Ctx | null>(null);

export function CoopProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string>("all");
  const value = useMemo<Ctx>(() => {
    const isAll = selected === "all";
    const activeCoops = isAll ? COOPS : COOPS.filter((c) => c.id === selected);
    return { selected, setSelected, coops: COOPS, activeCoops, isAll };
  }, [selected]);
  return <CoopContext.Provider value={value}>{children}</CoopContext.Provider>;
}

export function useCoop() {
  const ctx = useContext(CoopContext);
  if (!ctx) throw new Error("useCoop fuera de CoopProvider");
  return ctx;
}
