import Link from "next/link";

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    title: string;
    image: string;
    category: string;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
      <img src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
          <p className="text-sm text-gray-500">{recipe.category}</p>
        </div>
        <div className="mt-4">
          <Link
            href={recipe.idMeal.startsWith("admin-")
              ?`/admin/${recipe.idMeal}`
              :`/recipe/${recipe.idMeal}`}
            className="inline-block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  );
}

