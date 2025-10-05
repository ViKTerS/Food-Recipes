import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

async function getRecipeDetail(id: string): Promise<Recipe | null> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('ข้อผิดพลาดในการดึงสูตรอาหาร:', error);
    return null;
  }
}

export default async function RecipeDetail({ params }: { params: { id: string } }) {
  const recipe = await getRecipeDetail(params.id);
  if (!recipe) return notFound(); // ป้องกัน undefined

  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}` as keyof Recipe];
    const measure = recipe[`strMeasure${i}` as keyof Recipe];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing.trim(), measure: measure?.trim() || '' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* เส้นทางนำทาง */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-orange-500 transition-colors">หน้าหลัก</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/recipes" className="hover:text-orange-500 transition-colors">สูตรอาหาร</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-orange-600 font-medium truncate">{recipe.strMeal}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6">
            {/* รูปภาพ */}
            <div className="flex flex-col">
              <div className="relative rounded-xl overflow-hidden shadow-md">
                <Image
                  src={recipe.strMealThumb || "/placeholder.png"} // ป้องกัน undefined
                  alt={recipe.strMeal || "Meal Image"}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                  priority
                />
              </div>

              {/* ปุ่ม YouTube */}
              {recipe.strYoutube && (
                <div className="mt-6 text-center">
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span>ดูวิดีโอสอนทำ</span>
                  </a>
                </div>
              )}
            </div>

            {/* รายละเอียด */}
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {recipe.strMeal}
              </h1>

              {/* วัตถุดิบ */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-orange-200">
                  วัตถุดิบ
                </h2>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <ul className="grid gap-3">
                    {ingredients.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-amber-100 transition-colors">
                        <span className="flex-shrink-0 w-5 h-5 bg-orange-500 rounded-full mt-1 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                        <span className="text-gray-700">
                          {item.measure && <strong className="text-orange-600">{item.measure}</strong>} 
                          {item.measure && ' '}{item.ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* วิธีการทำ */}
          <div className="px-6 pb-8">
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                วิธีการทำ
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
                  {recipe.strInstructions.split('\n').map((paragraph, index) => (
                    paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ปุ่มกลับ */}
        <div className="mt-8 text-center">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            กลับไปยังหน้าสูตรอาหารทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}