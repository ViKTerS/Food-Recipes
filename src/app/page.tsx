"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainMenuPage() {
  const router = useRouter();
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [staffCode, setStaffCode] = useState("");

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (staffCode === "12345") {
      router.push("/admin");
    } else {
      alert("รหัสพนักงานไม่ถูกต้อง");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6">
        🍲 Recipe Website
      </h1>
      <p className="text-lg text-gray-700 mb-10">
        ยินดีต้อนรับ! เลือกเมนูที่คุณต้องการ
      </p>

      {/* ปุ่มเมนู */}
      <div className="space-y-4 w-full max-w-xs">
        <Link
          href="/Home"
          className="block w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold text-center hover:bg-green-700 transition"
        >
          🍳 ดูสูตรอาหาร
        </Link>

        
        
         <button onClick={() => setShowStaffLogin(!showStaffLogin)}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
        >
          👨‍🍳 สำหรับทีมงาน
         </button>
        
      </div>

      {/* ฟอร์มใส่รหัสพนักงาน */}
      {showStaffLogin && (
        <form
          onSubmit={handleStaffLogin}
          className="mt-6 bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            🔐 เข้าสู่ระบบพนักงาน
          </h2>
          <input
            type="text"
            placeholder="กรอกรหัสพนักงาน"
            value={staffCode}
            onChange={(e) => setStaffCode(e.target.value)}
            className="w-full border border-gray-400 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder:text-gray-500"
          />
          <Link href="/AdminPage">
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            เข้าสู่ระบบ
          </button>
          </Link>
        </form>
      )}
    </main>
  );
}