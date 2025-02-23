"use client"
import { useState } from "react";
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("Registering with", email, password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/hotel-luxury-mobile.jpg')] md:bg-[url('/hotel-luxury.jpg')]"
        >
            <form onSubmit={handleSubmit} className="bg-black/55  backdrop-blur-sm p-10 rounded-xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-200">Create an Account</h2>
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
                <button type="submit" className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md transition duration-300">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
