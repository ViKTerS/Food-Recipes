"use client";

import { useState } from "react";
import { useMenu } from "../../StoreMeal/menu";
import { Recipe } from "../../type/recipe";

export default function AdminPage() {
  const { addCustomMenu, customMenus } = useMenu();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMenu: Recipe = {
      idMeal: Date.now().toString(),
      strMeal: title,
      strCategory: category,
      strArea: area,
      strInstructions: instructions,
      strMealThumb: image,
    };

    addCustomMenu(newMenu);

    setTitle("");
    setCategory("");
    setArea("");
    setInstructions("");
    setImage("");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        <label className="text-black">Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="text-black">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="text-black">Area</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="text-black">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="text-black">Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="border p-2 rounded"
          rows={5}
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
          เพิ่มเมนู
        </button>
      </form>

      <section className="max-w-xl mx-auto mt-10">
        <h2 className="text-black text-2xl font-bold mb-4">เมนูที่เพิ่มแล้ว</h2>
        {customMenus.length === 0 ? (
          <p className="text-gray-600">ยังไม่มีเมนูที่เพิ่ม</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {customMenus.map((menu) => (
              <li key={menu.idMeal} className="border p-4 rounded bg-white shadow-sm flex gap-4">
                {menu.strMealThumb && (
                  <img
                    src={menu.strMealThumb}
                    alt={menu.strMeal}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-bold text-lg">{menu.strMeal}</h3>
                  <p>Category: {menu.strCategory}</p>
                  <p>Area: {menu.strArea}</p>
                  <p className="text-sm text-gray-600">{menu.strInstructions}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
