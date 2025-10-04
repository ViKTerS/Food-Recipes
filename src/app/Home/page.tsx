"use client";

import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);


  // โหลดเมนู default ทันทีเมื่อเปิดเว็บ
  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      setLoading(true);
      try {
        // ใช้ category "Seafood" เป็นตัวอย่าง
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
        );
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error("Error fetching default recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultRecipes();
  }, []);

  // ดึง API เมื่อค้นหา
  useEffect(() => {
    if (search.trim() === "") return;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        const data = await res.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [search]);
  


  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-green-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          🍲 Recipe Website
        </h1>
        <p className="text-lg md:text-xl mb-6">
          รวมสูตรอาหารอร่อย ๆ จากทั่วโลก ค้นหาเมนูที่คุณชอบได้เลย
        </p>
        <input
          type ="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 ค้นหาสูตรอาหาร..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </section>

      {/* Recipe List */}
      <section className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🍴 เมนูอาหาร
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">⏳ กำลังโหลด...</p>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recipes.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                recipe={{
                  idMeal: meal.idMeal,
                  title: meal.strMeal,
                  image: meal.strMealThumb,
                  category: meal.strCategory || "" ,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg mt-10">
            😢 ไม่พบเมนูที่ค้นหา
          </p>
        )}
      </section>
    </main>
  );
}