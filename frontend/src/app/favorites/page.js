"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

const FavoritesPage = () => {
  const { token, isLoggedin } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setuserID] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setuserID(decoded.id);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoggedin) {
      router.push("/auth/login");
    }
  }, [isLoggedin, router]);

  const deletehandler = async (id) => {
    try {
      const res = await api.delete(`/deletereceipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setFavorites((prev) => prev.filter((recipe) => recipe._id !== id));
      } else {
        console.error(res.data.message);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting recipe");
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/getfavorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setFavorites(res.data.favorites);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedin) fetchFavorites();
  }, [isLoggedin, token]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (favorites.length === 0)
    return (
      <p className="text-center mt-10">
        You have not added any favorites yet
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto mt-10 px-4">

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 mb-5 rounded-full sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition"
            >
              <img
                src={recipe.imageurl || "/placeholder.jpg"}
                alt={recipe.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm mb-2">
                <strong>Category: </strong> {recipe.category}
              </p>
              <p className="text-sm mb-2">
                <strong>Contributed By: </strong>
                {recipe.createdBy.FirstName + " " + recipe.createdBy.LastName}
              </p>
              <br />

              <div className="flex flex-wrap gap-2 items-center">
                <Link href={`/recipes/${recipe._id}`}>
                  <button className="cursor-pointer px-4 py-2 bg-purple-200 rounded hover:bg-purple-300 transition">
                    View More
                  </button>
                </Link>

                {recipe.createdBy._id === userID && (
                  <>
                    <button
                      onClick={() => deletehandler(recipe._id)}
                      className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>

                    <Link href={`/update/${recipe._id}`}>
                      <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Update Recipe
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
