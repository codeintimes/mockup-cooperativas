export type Coop = {
  id: string;
  nombre: string;
  ubicacion: string;
  lat: number;
  lng: number;
  cultivoPrincipal: string;
  socios: number;
  hectareas: number;
  fundada: number;
  color: string;
};

export const COOPS: Coop[] = [
  {
    id: "cafenorte",
    nombre: "Café del Norte",
    ubicacion: "Jinotega, NI",
    lat: 13.09,
    lng: -86.0,
    cultivoPrincipal: "Café arábica",
    socios: 412,
    hectareas: 1820,
    fundada: 1978,
    color: "#3c6e2c",
  },
  {
    id: "cacaosur",
    nombre: "Cacao del Sur",
    ubicacion: "Matagalpa, NI",
    lat: 12.93,
    lng: -85.92,
    cultivoPrincipal: "Cacao fino",
    socios: 286,
    hectareas: 1140,
    fundada: 1995,
    color: "#8b5e3c",
  },
  {
    id: "granosverdes",
    nombre: "Granos Verdes",
    ubicacion: "Estelí, NI",
    lat: 13.09,
    lng: -86.35,
    cultivoPrincipal: "Frijol y maíz",
    socios: 521,
    hectareas: 2450,
    fundada: 1984,
    color: "#508a3c",
  },
  {
    id: "miel-madre",
    nombre: "Miel Madre Tierra",
    ubicacion: "Boaco, NI",
    lat: 12.47,
    lng: -85.66,
    cultivoPrincipal: "Apicultura",
    socios: 138,
    hectareas: 380,
    fundada: 2002,
    color: "#c9a984",
  },
  {
    id: "arrozrio",
    nombre: "Arroz del Río",
    ubicacion: "Sébaco, NI",
    lat: 12.85,
    lng: -86.1,
    cultivoPrincipal: "Arroz",
    socios: 198,
    hectareas: 1630,
    fundada: 1989,
    color: "#72a85c",
  },
  {
    id: "lacteos-coop",
    nombre: "Lácteos Cooperativos",
    ubicacion: "Camoapa, NI",
    lat: 12.38,
    lng: -85.5,
    cultivoPrincipal: "Lácteos",
    socios: 245,
    hectareas: 2100,
    fundada: 1991,
    color: "#2f5724",
  },
];

export const TOTAL_SOCIOS = COOPS.reduce((s, c) => s + c.socios, 0);
export const TOTAL_HECTAREAS = COOPS.reduce((s, c) => s + c.hectareas, 0);
