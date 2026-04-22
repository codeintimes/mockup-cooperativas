import { COOPS } from "./coops";
import { mulberry32, pick } from "../utils";

const NOMBRES = ["María", "José", "Juan", "Ana", "Pedro", "Luz", "Carlos", "Rosa", "Luis", "Marta", "Elena", "Jorge", "Teresa", "Ramón", "Silvia", "Óscar"];
const APELLIDOS = ["López", "García", "Hernández", "Martínez", "Rodríguez", "Pérez", "Gómez", "Sánchez", "Ramírez", "Mendoza", "Blandón", "Castillo", "Zeledón", "Rivera"];

export type Socio = {
  id: string;
  nombre: string;
  coopId: string;
  genero: "F" | "M";
  edad: number;
  hectareas: number;
  rendimiento: number;
  score: "A" | "B" | "C" | "D";
  ingreso: number;
  certificado: boolean;
};

export function buildSocios(): Socio[] {
  const rnd = mulberry32(101);
  const out: Socio[] = [];
  let id = 1;
  for (const c of COOPS) {
    const n = Math.min(c.socios, 80);
    for (let i = 0; i < n; i++) {
      const g: "F" | "M" = rnd() > 0.58 ? "M" : "F";
      const ha = Math.max(0.5, +(rnd() * 12).toFixed(1));
      const rend = Math.round((0.8 + rnd() * 0.8) * 18);
      out.push({
        id: `S${String(id++).padStart(4, "0")}`,
        nombre: `${pick(NOMBRES, rnd)} ${pick(APELLIDOS, rnd)}`,
        coopId: c.id,
        genero: g,
        edad: 22 + Math.floor(rnd() * 45),
        hectareas: ha,
        rendimiento: rend,
        score: (["A", "A", "B", "B", "C", "D"] as const)[Math.floor(rnd() * 6)],
        ingreso: Math.round(ha * rend * (420 + rnd() * 280)),
        certificado: rnd() > 0.55,
      });
    }
  }
  return out;
}

export const SOCIOS = buildSocios();
