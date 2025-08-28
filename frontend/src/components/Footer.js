// src/components/Footer.js

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 text-center">
      <p className="mb-4">© 2025 FoodFusion. All rights reserved.</p>
      <div className="flex justify-center gap-6">
        <Link href="#" className="hover:text-white">
          Twitter
        </Link>
        <Link href="#" className="hover:text-white">
          Instagram
        </Link>
        <Link href="#" className="hover:text-white">
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
