// src/app/about/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-gray-900 px-6 py-20">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10"
      >
        About <span className="text-orange-600">FoodFusion</span>
      </motion.h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="max-w-3xl mx-auto text-lg text-gray-600 text-center mb-16"
      >
        FoodFusion is a community-driven platform that brings food lovers
        together. Share your recipes, explore delicious dishes, and connect with
        like-minded people who share your passion for cooking. Whether you’re a
        beginner or a master chef, FoodFusion makes cooking fun and
        collaborative.
      </motion.p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {[
          {
            title: "Share Recipes",
            desc: "Upload your favorite dishes, complete with photos, ingredients, and steps.",
            img: "FoodFusionShare.png",
          },
          {
            title: "Ingredient Search",
            desc: "Find the perfect recipe based on the ingredients you already have at home.",
            img: "FoodFusionIngredient.png",
          },
          {
            title: "Community Connect",
            desc: "Rate, review, and comment on recipes to make cooking a collaborative experience.",
            img: "FoodFusionCommunity.png",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-52 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-2 text-orange-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20"
      >
        <h2 className="text-2xl font-bold mb-4">
          Join FoodFusion Today 🚀
        </h2>
        <p className="text-gray-600 mb-6">
          Start your cooking journey with us. Share, cook, and connect with food
          lovers worldwide.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
