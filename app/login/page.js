"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else alert("Login failed!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required 
          />
          <button type="submit" className="bg-blue-600 p-3 rounded text-white font-semibold hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Dont have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
