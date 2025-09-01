"use client"; // interactive component

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();


  return (
    <nav className="flex justify-between items-center p-4 bg-purple-200">
      {/* Brand */}
      <div className="text-2xl font-bold">
        <Link href="/">FoodFusion</Link>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <Link href="/" className="hover:text-purple-700 transition">Home</Link>
        <Link href="/about" className="hover:text-purple-700 transition">About</Link>
        <Link href="/recipes" className="hover:text-purple-700 transition">Recipes</Link>
        {isLoggedin && (
        <Link href="/addreciepe" className="hover:text-purple-700 transition">Contribute</Link>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        {!isLoggedin?<>
          <Link href="/auth/login">
            <button className="px-4 py-1 bg-white rounded shadow hover:bg-purple-100 transition">Login</button>
          </Link>
          <Link href="/auth/register">
            <button className="px-4 py-1 bg-white rounded shadow hover:bg-purple-100 transition">Signup</button>
          </Link>
          </>:(
            <>

            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 bg-white rounded shadow hover:bg-purple-100 transition"
              >
                My Profile
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/favorites"
                        className="block px-4 py-2 hover:bg-purple-100"
                        onClick={() => setOpen(false)}
                      >
                        Favourites
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          // router.replace(router.asPath);
                          router.refresh();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-purple-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
            >
              logout
            </button> */}

          </>
        )}  
      </div>
    </nav>
  );
};

export default Navbar;
