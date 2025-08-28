"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";

const RecipesPage = () => {
  
  const [userID, setuserID] = useState(null);
  const [token, settoken] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const {isLoggedin} = useAuth();
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      settoken(t);
      const decoded = jwtDecode(t);
      console.log(decoded); 
      setuserID(decoded.id);
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await api.get("/receipies"); // backend route
      if (res.data.success) setRecipes(res.data.allreceipes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (selectedCategory) => {
    if (!selectedCategory) {
      fetchRecipes(); // if no category selected, show all
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/filtercategory?category=${selectedCategory}`);
      if (res.data.success) {
        setRecipes(res.data.recipes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    fetchByCategory(category);
  }, [category]);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      (recipe.ingredients || []).some((ing) =>
        ing.toLowerCase().includes(search.toLowerCase())
      )
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const deletehandler = async (id) => {
    try {
      const res = await api.delete(`/deletereceipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      } else {
        console.error(res.data.message);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting recipe");
    }
  };


  const addtofavourites = async (id) => {
    try {
      const res = await api.put(
        `/addtofavourities/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setFavouriteIds((prev) => [...prev, id]);
        alert("successfully added to favorites");
      }
    } catch (err) {
      console.log(err);
      alert("Error adding to favorites");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* Search bar */}
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by ingredient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white text-gray-700 
             focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 
             hover:border-purple-300 transition-all duration-200 cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
          </select>

        </div>


        {/* Recipes grid */}
        <div className="grid grid-cols-1 mb-5 rounded-full sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
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
              <p className="text-gray-600 mb-2">Category: {recipe.category}</p>
              
              <div className="flex flex-wrap gap-2 items-center">

                <Link href={`/recipes/${recipe._id}`}>
                  <button className="px-4 py-2 bg-purple-200 rounded hover:bg-purple-300 transition">
                    View More
                  </button>
                </Link>
                
                {isLoggedin && (
                  <button
                    onClick={()=> addtofavourites(recipe._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    disabled= {favouriteIds.includes(recipe._id)} 
                  >
                    { favouriteIds.includes(recipe._id) ? "Added" : "Add to favourite"}
                  </button>
                )}
                
                {recipe.createdBy._id === userID && (
                  <>
                    <button
                      onClick={() => deletehandler(recipe._id)}
                      className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition `}
                    >
                      Delete
                    </button>

                    <Link href={`/update/${recipe._id}`}>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        update Recipe
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

export default RecipesPage;
