"use client";

import { useState } from "react";
import { useMenu } from "@/StoreMeal/menu"; // ปรับ path ให้ถูก
import { Recipe } from "@/type/recipe";
import Image from "next/image";

interface AdminForm {
  Name: string;
  category: string;
  area: string;
  image: string;
  youtube: string;
  instructions: string;
}

export default function AdminPage() {
  const { addCustomMenu, RemoveCustomMenu, customMenus } = useMenu();

  const [form, setForm] = useState<AdminForm>({
    Name: "",
    category: "",
    area: "",
    image: "",
    youtube: "",
    instructions: "",
  });

  const [ingredients, setIngredients] = useState<{ ingredient: string; measure: string }[]>([]);
  const [newIngredient, setNewIngredient] = useState<{ ingredient: string; measure: string }>({ ingredient: "", measure: "" });
  const [showAddedMenus, setShowAddedMenus] = useState(false);

  const handleAddIngredient = () => {
    if (!newIngredient.ingredient.trim()) return;
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient({ ingredient: "", measure: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMenu: Recipe = {
      idMeal: "admin-" + Date.now().toString(),
      strMeal: form.Name,
      strCategory: form.category,
      strArea: form.area,
      strInstructions: form.instructions,
      strMealThumb: form.image,
      strYoutube: form.youtube,
      ...ingredients.reduce((acc, item, i) => {
        acc[`strIngredient${i + 1}`] = item.ingredient;
        acc[`strMeasure${i + 1}`] = item.measure;
        return acc;
      }, {} as Record<string, string>),
    };

    addCustomMenu(newMenu);
    setForm({ Name: "", category: "", area: "", image: "", youtube: "", instructions: "" });
    setIngredients([]);
    alert("✅ เพิ่มเมนูเรียบร้อยแล้ว!");
    setShowAddedMenus(true);
  };

  // helper function แปลง menu เป็น array ของวัตถุดิบ
  const getIngredients = (menu: Recipe) => {
    const list: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = menu[`strIngredient${i}` as keyof Recipe] as string;
      const measure = menu[`strMeasure${i}` as keyof Recipe] as string;
      if (ing && ing.trim() !== "") list.push({ ingredient: ing, measure: measure || "" });
    }
    return list;
  };

  // helper function สำหรับ render รูป local หรือ URL ภายนอก
  const renderMenuImage = (src: string, alt: string) => {
    if (!src) return null;
    if (src.startsWith("http")) {
      return (
        <Image
          src={form.image || "/placeholder.png"} 
          alt="meal"
          width={400}      
          height={300}     
          className="rounded-lg"
        />
      );
    } else {
      return (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 to-green-100 p-8">
      <div className="w-110 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-9">
        <h1 className="text-xl font-bold text-gray-800 text-center px-4">
          Admin-เพิ่มเมนูอาหาร
        </h1>
      </div>

      {/* ปุ่มสลับ */}
      <div className="flex justify-center mb-8 shadow-md rounded-md overflow-hidden w-full max-w-md mx-auto">
        <button
          onClick={() => setShowAddedMenus(false)}
          className={`flex-1 px-4 py-3 font-medium transition-transform duration-200 
      ${!showAddedMenus
        ? "bg-green-500 text-white shadow-lg hover:scale-105 active:scale-95"
        : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md active:scale-95"}`}
        >
          เพิ่มเมนูใหม่
        </button>
        <button
          onClick={() => setShowAddedMenus(true)}
          className={`flex-1 px-4 py-3 font-medium transition-transform duration-200 
      ${showAddedMenus
        ? "bg-green-500 text-white shadow-lg hover:scale-105 active:scale-95"
        : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 hover:shadow-md active:scale-95"}`}
        >
          ดูเมนูที่เพิ่มแล้ว
        </button>
      </div>

      {/* ฟอร์มเพิ่มเมนู */}
      {!showAddedMenus && (
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6 transition-all duration-300"
        >
          {["Name", "category", "area", "image", "youtube", "instructions"].map((key) => {
            const isTextarea = key.toLowerCase() === "instructions";
            const value = form[key as keyof AdminForm];
            return (
              <div key={key} className="flex flex-col gap-1">
                <label htmlFor={key.toLowerCase()} className="font-medium text-gray-700">{key}</label>
                {isTextarea ? (
                  <textarea
                    id={key.toLowerCase()}
                    placeholder={`Enter ${key}`}
                    value={value}
                    onChange={(e) => setForm({ ...form, [key as keyof AdminForm]: e.target.value })}
                    className="border border-gray-300 p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    rows={4}
                    required
                  />
                ) : (
                  <input
                    id={key.toLowerCase()}
                    type="text"
                    placeholder={`Enter ${key}`}
                    value={value}
                    onChange={(e) => setForm({ ...form, [key as keyof AdminForm]: e.target.value })}
                    className="border border-gray-300 p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    required
                  />
                )}
              </div>
            );
          })}

          {/* วัตถุดิบ */}
          <div className="flex gap-2 items-center">
            <label className="font-medium text-gray-700">Ingredients:</label>
            <input
              placeholder="Ingredient"
              value={newIngredient.ingredient}
              onChange={(e) => setNewIngredient({ ...newIngredient, ingredient: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            <label className="font-medium text-gray-700">Pieces:</label>
            <input
              placeholder="Measure"
              value={newIngredient.measure}
              onChange={(e) => setNewIngredient({ ...newIngredient, measure: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              เพิ่ม
            </button>
          </div>

          {/* แสดงรายการวัตถุดิบ */}
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {ingredients.map((ing, i) => (
              <li key={i}>{ing.measure} {ing.ingredient}</li>
            ))}
          </ul>

          <button 
            type="submit"
            className="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            เพิ่มเมนู
          </button>
        </form>
      )}

      {/* รายการเมนูที่เพิ่ม */}
      {showAddedMenus && (
        <ul className="max-w-3xl mx-auto mt-6 flex flex-col gap-6">
          {customMenus.map(menu => (
            <li
              key={menu.idMeal}
              className="border border-gray-200 p-6 rounded-xl bg-white shadow-md flex flex-col md:flex-row gap-4 items-start transition-transform duration-200 hover:scale-105 hover:shadow-xl"
            >
              {/* รูปเมนู */}
              {menu.strMealThumb && renderMenuImage(menu.strMealThumb, menu.strMeal)}

              {/* ข้อมูลเมนู */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-bold text-2xl text-gray-800">{menu.strMeal}</h3>
                <p className="text-gray-600"><span className="font-medium">Category:</span> {menu.strCategory}</p>
                <p className="text-gray-600"><span className="font-medium">Area:</span> {menu.strArea}</p>
                <p className="text-gray-700 line-clamp-3">{menu.strInstructions}</p>

                <div className="mt-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Ingredients:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {getIngredients(menu).map((ing, i) => (
                      <li key={i}>{ing.measure} {ing.ingredient}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    if (confirm("ต้องการลบเมนูนี้จริงหรือไม่?")) {
                      RemoveCustomMenu(menu.idMeal);
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}