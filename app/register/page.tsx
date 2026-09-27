"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to register. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5EFE3] px-4 py-12 text-[#4F5B2A]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8C9A8] bg-[#D8C9A8]/40 shadow-sm">
              <svg
                className="h-5 w-5 text-[#4F5B2A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-serif text-xl font-bold text-[#4F5B2A]">
              Poster Politics
            </span>
          </Link>

          <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#4F5B2A]">
            Create an Account
          </h1>
          <p className="mt-1 text-sm text-[#4F5B2A]/70">
            Join to design and export ready-to-print political posters
          </p>
        </div>

        <div className="rounded-3xl border border-[#D8C9A8] bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-[#4F5B2A]"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. মোঃ রফিকুল ইসলাম"
                className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-[#4F5B2A]"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="user@example.com"
                className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-[#4F5B2A]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-semibold text-[#4F5B2A]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#4F5B2A] px-6 py-3.5 text-sm font-bold text-[#F5EFE3] shadow-md transition hover:bg-[#B8892D] hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="mt-6 border-t border-[#D8C9A8]/60 pt-6 text-center text-xs text-[#4F5B2A]/80">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-[#B8892D] hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}