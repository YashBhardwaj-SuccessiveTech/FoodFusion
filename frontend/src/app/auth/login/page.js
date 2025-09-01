"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();
  const {login}= useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", formData);
      if (res.data.success) {
        login(res.data.token);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.back());
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
      {/* card */}
      <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="cursor-pointer bg-purple-200 hover:bg-purple-300 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">New user? </span>
          <Link 
            href="/auth/register" 
            className="text-purple-600 font-semibold hover:text-purple-800 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
