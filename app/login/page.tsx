"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: identifier, 
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    router.push("/create");
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to log in. Please try again.";
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5EFE3] px-4 py-12 text-[#4F5B2A]">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
        
          <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#4F5B2A]">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-[#4F5B2A]/70">
            Sign in to create and manage your political posters
          </p>
        </div>

        <div className="rounded-3xl border border-[#D8C9A8] bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
              >
                Email 
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. user@example.com"
                className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#4F5B2A]"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#4F5B2A] px-6 py-3.5 text-sm font-bold text-[#F5EFE3] shadow-md transition hover:bg-[#B8892D] hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="mt-6 border-t border-[#D8C9A8]/60 pt-6 text-center text-xs text-[#4F5B2A]/80">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="font-bold text-[#B8892D] hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}