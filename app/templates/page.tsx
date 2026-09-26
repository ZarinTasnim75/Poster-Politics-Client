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
          "http://localhost:5000/api/templates"
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
        <p className="mt-4 font-medium text-sm">Loading templates...</p>
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
          <p className="mt-2 text-sm text-[#4F5B2A]/80 max-w-2xl">
            Select a poster template to jumpstart your design project in our AI Studio.
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
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#D8C9A8]/60 bg-[#F5EFE3]/60 shadow-sm backdrop-blur-sm transition-all hover:border-[#D8C9A8] hover:shadow-md"
              >
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#D8C9A8]/30">
                  {template.thumbnailUrl ? (
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#4F5B2A]/40">
                      <svg
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Occasion Badge */}
                  <span className="absolute right-3 top-3 rounded-full border border-[#D8C9A8]/60 bg-[#F5EFE3]/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[#4F5B2A] backdrop-blur-sm">
                    {template.occasionType}
                  </span>
                </div>

                {/* Template Info & Action */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#4F5B2A] transition-colors group-hover:text-[#B8892D]">
                      {template.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-[#D8C9A8]/40 px-2.5 py-0.5 text-xs font-medium text-[#4F5B2A]">
                        {template.layoutConfig.photoSlots}{" "}
                        {template.layoutConfig.photoSlots === 1
                          ? "Photo Slot"
                          : "Photo Slots"}
                      </span>
                    </div>
                  </div>

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