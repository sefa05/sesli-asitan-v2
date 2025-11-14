import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Çamlıca Diş Kliniği – Sesli Asistan Paneli",
  description: "Randevu yönetimi ve Vapi sesli asistan entegrasyonu"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}
