"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./logout";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="bg-white p-4 mt-5 pb-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-semibold text-green-700 cursor-pointer">My Hotel</span>
        </Link>

      

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-green-700 hover:text-green-800 transition"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden lg:flex space-x-6 ">
          <Link href="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          <Link href="/create" className="text-gray-700 hover:text-green-600 transition">Add New Booking</Link>
        </div>
        <div className="hidden lg:flex"><LogoutButton /></div>

      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t mt-3 py-4 space-y-3 flex flex-col text-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/create" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Add New Post</Link>
          <div className="border-t pt-3">
            <LogoutButton /> 
          </div>
        </div>
      )}
    </nav>
  );
}
