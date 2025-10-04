"use client";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const UpdateReceipe = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token } = useAuth();
  const [loading, setloading] = useState(true);
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [ingredients, setingredients] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [cookingsteps, setcookingsteps] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/receipe/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          const recipe = res.data.receipe;
          settitle(recipe.title);
          setcategory(recipe.category);
          setingredients(recipe.ingredients?.join(", ") || "");
          setimageurl(recipe.imageurl || "");
          setcookingsteps(recipe.makingsteps);
        }
      } catch (error) {
        console.log(error);
        alert("some problem in pre fetching previous data");
      } finally {
        setloading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/updatereceipe/${id}`,
        {
          title,
          category,
          ingredients: ingredients.split(",").map((item) => item.trim()),
          imageurl,
          makingsteps: cookingsteps,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("Recipe updated successfully");
        router.push("/recipes");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Some problem in updating recipe , try again later");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setimageurl(reader.result); // ✅ base64 string
      };
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Update Recipe</h1>
        <form className="space-y-4" onSubmit={handleupdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setingredients(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            placeholder="cooking steps"
            value={cookingsteps}
            onChange={(e) => setcookingsteps(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className="cursor-pointer"
          />
          {/* <input
            type="text"
            placeholder="Image URL"
            value={imageurl}
            onChange={(e) => setimageurl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
          /> */}

          {imageurl && (
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm mb-2">Preview:</p>
              <img
                src={imageurl}
                alt="preview"
                className="w-20 h-20 object-cover mx-auto rounded shadow"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-purple-600 transition"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReceipe;
