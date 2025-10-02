"use client";
import { useEffect, useState } from "react";

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
        );
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [params.id]);

  if (loading) return <p className="text-center mt-6">กำลังโหลด...</p>;
  if (!recipe) return <p className="text-center mt-6">ไม่พบข้อมูล</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="rounded-lg shadow mb-6"
      />
      <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
      <p className="leading-relaxed whitespace-pre-line">
        {recipe.strInstructions}
      </p>
    </main>
  );
}