"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
    role?: string;
}

interface Poster {
    _id: string;
    userId: string;
    templateId?: string;
    formData?: {
        name?: string;
        designation?: string;
        party?: string;
        location?: string;
        headline?: string;
        occasion?: string;
        subline?: string;
    };
    uploadedPhotoUrls?: string[];
    generatedImageUrl?: string;
    status?: string;
    createdAt?: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [posters, setPosters] = useState<Poster[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");
                const storedUser = localStorage.getItem("user");

                if (!token) {
                    setError("Please log in to view your profile.");
                    setLoading(false);
                    return;
                }

                let parsedUser: User | null = null;

                if (storedUser) {
                    try {
                        parsedUser = JSON.parse(storedUser);
                        setUser(parsedUser);
                    } catch {
                        console.error("Invalid user data in localStorage");
                    }
                }

                const userId = parsedUser?._id || parsedUser?.id;

                if (!userId) {
                    setError("User information could not be found.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/posters/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load posters");
                }

                setPosters(data.data || []);
            } catch (error) {
                console.error("Profile loading error:", error);
                setError("Failed to load your profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleDelete = async (posterId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this poster?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please log in again.");
                return;
            }

            setDeletingId(posterId);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/posters/${posterId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete poster");
            }

            setPosters((currentPosters) =>
                currentPosters.filter((poster) => poster._id !== posterId)
            );
        } catch (error) {
            console.error("Delete poster error:", error);
            setError("Failed to delete poster.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleDownload = async (
        imageUrl: string,
        posterId: string
    ) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `poster-${posterId}.png`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);

            window.open(imageUrl, "_blank");
        }
    };

    const completedPosters = posters.filter(
        (poster) => poster.status === "completed"
    );

    const displayName =
        user?.name ||
        posters[0]?.formData?.name ||
        "Poster Creator";

    const initials = displayName
        .split(" ")
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-4rem)] bg-[#F5EFE3] px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="animate-pulse">
                        <div className="h-40 rounded-3xl bg-[#D8C9A8]/40" />

                        <div className="mt-8 h-8 w-48 rounded bg-[#D8C9A8]/40" />

                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-96 rounded-2xl bg-[#D8C9A8]/40"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-[#F5EFE3] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <section className="overflow-hidden rounded-3xl border border-[#D8C9A8]/70 bg-white shadow-sm">
                    <div className="h-20 bg-[#a0b06f]" />

                    <div className="px-6 pb-7 sm:px-8">
                        <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-[#F5EFE3] text-xl font-bold text-[#4F5B2A] shadow-md">
                                    {initials || "U"}
                                </div>

                                <div className="pb-1">
                                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c4904]">
                                        My Profile
                                    </p>

                                    <h1 className="font-serif text-2xl font-bold leading-tight text-[#263016] sm:text-3xl">
                                        {displayName}
                                    </h1>

                                    <p className="mt-1 text-sm text-[#4F5B2A]/65">
                                        {user?.email || "Your Poster Studio account"}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/create"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F5B2A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B8892D] active:scale-[0.98]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>

                                Create Poster
                            </Link>
                        </div>
                    </div>
                </section>

                {error && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-[#D8C9A8]/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]/55">
                                    Total Posters
                                </p>

                                <p className="mt-2 text-3xl font-bold text-[#4F5B2A]">
                                    {posters.length}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5EFE3] text-[#4F5B2A]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 7h8M8 11h8M8 15h5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#D8C9A8]/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]/55">
                                    Completed
                                </p>

                                <p className="mt-2 text-3xl font-bold text-[#4F5B2A]">
                                    {completedPosters.length}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7EFE4] text-[#4F5B2A]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#D8C9A8]/70 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#4F5B2A]/55">
                                    Account
                                </p>

                                <p className="mt-2 text-lg font-bold capitalize text-[#4F5B2A]">
                                    {user?.role || "User"}
                                </p>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5EFE3] text-[#B8892D]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.6}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19a4 4 0 00-8 0m4-8a4 4 0 100-8 4 4 0 000 8zm5 1a3 3 0 010 6"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8892D]">
                                Your Collection
                            </p>

                            <h2 className="mt-1 font-serif text-2xl font-bold text-[#4F5B2A]">
                                My Posters
                            </h2>

                            <p className="mt-1 text-sm text-[#4F5B2A]/65">
                                Your generated posters are saved here.
                            </p>
                        </div>

                        {posters.length > 0 && (
                            <span className="text-sm font-medium text-[#4F5B2A]/60">
                                {posters.length}{" "}
                                {posters.length === 1 ? "poster" : "posters"}
                            </span>
                        )}
                    </div>

                    {posters.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-[#D8C9A8] bg-white/60 px-6 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D8C9A8]/25 text-[#4F5B2A]/60">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 7h8M8 11h8M8 15h5"
                                    />
                                </svg>
                            </div>

                            <h3 className="mt-5 font-serif text-xl font-bold text-[#4F5B2A]">
                                No posters yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#4F5B2A]/65">
                                Create your first poster and it will automatically appear
                                here.
                            </p>

                            <Link
                                href="/create"
                                className="mt-6 inline-flex rounded-xl bg-[#4F5B2A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B8892D]"
                            >
                                Create Your First Poster
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {posters.map((poster) => (
                                <article
                                    key={poster._id}
                                    className="group overflow-hidden rounded-2xl border border-[#D8C9A8]/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#D8C9A8]/20">
                                        {poster.generatedImageUrl ? (
                                            <img
                                                src={poster.generatedImageUrl}
                                                alt={
                                                    poster.formData?.headline ||
                                                    "Generated poster"
                                                }
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-[#4F5B2A]/50">
                                                Poster preview unavailable
                                            </div>
                                        )}

                                        <span
                                            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${poster.status === "completed"
                                                    ? "bg-[#E7EFE4] text-[#4F5B2A]"
                                                    : "bg-[#F5EFE3] text-[#B8892D]"
                                                }`}
                                        >
                                            {poster.status || "saved"}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="line-clamp-2 font-serif text-lg font-bold text-[#4F5B2A]">
                                            {poster.formData?.headline ||
                                                "Untitled Poster"}
                                        </h3>

                                        <div className="mt-3 space-y-1 text-xs text-[#4F5B2A]/60">
                                            {poster.formData?.occasion && (
                                                <p className="capitalize">
                                                    Occasion:{" "}
                                                    {poster.formData.occasion.replace(
                                                        /-/g,
                                                        " "
                                                    )}
                                                </p>
                                            )}

                                            {poster.formData?.name && (
                                                <p>
                                                    Created for: {poster.formData.name}
                                                </p>
                                            )}

                                            {poster.createdAt && (
                                                <p>
                                                    {new Date(
                                                        poster.createdAt
                                                    ).toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-5 grid grid-cols-3 gap-2">
                                            {poster.generatedImageUrl && (
                                                <a
                                                    href={poster.generatedImageUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center rounded-lg border border-[#D8C9A8] px-2 py-2 text-xs font-semibold text-[#4F5B2A] transition hover:bg-[#F5EFE3]"
                                                >
                                                    View
                                                </a>
                                            )}

                                            {poster.generatedImageUrl && (
                                                <button
                                                    onClick={() =>
                                                        handleDownload(
                                                            poster.generatedImageUrl!,
                                                            poster._id
                                                        )
                                                    }
                                                    className="rounded-lg border border-[#D8C9A8] px-2 py-2 text-xs font-semibold text-[#4F5B2A] transition hover:bg-[#F5EFE3]"
                                                >
                                                    Download
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(poster._id)}
                                                disabled={deletingId === poster._id}
                                                className="rounded-lg border border-red-200 px-2 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {deletingId === poster._id
                                                    ? "..."
                                                    : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}