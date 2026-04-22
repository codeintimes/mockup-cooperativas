import { COOPS } from "./coops";
import { mulberry32 } from "../utils";

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export function meses24() {
  const out: string[] = [];
  const now = new Date(2026, 3, 1); // Abril 2026
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push(`${MESES[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`);
  }
  return out;
}

export function produccionMensual() {
  const meses = meses24();
  const rnd = mulberry32(42);
  return meses.map((mes, i) => {
    const row: Record<string, string | number> = { mes };
    for (const c of COOPS) {
      const base = c.hectareas * 0.25;
      const season = 1 + 0.35 * Math.sin((i / 12) * Math.PI * 2 - 0.8);
      const noise = 0.85 + rnd() * 0.3;
      row[c.id] = Math.round(base * season * noise);
    }
    return row;
  });
}

export function ingresosMensual() {
  const meses = meses24();
  const rnd = mulberry32(7);
  return meses.map((mes, i) => {
    const base = 180000 + i * 2800;
    const season = 1 + 0.25 * Math.sin((i / 12) * Math.PI * 2 - 0.5);
    return {
      mes,
      ingresos: Math.round(base * season * (0.92 + rnd() * 0.16)),
      costos: Math.round(base * 0.62 * season * (0.95 + rnd() * 0.1)),
    };
  });
}

export function preciosReferencia() {
  const meses = meses24();
  const rnd = mulberry32(19);
  let cafe = 180;
  let cacao = 2400;
  return meses.map((mes) => {
    cafe += (rnd() - 0.5) * 12;
    cacao += (rnd() - 0.5) * 180;
    return {
      mes,
      cafe: Math.round(cafe * 100) / 100,
      cacao: Math.round(cacao),
    };
  });
}

export function distribucionCultivos() {
  return [
    { cultivo: "Café", valor: 38, color: "#3c6e2c" },
    { cultivo: "Cacao", valor: 18, color: "#8b5e3c" },
    { cultivo: "Granos básicos", valor: 22, color: "#508a3c" },
    { cultivo: "Arroz", valor: 12, color: "#72a85c" },
    { cultivo: "Lácteos", valor: 8, color: "#c9a984" },
    { cultivo: "Miel", valor: 2, color: "#e3b23c" },
  ];
}
