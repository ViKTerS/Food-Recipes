"use client";

import "./globals.css";
import Navbar from "@/Navbar/page";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/"; // ซ่อนถ้าอยู่หน้าแรก

  return (
    <html lang="th">
      <body>
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}