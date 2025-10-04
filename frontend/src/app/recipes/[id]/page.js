"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

const RecipeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedin } = useAuth();

  useEffect(() => {
    if (!isLoggedin) {
      router.push("/auth/login");
    }
  }, [isLoggedin, router]);

  const fetchRecipe = async () => {
    try {
      if (!token) {
        return;
      }
      const res = await api.get(`/receipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.receipe);
      if (res.data.success) setRecipe(res.data.receipe);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipe) return <></>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 py-10">
      <div className="max-w-6xl mx-auto mt-10 p-4 flex flex-col md:flex-row gap-8">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded shadow">
            <img
              src={recipe.imageurl || ""}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="text-xl">
            <span className="font-semibold">Category: </span>
            {recipe.category}
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>

            <ul className="flex flex-wrap gap-2">
              {recipe.ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Cooking Steps:</h2>
            <p>{recipe.makingsteps}</p>
          </div>

          <button
            className="cursor-pointer mt-4 px-4 py-2 bg-orange-200 rounded hover:bg-purple-300 transition"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
