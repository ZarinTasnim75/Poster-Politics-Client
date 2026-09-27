"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Template {
  _id: string;
  title: string;
  occasionType: string;
  thumbnailUrl: string;
  layoutConfig: {
    photoSlots: number;
    photoArrangement: string;
    headlinePosition: string;
    footerPosition: string;
    theme: string;
  };
}

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/templates`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load templates");
        }

        setTemplates(data.templates);
      } catch (error) {
        console.error(error);
        setError("Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#F5EFE3] p-6 text-[#4F5B2A]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D8C9A8] border-t-[#4F5B2A]" />
        <p className="mt-4 text-sm font-medium">Loading templates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#F5EFE3] p-6">
        <div className="max-w-md rounded-2xl border border-[#D8C9A8] bg-[#F5EFE3]/90 p-6 text-center shadow-sm">
          <p className="font-semibold text-red-700">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-[#4F5B2A] px-4 py-2 text-xs font-semibold text-[#F5EFE3] transition hover:bg-[#B8892D]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#F5EFE3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#D8C9A8]/60 bg-[#D8C9A8]/20 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8892D]" />

            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B8892D]">
              Poster Design Gallery
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#4F5B2A] sm:text-4xl">
            Choose a Template
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#4F5B2A]/80">
            Select a poster template to jumpstart your design project in our
            AI Studio.
          </p>
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <div className="rounded-2xl border border-[#D8C9A8]/60 bg-[#D8C9A8]/10 p-12 text-center">
            <p className="font-medium text-[#4F5B2A]/80">
              No templates available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((template) => (
              <div
                key={template._id}
                className="group flex flex-col rounded-2xl border border-[#D8C9A8]/60 bg-[#F5EFE3]/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#D8C9A8] hover:shadow-md"
              >
                {/* Template Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D8C9A8]/30 text-[#4F5B2A] transition-colors group-hover:bg-[#B8892D]/15 group-hover:text-[#B8892D]">
                  <svg
                    className="h-7 w-7"
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

                {/* Template Info */}
                <div className="mt-5 flex flex-1 flex-col justify-between">
                  <div>
                    {/* Occasion */}
                    <span className="inline-flex rounded-full border border-[#D8C9A8]/60 bg-[#D8C9A8]/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#B8892D]">
                      {template.occasionType}
                    </span>

                    {/* Title */}
                    <h2 className="mt-3 font-serif text-lg font-bold text-[#4F5B2A] transition-colors group-hover:text-[#B8892D]">
                      {template.title}
                    </h2>

                    {/* Template Details */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-[#D8C9A8]/20 px-3 py-2">
                        <span className="text-xs text-[#4F5B2A]/65">
                          Photo Slots
                        </span>

                        <span className="text-xs font-semibold text-[#4F5B2A]">
                          {template.layoutConfig.photoSlots}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-[#D8C9A8]/20 px-3 py-2">
                        <span className="text-xs text-[#4F5B2A]/65">
                          Layout
                        </span>

                        <span className="max-w-[130px] truncate text-xs font-semibold capitalize text-[#4F5B2A]">
                          {template.layoutConfig.photoArrangement.replace(
                            /-/g,
                            " "
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-[#D8C9A8]/20 px-3 py-2">
                        <span className="text-xs text-[#4F5B2A]/65">
                          Theme
                        </span>

                        <span className="max-w-[130px] truncate text-xs font-semibold capitalize text-[#4F5B2A]">
                          {template.layoutConfig.theme.replace(/-/g, " ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() =>
                      router.push(`/create?templateId=${template._id}`)
                    }
                    className="mt-5 w-full rounded-lg bg-[#4F5B2A] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#F5EFE3] shadow-sm transition hover:bg-[#B8892D] active:scale-95"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}