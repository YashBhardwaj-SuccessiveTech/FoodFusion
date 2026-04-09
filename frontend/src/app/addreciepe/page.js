"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api"; 
import { useAuth } from "@/context/AuthContext";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    makingsteps: "",
    category: "Veg",
    ingredients: "",
    imageurl: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = useAuth();

  // Update form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert ingredients string into array
    const ingredientsArray = formData.ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);

    try {
      
      const res = await api.post(
        "/addreceipe",
        {
          title: formData.title,
          makingsteps: formData.makingsteps,
          category: formData.category,
          ingredients: ingredientsArray,
          imageurl: formData.imageurl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setMessage("Recipe added successfully!");
        setTimeout(() => router.push("/recipes"), 1000);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("please login to add receipe");
    }
  };

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, imageurl: reader.result }); // ✅ base64 string
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 flex items-start justify-center py-16">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Recipe</h2>
        {message && (
          <p className="text-center text-green-600 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />

          <textarea
            name="makingsteps"
            placeholder="Cooking Steps"
            value={formData.makingsteps}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
          </select>

          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />

          {/* 
          <input
            type="text"
            name="imageurl"
            placeholder="Image URL (optional)"
            value={formData.imageurl}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          /> */}

          <input
            type="file"
            accept="image/*"
            onChange={handlefilechange}
            className="cursor-pointer bold"
          />

          {formData.imageurl && (
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm mb-2">Preview:</p>
              <img
                src={formData.imageurl}
                alt="preview"
                className="w-20 h-20 object-cover mx-auto rounded shadow"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white py-2 rounded"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
