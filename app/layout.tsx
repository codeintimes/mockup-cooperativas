import type { Metadata } from "next";
import "./globals.css";
import { CoopProvider } from "@/lib/coop-context";

export const metadata: Metadata = {
  title: "AgroUnión — Plataforma cooperativa",
  description: "Mockup para conglomerado de cooperativas agropecuarias",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CoopProvider>{children}</CoopProvider>
      </body>
    </html>
  );
}
