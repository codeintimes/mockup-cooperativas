// Catálogos varios para los módulos de menor profundidad.

export const CERTIFICACIONES = [
  { coopId: "cafenorte", cert: "Orgánico USDA", estado: "Vigente", vence: "2026-09-14", nc: 0 },
  { coopId: "cafenorte", cert: "Fairtrade FLO", estado: "Vigente", vence: "2026-11-30", nc: 1 },
  { coopId: "cafenorte", cert: "Rainforest Alliance", estado: "Por renovar", vence: "2026-06-02", nc: 3 },
  { coopId: "cacaosur", cert: "Orgánico UE", estado: "Vigente", vence: "2027-01-20", nc: 0 },
  { coopId: "cacaosur", cert: "Fairtrade FLO", estado: "Vigente", vence: "2026-08-11", nc: 2 },
  { coopId: "granosverdes", cert: "GlobalG.A.P.", estado: "Vigente", vence: "2026-12-01", nc: 1 },
  { coopId: "arrozrio", cert: "SRP Arroz Sostenible", estado: "En auditoría", vence: "2026-05-18", nc: 4 },
  { coopId: "miel-madre", cert: "Orgánico UE", estado: "Vigente", vence: "2027-03-03", nc: 0 },
  { coopId: "lacteos-coop", cert: "HACCP", estado: "Vigente", vence: "2026-10-22", nc: 1 },
];

export const ALERTAS_CLIMA = [
  { zona: "Jinotega alto", tipo: "Lluvia intensa", severidad: "Alta", ventana: "22–25 abr", accion: "Proteger secaderos" },
  { zona: "Matagalpa", tipo: "Vientos fuertes", severidad: "Media", ventana: "23 abr", accion: "Revisar cobertura cacao" },
  { zona: "Estelí", tipo: "Sequía corta", severidad: "Media", ventana: "27 abr – 4 may", accion: "Activar riego suplementario" },
  { zona: "Sébaco", tipo: "Plaga (arroz)", severidad: "Alta", ventana: "en curso", accion: "Monitoreo entomológico" },
  { zona: "Boaco", tipo: "Helada tardía", severidad: "Baja", ventana: "29 abr", accion: "Sin acción requerida" },
];

export const COMPRAS_CONJUNTAS = [
  { insumo: "Urea 46%", proveedor: "FertiCentro", volumen: "820 t", precioLista: 620, precioCoop: 518, ahorro: 16.5, estado: "Cerrada" },
  { insumo: "Fungicida cúprico", proveedor: "AgroVerde", volumen: "14 t", precioLista: 1840, precioCoop: 1480, ahorro: 19.6, estado: "Cerrada" },
  { insumo: "Semilla frijol INTA Rojo", proveedor: "INTA", volumen: "42 t", precioLista: 3200, precioCoop: 2720, ahorro: 15.0, estado: "Activa" },
  { insumo: "Saco yute exportación", proveedor: "Fibras SA", volumen: "120k u", precioLista: 1.8, precioCoop: 1.42, ahorro: 21.1, estado: "Licitación" },
  { insumo: "Empaque cacao orgánico", proveedor: "EcoPack", volumen: "38k u", precioLista: 2.4, precioCoop: 1.95, ahorro: 18.8, estado: "Activa" },
];

export const CONTRATOS_VENTA = [
  { contraparte: "Nestlé Europa", producto: "Cacao fino", volumen: "240 t", precio: 2850, canal: "Exportación", estado: "Forward 2026 Q3" },
  { contraparte: "Starbucks Reserve", producto: "Café SHG SHB", volumen: "180 t", precio: 4.60, canal: "Exportación", estado: "Forward 2026 Q4" },
  { contraparte: "Walmart CA", producto: "Frijol rojo", volumen: "620 t", precio: 1320, canal: "Regional", estado: "Activo" },
  { contraparte: "LaLa", producto: "Leche fluida", volumen: "1.2 Ml", precio: 0.42, canal: "Local", estado: "Activo" },
  { contraparte: "Fairtrade NL", producto: "Miel orgánica", volumen: "80 t", precio: 4200, canal: "Exportación", estado: "Activo" },
];

