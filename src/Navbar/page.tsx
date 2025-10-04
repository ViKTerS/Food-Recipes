"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* โลโก้ */}
        <Link href="/" className="text-2xl font-bold hover:text-yellow-300 transition">
          🍲 Recipe Website
        </Link>

        {/* เมนู */}
        <div className="space-x-6 hidden md:flex">
          <Link href="/Home" className="hover:text-yellow-300 transition">
            หน้าหลัก
          </Link>
          <Link href="/AboutPage" className="hover:text-yellow-300 transition">
            เกี่ยวกับเรา
          </Link>
          <Link href="/AdminPage" className="hover:text-yellow-300 transition">
            เข้าสู่ระบบทีมงาน
          </Link>
        </div>
      </div>
    </nav>
  );
}