"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/templates"
        );

        const data = await response.json();

        if (response.ok) {
          setTemplates(data.templates || []);
        }
      } catch (error) {
        console.error("Failed to load templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <main className="min-h-screen bg-[#F5EFE3] text-[#4F5B2A]">

      {/* Hero Section */}
      <section className="px-5 pb-16 pt-16 sm:px-8 sm:pt-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#B8892D]">
                AI Poster Studio
              </p>

              <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Create Your Poster
                <span className="block text-[#B8892D]">
                  With Ease
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#4F5B2A]/75 sm:text-lg">
                Create ready-to-print political posters using
                customizable templates, your own information, photos,
                and AI-assisted poster layouts.
              </p>

              <div className="mt-8">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center rounded-xl bg-[#4F5B2A] px-7 py-3.5 text-sm font-bold text-[#F5EFE3] shadow-sm transition hover:bg-[#B8892D]"
                >
                  Create Poster
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-[#D8C9A8] bg-white p-4 shadow-lg sm:p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#D8C9A8]/30">
                  <Image
                    src="/images/hero.png"
                    alt="AI Poster Studio preview"
                    fill
                    priority
                    className="object-contain p-3 sm:p-5"
                  />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-[#D8C9A8] bg-white px-4 py-3 shadow-md sm:block">
                <p className="text-xs text-gray-500">
                  Available templates
                </p>

                <p className="text-lg font-bold text-[#4F5B2A]">
                  {templates.length}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="border-y border-[#D8C9A8]/70 bg-white/50 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B8892D]">
              Features
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4F5B2A]">
              Everything You Need to Create
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4F5B2A]/70 sm:text-base">
              A simple workflow for preparing posters with templates,
              personal information, images, and AI-assisted layouts.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-[#D8C9A8] bg-[#F5EFE3] p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F5B2A] text-[#F5EFE3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 8h8M8 12h5"
                  />
                </svg>
              </div>

              <h3 className="font-serif text-lg font-bold">
                Ready Templates
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#4F5B2A]/70">
                Choose from predefined poster layouts designed for
                different occasions and formats.
              </p>
            </div>
            <div className="rounded-2xl border border-[#D8C9A8] bg-[#F5EFE3] p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#B8892D] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18M3 12h18"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5l14 14M19 5L5 19"
                  />
                </svg>
              </div>

              <h3 className="font-serif text-lg font-bold">
                Add Your Photos
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#4F5B2A]/70">
                Upload photos according to the selected template's
                available photo slots.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8C9A8] bg-[#F5EFE3] p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F5B2A] text-[#F5EFE3]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.259 8.715L18 9.75l-.259-1.035a2.25 2.25 0 00-1.632-1.632L15.075 6.75l1.034-.259a2.25 2.25 0 001.632-1.632L18 3.825l.259 1.034a2.25 2.25 0 001.632 1.632l1.034.259-1.034.259a2.25 2.25 0 00-1.632 1.706z"
                  />
                </svg>
              </div>

              <h3 className="font-serif text-lg font-bold">
                AI-Assisted Layouts
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#4F5B2A]/70">
                Generate poster layouts with AI-assisted design
                configuration based on your provided content.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D8C9A8] bg-[#F5EFE3] p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#B8892D] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v18m9-9H3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </div>

              <h3 className="font-serif text-lg font-bold">
                Print-Ready Output
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#4F5B2A]/70">
                Preview your generated poster and access the final
                image for use or printing.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B8892D]">
              Templates
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-[#4F5B2A]">
              Explore Available Designs
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4F5B2A]/70 sm:text-base">
              Choose a design that fits your poster and start creating.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#D8C9A8] bg-white p-6 shadow-sm"
                >
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#D8C9A8]/40" />
                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-[#D8C9A8]/40" />
                  <div className="mt-8 h-10 w-full animate-pulse rounded-xl bg-[#D8C9A8]/40" />
                </div>
              ))}
            </div>
          ) : templates.length === 0 ? (
            <div className="rounded-2xl border border-[#D8C9A8] bg-white p-10 text-center">
              <p className="text-sm text-[#4F5B2A]/70">
                No templates are currently available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <div
                  key={template._id}
                  className="group rounded-2xl border border-[#D8C9A8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B8892D]/60 hover:shadow-lg"
                >
                  {/* Template Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#B8892D]">
                        {template.occasionType}
                      </p>

                      <h3 className="mt-2 font-serif text-xl font-bold text-[#4F5B2A]">
                        {template.title}
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EFE3] text-[#4F5B2A]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                      </svg>
                    </div>
                  </div>

                  {/* Template Details */}
                  <div className="mt-6 rounded-xl bg-[#F5EFE3]/70 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#4F5B2A]/65">
                        Photo slots
                      </span>

                      <span className="font-semibold text-[#4F5B2A]">
                        {template.layoutConfig.photoSlots}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-[#4F5B2A]/65">
                        Layout
                      </span>

                      <span className="capitalize font-semibold text-[#4F5B2A]">
                        {template.layoutConfig.photoArrangement.replace(
                          /-/g,
                          " "
                        )}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-[#4F5B2A]/65">
                        Theme
                      </span>

                      <span className="capitalize font-semibold text-[#4F5B2A]">
                        {template.layoutConfig.theme.replace(/-/g, " ")}
                      </span>
                    </div>
                  </div>

                  {/* Use Template Button */}
                  <Link
                    href={`/create?templateId=${template._id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4F5B2A] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#3F481F] active:scale-[0.98]"
                  >
                    Use This Template

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-[#4F5B2A] px-6 py-12 text-center text-[#F5EFE3] sm:px-10">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D8C9A8]">
              Get Started
            </p>

            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
              Ready to create your poster?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#F5EFE3]/75 sm:text-base">
              Choose a template, provide your information and
              generate your poster from one simple workspace.
            </p>

            <Link
              href="/create"
              className="mt-7 inline-flex items-center rounded-xl bg-[#F5EFE3] px-7 py-3.5 text-sm font-bold text-[#4F5B2A] transition hover:bg-[#D8C9A8]"
            >
              Create Poster
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}