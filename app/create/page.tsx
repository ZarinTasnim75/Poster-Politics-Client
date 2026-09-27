import { Suspense } from "react";
import CreatePosterPage from "./CreatePosterPage";

export default function CreatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F5EFE3]">
          <div className="text-sm font-medium text-[#4F5B2A]">
            Loading...
          </div>
        </div>
      }
    >
      <CreatePosterPage />
    </Suspense>
  );
}