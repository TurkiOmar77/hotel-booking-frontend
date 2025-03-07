"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://hotel-booking-mj9x.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error during registration");
      } else {
        router.push("/login");
      }
    } catch (error) {
      setError("Failed to connect to server");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/hotel-luxury-mobile.jpg')] md:bg-[url('/hotel-luxury.jpg')]">
      <form onSubmit={handleSubmit} className="bg-black/55 backdrop-blur-sm p-10 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Create an Account</h2>
        <input
          type="text"
          placeholder="Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500 my-2">{error}</p>}
        <button
          type="submit"
          className="mb-4 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md transition duration-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Register"}
        </button>
        <Link href={"/login"}>
          <span className="text-green-800 hover:underline  ">login</span>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
