"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Templates", href: "/templates" },
  { name: "Create Poster", href: "/create" },
  { name: "History", href: "/history" },
];

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);

    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8C9A8]/60 bg-[#F5EFE3]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          onClick={() => setMenuOpen(false)}
        >
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

          <div>
            <p className="font-serif text-lg font-bold tracking-tight text-[#4F5B2A]">
              Poster Politics
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8892D]" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#B8892D]">
                AI Studio
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-full border border-[#D8C9A8]/50 bg-[#D8C9A8]/20 p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-[#4F5B2A] transition hover:bg-[#F5EFE3] hover:text-[#B8892D] hover:shadow-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#4F5B2A] transition hover:text-[#B8892D]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#4F5B2A] px-5 py-2 text-sm font-semibold text-[#F5EFE3] shadow-sm transition hover:bg-[#B8892D] active:scale-95"
              >
                Get Started
              </Link>
            </>
          ) : (
            /* Logged-in User */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Open profile menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D8C9A8] bg-[#D8C9A8]/40 text-[#4F5B2A] transition hover:border-[#B8892D] hover:bg-[#D8C9A8]/60"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                  />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-[#D8C9A8] bg-[#F5EFE3] shadow-lg">

                  {/* User Info */}
                  <div className="border-b border-[#D8C9A8]/60 px-4 py-3">
                    <p className="truncate text-sm font-bold text-[#4F5B2A]">
                      {user.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#4F5B2A]/60">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-[#4F5B2A] transition hover:bg-[#D8C9A8]/30 hover:text-[#B8892D]"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/history"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-[#4F5B2A] transition hover:bg-[#D8C9A8]/30 hover:text-[#B8892D]"
                  >
                    My History
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full border-t border-[#D8C9A8]/60 px-4 py-3 text-left text-sm font-medium text-red-700 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-[#4F5B2A] transition hover:bg-[#D8C9A8]/30 md:hidden"
        >
          {menuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#D8C9A8]/60 bg-[#F5EFE3] px-4 pb-6 pt-3 md:hidden">
          <div className="flex flex-col gap-1">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#4F5B2A] hover:bg-[#D8C9A8]/30 hover:text-[#B8892D]"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-[#D8C9A8]/50" />

            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-[#4F5B2A] hover:bg-[#D8C9A8]/30"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-[#4F5B2A] px-4 py-2.5 text-center text-sm font-medium text-[#F5EFE3] hover:bg-[#B8892D]"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Mobile User Info */}
                <div className="flex items-center gap-3 rounded-xl bg-[#D8C9A8]/20 px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D8C9A8] bg-[#D8C9A8]/40 text-[#4F5B2A]">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#4F5B2A]">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-[#4F5B2A]/60">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#4F5B2A] hover:bg-[#D8C9A8]/30 hover:text-[#B8892D]"
                >
                  Profile
                </Link>

                <Link
                  href="/history"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#4F5B2A] hover:bg-[#D8C9A8]/30 hover:text-[#B8892D]"
                >
                  My History
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}