export const VISITAS_TECNICAS = [
  { tecnico: "Ing. R. Blandón", coopId: "cafenorte", socios: 14, zona: "Pantasma", bpa: 82, proxima: "2026-04-25" },
  { tecnico: "Ing. S. Zeledón", coopId: "cacaosur", socios: 11, zona: "Waslala", bpa: 74, proxima: "2026-04-24" },
  { tecnico: "Ing. M. Rivera", coopId: "granosverdes", socios: 18, zona: "Condega", bpa: 69, proxima: "2026-04-27" },
  { tecnico: "Ing. J. Castillo", coopId: "arrozrio", socios: 9, zona: "Sébaco", bpa: 78, proxima: "2026-04-26" },
  { tecnico: "Ing. L. Mendoza", coopId: "miel-madre", socios: 7, zona: "San Lorenzo", bpa: 88, proxima: "2026-04-28" },
  { tecnico: "Ing. C. Hernández", coopId: "lacteos-coop", socios: 12, zona: "Camoapa", bpa: 71, proxima: "2026-04-29" },
];

export const ASAMBLEAS = [
  { coop: "Conglomerado", tipo: "Asamblea General Extraordinaria", fecha: "2026-05-12", quorum: "—", estado: "Convocada" },
  { coop: "Café del Norte", tipo: "Asamblea Ordinaria Anual", fecha: "2026-04-30", quorum: "82%", estado: "Confirmada" },
  { coop: "Cacao del Sur", tipo: "Consejo de Administración", fecha: "2026-04-24", quorum: "100%", estado: "Confirmada" },
  { coop: "Granos Verdes", tipo: "Comisión de Crédito", fecha: "2026-04-23", quorum: "—", estado: "En curso" },
];

export const VOTACIONES = [
  { titulo: "Aprobación distribución de excedentes 2025", cierre: "2026-04-30", a_favor: 68, en_contra: 9, abstencion: 5 },
  { titulo: "Inversión conjunta en planta de secado (Jinotega)", cierre: "2026-05-05", a_favor: 41, en_contra: 22, abstencion: 11 },
  { titulo: "Adhesión a sello carbono regional", cierre: "2026-05-10", a_favor: 53, en_contra: 7, abstencion: 14 },
];

export const CURSOS = [
  { nombre: "Buenas Prácticas Agrícolas (BPA)", categoria: "Técnico", inscritos: 184, completado: 62, duracion: "12 h" },
  { nombre: "Finanzas personales para productores", categoria: "Educación", inscritos: 240, completado: 48, duracion: "6 h" },
  { nombre: "Liderazgo cooperativo", categoria: "Gobernanza", inscritos: 96, completado: 71, duracion: "10 h" },
  { nombre: "Género y equidad en el campo", categoria: "Educación", inscritos: 132, completado: 58, duracion: "8 h" },
  { nombre: "Catación y calidad de café", categoria: "Técnico", inscritos: 54, completado: 80, duracion: "16 h" },
  { nombre: "Manejo integrado de plagas", categoria: "Técnico", inscritos: 112, completado: 44, duracion: "10 h" },
];

export const SERVICIOS_INTERCOOP = [
  { servicio: "Transporte refrigerado", origen: "Lácteos Cooperativos", disponible: "6 unidades", tarifa: "0.48 USD/km" },
  { servicio: "Secado café", origen: "Café del Norte", disponible: "3 patios", tarifa: "0.12 USD/kg" },
  { servicio: "Laboratorio de suelos", origen: "Granos Verdes", disponible: "200 análisis/mes", tarifa: "18 USD/análisis" },
  { servicio: "Almacén seco certificado", origen: "Arroz del Río", disponible: "1800 m²", tarifa: "0.80 USD/m²/mes" },
  { servicio: "Envasado miel", origen: "Miel Madre Tierra", disponible: "4 t/semana", tarifa: "0.35 USD/kg" },
];

export const ESG = {
  mujeres: 38,
  jovenes: 22,
  carbono: -18, // % reducción vs base
  agua: -9,
  biodiversidad: 12,
  fondos_educacion: 142000,
  fondos_reserva: 310000,
  horas_capacitacion: 8420,
};
