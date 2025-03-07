"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_LOGIN = process.env.NEXT_PUBLIC_API_URL + "user/login"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      console.log("Response text:", text);

      try {
        const data = JSON.parse(text);
        if (!response.ok) {
          setError(data.message || "Error login res");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          router.push("/");
        }
      } catch (err: any) {
        setError(err.message);
        console.error("JSON Parsing Error:", err);
      }
    } catch (error) {
      setError("invalid connection server");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/hotel-luxury-mobile.jpg')] md:bg-[url('/hotel-luxury.jpg')]">
      <form
        onSubmit={handleSubmit}
        className="bg-black/55 backdrop-blur-sm p-10 rounded-xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">
          Welcome Back
        </h2>
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
        {error && <p className="text-red-500 my-2">{error}</p>}
        <button
          type="submit"
          className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
