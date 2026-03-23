import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grids & Circles",
  description: "Premium Coffee Beans",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
