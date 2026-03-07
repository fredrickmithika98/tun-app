import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchDSpaceItems, DSPACE_BASE } from "@/lib/dspace";
import type { DSpaceItem } from "@/lib/dspace";
import PastPapersClient from "./PastPapersClient";

export const revalidate = 3600; // Revalidate every hour

async function getPapers(): Promise<DSpaceItem[]> {
  try {
    // Fetch from the main Past Papers collection (handle 1/1)
    const items = await fetchDSpaceItems("1/1");
    return items;
  } catch (error) {
    console.error("Failed to fetch papers:", error);
    return [];
  }
}

export default async function PastPapersPage() {
  const papers = await getPapers();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Page Header */}
      <section className="gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📄</span>
            <span className="badge bg-[#c8a951]/20 text-[#c8a951]">
              Academic Resources
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Past Papers
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Download past examination papers from the Tharaka University
            catalog. Sourced live from{" "}
            <a
              href={`${DSPACE_BASE}/handle/1/1`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#c8a951] hover:text-[#d4b86a]"
            >
              catalog.tharaka.ac.ke
            </a>
            .
          </p>
        </div>
      </section>

      {/* Client-side interactive list */}
      <PastPapersClient papers={papers} />

      <Footer />
    </div>
  );
}
