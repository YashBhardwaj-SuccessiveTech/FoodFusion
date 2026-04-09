"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", formData);
      if (res.data.success) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 flex items-start justify-center">
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h2>
        {message && (
          <p className={`text-center my-4 p-2 rounded-md ${
            message.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            name="FirstName" 
            placeholder="First Name" 
            value={formData.FirstName} 
            onChange={handleChange} 
            required 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="text" 
            name="LastName" 
            placeholder="Last Name" 
            value={formData.LastName} 
            onChange={handleChange} 
            required 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="!cursor-pointer bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Existing user? </span>
          <Link 
            href="/auth/login" 
            className="text-purple-600 font-semibold hover:text-purple-800 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;