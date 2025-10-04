"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      กลับไปยังหน้าก่อนหน้า
    </button>
  );
}
