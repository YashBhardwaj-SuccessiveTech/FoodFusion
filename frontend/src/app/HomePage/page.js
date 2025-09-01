"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const {isLoggedin}= useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-[-5rem] left-[-5rem] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-5rem] right-[-5rem] w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          FoodFusion –{" "}
          <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={["Share 🍲", 2000, "Cook 👩‍🍳", 2000, "Connect 🤝", 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-700 max-w-2xl mb-10"
        >
          Discover, share, and connect through recipes. Upload your own, explore
          others, and cook with the ingredients you already have.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4"
        >
          {/* <Link href={isLoggedin?"/recipes":"/auth/register"}> */}
            <button 
            onClick={()=> router.push(isLoggedin?"/recipes":"/auth/register")}
            className="px-6 py-3 rounded-xl text-lg font-semibold shadow-lg bg-orange-600 text-white hover:bg-orange-700 hover:scale-105 hover:shadow-xl transition-transform">
              Get Started
            </button>
          {/* </Link> */}

          <Link href="/recipes">
            <button className="px-6 py-3 rounded-xl text-lg font-semibold border border-orange-600 text-orange-600 hover:bg-orange-50 hover:scale-105 transition-transform">
              Explore Recipes
            </button>
          </Link>
          
        </motion.div>

        {/* Hero Image */}
        <motion.img
          src="FoodFusion Banner.png"
          alt="Food Banner"
          className="mt-14 rounded-2xl shadow-2xl w-full max-w-4xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-center mb-14"
        >
          Browse by Categories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { name: "Veg", emoji: "🥗", color: "from-green-400 to-emerald-600" },
            { name: "Vegan", emoji: "🌱", color: "from-lime-400 to-green-600" },
            { name: "Non-Veg", emoji: "🌾", color: "from-amber-400 to-orange-600" },
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="relative rounded-2xl shadow-lg bg-white cursor-pointer overflow-hidden group"
            >
              {/* Accent border */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20 group-hover:opacity-30 transition`}
              />
              <div className="relative p-8 text-center">
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <h3 className="font-semibold text-2xl">{cat.name}</h3>
                <p className="text-gray-600 mt-3">
                  Explore delicious {cat.name.toLowerCase()} recipes curated for you.
                </p>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${cat.color}`}
              />
            </motion.div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
