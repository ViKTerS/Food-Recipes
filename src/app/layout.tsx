"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { MenuProvider } from "@/StoreMeal/menu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/"; // ซ่อนถ้าอยู่หน้าแรก

  return (
    <html lang="th">
      <body>
      <MenuProvider>
        {!hideNavbar && <Navbar />}
        {children}
      </MenuProvider>
      </body>
    </html>
  );
}