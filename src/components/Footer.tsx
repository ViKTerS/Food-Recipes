import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Food Recipes</h3>
            <p>รวมสูตรอาหารหลากหลายสไตล์ พร้อมวิธีทำที่เข้าใจง่าย</p>
          </div>

          {/* Main Menu */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">เมนูหลัก</h4>
            <ul>            
              <li>
                <Link href="/Home" className="hover:underline">
                  เมนูอาหาร
                </Link>
              </li>             
              <li>
                <Link href="/AboutPage" className="hover:underline">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">ติดตามเรา</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p>© 2025 Food Recipes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;