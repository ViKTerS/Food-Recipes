"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
     <main className="min-h-screen flex flex-col items-center px-6 py-16 bg-green-50 text-gray-800">
        {/* หัวข้อใหญ่ */}
        <h1 className="text-5xl font-extrabold text-center text-green-700 mb-12">
          เกี่ยวกับเรา
        </h1>

        {/* เกี่ยวกับเว็บไซต์ */}
        <section className="max-w-3xl text-center mb-10 text-lg">
          <p>
            Food Recipes เป็นเว็บไซต์รวมสูตรอาหารหลากหลายสไตล์ พร้อมวิธีทำที่เข้าใจง่าย 
            เหมาะสำหรับทุกคนที่อยากทำอาหารอร่อยที่บ้าน
          </p>
        </section>

        {/* ผู้สร้าง / สมาชิก */}
        <section className="max-w-3xl text-center mb-10">
          <h2 className="text-2xl font-bold mb-4">สร้างโดยนักศึกษาจากมหาวิทยาลัยแม่โจ้</h2>
          <ul className="list-disc list-inside text-left text-gray-700 max-w-md mx-auto space-y-1">
            <li>6704101309 กิตติวงศ์ มีจันทร์</li>
            <li>6704101319 ชินดนัย อยู่เชียร</li>
            <li>6704101322 ณัฐดนัย กองเสาร์</li>
            <li>6704101419 รัชกฤช หิรัญวงศ์</li>
            <li>6704101420 วุฒิโชติ เกียรตินพคุณ</li>
            <li>6704101421 วรพัฒน์ นิวันติ</li>
          </ul>
        </section>

        {/* จุดประสงค์ */}
        <section className="max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">จุดประสงค์</h2>
          <p className="text-gray-700 text-lg">
            เพื่อพัฒนาความสามารถและทดสอบความรู้ของบุคคลในทีม และเป็นแนวทางในการต่อยอดไปสู่โปรแกรมเมอร์ในอนาคต
          </p>
        </section>
      </main>
  );
}