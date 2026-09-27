"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CreatePosterPage() {
    const searchParams = useSearchParams();
    const templateIdFromUrl = searchParams.get("templateId");
    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        const currentPath = `${window.location.pathname}${window.location.search}`;
        router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
}, [router]);

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

    const [templates, setTemplates] = useState<Template[]>([]);
    const [templateId, setTemplateId] = useState(templateIdFromUrl || "");
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [remainingTrials, setRemainingTrials] = useState(0);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [generatedPosterUrl, setGeneratedPosterUrl] = useState<string>("");

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        party: "",
        location: "",
        occasion: "",
        headline: "",
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load templates");
                }

                setTemplates(data.templates || []);

                // If user came from the Templates page
                if (templateIdFromUrl) {
                    const template = data.templates.find(
                        (item: Template) => item._id === templateIdFromUrl
                    );

                    if (template) {
                        setSelectedTemplate(template);

                        setFormData((prev) => ({
                            ...prev,
                            occasion: template.occasionType,
                        }));

                        setRemainingTrials(template.layoutConfig.photoSlots);
                    }
                }
            } catch (error) {
                console.error("Failed to load templates:", error);
                setError("Failed to load templates");
            }
        };

        fetchTemplates();
    }, [templateIdFromUrl]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !selectedTemplate) return;

        const files = Array.from(e.target.files);
        const maxPhotos = selectedTemplate.layoutConfig.photoSlots;

        if (files.length > maxPhotos) {
            setError(
                `This template supports a maximum of ${maxPhotos} photo(s).`
            );

            setSelectedFiles(files.slice(0, maxPhotos));
            return;
        }

        setError("");
        setSelectedFiles(files);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!templateId) {
            setError("Please select a template.");
            setLoading(false);
            return;
        }

        if (!selectedTemplate) {
            setError("Please select a valid template.");
            setLoading(false);
            return;
        }

        if (remainingTrials <= 0) {
            setError("You have no trials remaining for this template.");
            setLoading(false);
            return;
        }

        if (
            selectedFiles.length >
            selectedTemplate.layoutConfig.photoSlots
        ) {
            setError(
                `This template supports a maximum of ${selectedTemplate.layoutConfig.photoSlots} photo(s).`
            );
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");

            let photoUrls: string[] = [];
            if (selectedFiles.length > 0) {
                const uploadData = new FormData();
                selectedFiles.forEach((file) => uploadData.append("photos", file));

                const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploads`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: uploadData,
                });

                const uploadJson = await uploadRes.json();
                if (uploadJson.urls) {
                    photoUrls = uploadJson.urls;
                }
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    templateId,
                    ...formData,
                    photoUrls,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to generate poster");
            }

            setGeneratedPosterUrl(data.data.generatedImageUrl);

            setRemainingTrials((prev) => Math.max(prev - 1, 0));
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An unexpected error occurred";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F5EFE3] px-4 py-8 text-[#4F5B2A] sm:px-6 lg:px-10">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 text-center">
                    <h1 className="font-serif text-3xl font-bold tracking-tight text-[#4F5B2A] sm:text-4xl">
                        Create Your Poster
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4F5B2A]/80 sm:text-base">
                        Provide your poster information, add photos, and generate a ready-to-use political poster.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-100 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {generatedPosterUrl ? (
                    <div className="rounded-3xl border border-[#D8C9A8] bg-white p-6 text-center shadow-md">
                        <h2 className="mb-4 font-serif text-2xl font-bold text-[#4F5B2A]">
                            Your Poster is Ready!
                        </h2>
                        <div className="mx-auto mb-6 max-w-md overflow-hidden rounded-2xl border border-[#D8C9A8] shadow-lg">
                            <img
                                src={generatedPosterUrl}
                                alt="Generated Poster"
                                className="h-auto w-full"
                            />
                        </div>
                        <div className="flex justify-center gap-4">
                            <a
                                href={generatedPosterUrl}
                                target="_blank"
                                rel="noreferrer"
                                download="poster.png"
                                className="rounded-xl bg-[#4F5B2A] px-6 py-3 text-sm font-bold text-[#F5EFE3] hover:bg-[#B8892D]"
                            >
                                Download Poster
                            </a>
                            <button
                                type="button"
                                onClick={() => setGeneratedPosterUrl("")}
                                className="rounded-xl border border-[#D8C9A8] bg-[#F5EFE3] px-6 py-3 text-sm font-bold text-[#4F5B2A] hover:bg-[#D8C9A8]/40"
                            >
                                Create Another
                            </button>
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-[#D8C9A8] bg-white p-5 shadow-sm sm:p-8"
                    >
                        <div className="mb-8">
                            <div className="mb-5">
                                <h2 className="font-serif text-xl font-bold text-[#4F5B2A]">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#4F5B2A]">
                                        Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter full name"
                                        className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition focus:border-[#B8892D]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#4F5B2A]">
                                        Designation
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Committee Member"
                                        className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition focus:border-[#B8892D]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#4F5B2A]">
                                        Party / Organization
                                    </label>
                                    <select
                                        required
                                        name="party"
                                        value={formData.party}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition focus:border-[#B8892D]"
                                    >
                                        <option value="" disabled>
                                            দল / সংগঠন নির্বাচন করুন
                                        </option>
                                        <option value="বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)">বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)</option>
                                        <option value="বাংলাদেশ ছাত্রদল">বাংলাদেশ ছাত্রদল</option>
                                        <option value="বাংলাদেশ জামায়াতে ইসলামী">বাংলাদেশ জামায়াতে ইসলামী</option>
                                        <option value="বাংলাদেশ ইসলামী ছাত্রশিবির">বাংলাদেশ ইসলামী ছাত্রশিবির</option>
                                        <option value="জাতীয় পার্টি">জাতীয় পার্টি</option>
                                        <option value="অন্যান্য / স্বতন্ত্র">অন্যান্য / স্বতন্ত্র</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#4F5B2A]">
                                        Union / Thana / District
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Enter location"
                                        className="w-full rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition focus:border-[#B8892D]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 border-t border-[#D8C9A8]/60 pt-8">
                            <div className="mb-5">
                                <h2 className="font-serif text-xl font-bold text-[#4F5B2A]">
                                    Poster Information
                                </h2>
                            </div>

                            <div className="grid gap-5">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Template
                                    </label>

                                    <select
                                        value={templateId}
                                        onChange={(e) => {
                                            const selectedId = e.target.value;

                                            setTemplateId(selectedId);

                                            const template = templates.find(
                                                (item) => item._id === selectedId
                                            );

                                            setSelectedTemplate(template || null);

                                            if (template) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    occasion: template.occasionType,
                                                }));

                                                setRemainingTrials(template.layoutConfig.photoSlots);
                                            } else {
                                                setRemainingTrials(0);
                                            }
                                        }}
                                        className="w-full rounded-xl border border-[#D8C9A8] bg-[#FDFBF7] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#4F5B2A] focus:ring-2 focus:ring-[#4F5B2A]/10"
                                    >
                                        <option value="">Select a template</option>

                                        {templates.map((template) => (
                                            <option
                                                key={template._id}
                                                value={template._id}
                                            >
                                                {template.title}
                                            </option>
                                        ))}
                                    </select>

                                    {selectedTemplate && (
                                        <p className="mt-2 text-xs text-gray-500">
                                            {selectedTemplate.layoutConfig.photoSlots} photo slot(s)
                                        </p>
                                    )}
                                    {selectedTemplate && (
                                        <div className="mt-3 rounded-xl bg-[#F5EFE3] px-4 py-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-[#4F5B2A]">
                                                    Remaining trials
                                                </span>

                                                <span className="font-bold text-[#B8892D]">
                                                    {remainingTrials}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#4F5B2A]">
                                        Bangla Headline
                                    </label>
                                    <textarea
                                        required
                                        name="headline"
                                        rows={4}
                                        value={formData.headline}
                                        onChange={handleInputChange}
                                        placeholder="Write the main Bangla headline for your poster..."
                                        className="w-full resize-none rounded-xl border border-[#D8C9A8] bg-[#F5EFE3]/30 px-4 py-3 text-sm text-[#4F5B2A] outline-none transition focus:border-[#B8892D]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 border-t border-[#D8C9A8]/60 pt-8">
                            <label
                                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-8 text-center ${!selectedTemplate || remainingTrials <= 0
                                        ? "cursor-not-allowed border-gray-200 bg-gray-100"
                                        : "cursor-pointer border-[#D8C9A8] bg-[#F5EFE3]/50 hover:border-[#B8892D]"
                                    }`}
                            >
                                <p className="text-sm font-semibold text-[#4F5B2A]">
                                    {selectedFiles.length > 0
                                        ? `${selectedFiles.length} photo(s) selected`
                                        : "Click to upload leader photo(s)"}
                                </p>

                                {selectedTemplate && (
                                    <p className="mt-2 text-xs text-gray-500">
                                        Maximum {selectedTemplate.layoutConfig.photoSlots} photo(s)
                                    </p>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    disabled={!selectedTemplate || remainingTrials <= 0}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="border-t border-[#D8C9A8]/60 pt-6">
                            <button
                                type="submit"
                                disabled={loading || !templateId || remainingTrials <= 0}
                                className="w-full rounded-xl bg-[#4F5B2A] px-6 py-3.5 text-sm font-bold text-[#F5EFE3] shadow-md transition hover:bg-[#B8892D] disabled:opacity-50"
                            >
                                {loading
                                    ? "Generating Poster via AI..."
                                    : remainingTrials <= 0
                                        ? "No Trials Remaining"
                                        : "Generate Poster"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}