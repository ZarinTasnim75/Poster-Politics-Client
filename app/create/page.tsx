"use client";

import { useSearchParams } from "next/navigation";

export default function CreatePosterPage() {
  const searchParams = useSearchParams();

  const templateId = searchParams.get("templateId");

  return (
    <main className="min-h-screen bg-[#F5EFE3] px-4 py-8 text-[#4F5B2A] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#4F5B2A] sm:text-4xl">
            Create Your Poster
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4F5B2A]/80 sm:text-base">
            Provide your poster information, add photos, and generate a
            ready-to-use political poster.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#D8C9A8] bg-white/80 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B8892D]">
                Selected Template
              </p>

              <p className="mt-1 break-all text-sm font-medium text-[#4F5B2A]">
                {templateId || "No template selected"}
              </p>
            </div>

            <div className="rounded-full border border-[#D8C9A8] bg-[#D8C9A8]/30 px-4 py-1.5 text-xs font-semibold text-[#4F5B2A]">
              Template Selected
            </div>
          </div>
        </div>


        <form className="rounded-3xl border border-[#D8C9A8] bg-white p-5 shadow-sm sm:p-8">

          <div className="mb-8">
            <div className="mb-5">
              <h2 className="font-serif text-xl font-bold text-[#4F5B2A]">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-[#4F5B2A]/70">
                Enter the information that will appear on the poster.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
                />
              </div>
              <div>
                <label
                  htmlFor="designation"
                  className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
                >
                  Designation
                </label>

                <input
                  id="designation"
                  type="text"
                  name="designation"
                  placeholder="e.g. Committee Member"
                  className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="party"
                  className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
                >
                  Party / Organization
                </label>

                <input
                  id="party"
                  type="text"
                  name="party"
                  placeholder="Enter organization name"
                  className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
                >
                  Union / Thana / District
                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 border-t border-[#D8C9A8]/60 pt-8">
            <div className="mb-5">
              <h2 className="font-serif text-xl font-bold text-[#4F5B2A]">
                Poster Information
              </h2>

              <p className="mt-1 text-sm text-[#4F5B2A]/70">
                Choose the occasion and enter the main poster message.
              </p>
            </div>

            <div className="grid gap-5">

              <div>
                <label
                  htmlFor="occasion"
                  className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
                >
                  Occasion
                </label>

                <select
                  id="occasion"
                  name="occasion"
                  defaultValue=""
                  className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
                >
                  <option value="" disabled>
                    Select an occasion
                  </option>
                  <option value="victory-day">Victory Day</option>
                  <option value="condolence">
                    Condolence & Tribute
                  </option>
                  <option value="campaign">Publicity</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="headline"
                  className="mb-2 block text-sm font-semibold text-[#4F5B2A]"
                >
                  Bangla Headline
                </label>

                <textarea
                  id="headline"
                  name="headline"
                  rows={5}
                  placeholder="Write the main Bangla headline for your poster..."
                  className="w-full resize-none rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition placeholder:text-[#4F5B2A]/40 focus:border-[#B8892D] focus:bg-white focus:ring-4 focus:ring-[#B8892D]/15"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 border-t border-[#D8C9A8]/60 pt-8">
            <div className="mb-5">
              <h2 className="font-serif text-xl font-bold text-[#4F5B2A]">
                Add Photos
              </h2>

              <p className="mt-1 text-sm text-[#4F5B2A]/70">
                Upload up to 3 photos. JPG, PNG, and WEBP are supported.
              </p>
            </div>

            <label
              htmlFor="photos"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8C9A8] bg-[#F5EFE3]/50 px-5 py-10 text-center transition hover:border-[#B8892D] hover:bg-[#D8C9A8]/20"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D8C9A8] bg-white text-2xl shadow-sm text-[#4F5B2A]">
                📷
              </div>

              <p className="text-sm font-semibold text-[#4F5B2A]">
                Click to upload photos
              </p>

              <p className="mt-1 text-xs text-[#4F5B2A]/70">
                Maximum 3 photos · 5 MB each
              </p>

              <span className="mt-4 rounded-lg bg-[#4F5B2A] px-4 py-2 text-xs font-semibold text-[#F5EFE3] transition hover:bg-[#B8892D]">
                Choose Photos
              </span>

              <input
                id="photos"
                type="file"
                name="photos"
                accept="image/*"
                multiple
                className="hidden"
              />
            </label>
          </div>

          <div className="border-t border-[#D8C9A8]/60 pt-6">
            <button
              type="submit"
              className="w-full rounded-xl bg-[#4F5B2A] px-6 py-3.5 text-sm font-bold text-[#F5EFE3] shadow-md transition hover:bg-[#B8892D] hover:shadow-lg active:scale-[0.99] sm:text-base"
            >
              Generate Poster
            </button>

            <p className="mt-3 text-center text-xs text-[#4F5B2A]/70">
              Your poster will be generated using the selected template and
              provided information.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}