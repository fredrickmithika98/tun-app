import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchDSpaceItems, DSPACE_BASE } from "@/lib/dspace";
import type { DSpaceItem } from "@/lib/dspace";
import PastPapersClient from "./PastPapersClient";

export const revalidate = 3600; // Revalidate every hour

export interface PapersData {
  all: DSpaceItem[];
  undergrad: DSpaceItem[];
  postgrad: DSpaceItem[];
}

async function getAllPapers(): Promise<PapersData> {
  try {
    const [undergradResult, postgradResult] = await Promise.allSettled([
      fetchDSpaceItems("1/22"), // Undergraduate Past Papers
      fetchDSpaceItems("1/21"), // Postgraduate Past Papers
    ]);

    const undergrad =
      undergradResult.status === "fulfilled" ? undergradResult.value : [];
    const postgrad =
      postgradResult.status === "fulfilled" ? postgradResult.value : [];

    // Merge and deduplicate by handle
    const seen = new Set<string>();
    const all: DSpaceItem[] = [];
    for (const item of [...undergrad, ...postgrad]) {
      if (!seen.has(item.handle)) {
        seen.add(item.handle);
        all.push(item);
      }
    }

    return { all, undergrad, postgrad };
  } catch (error) {
    console.error("Failed to fetch papers:", error);
    return { all: [], undergrad: [], postgrad: [] };
  }
}

export default async function PastPapersPage() {
  const papers = await getAllPapers();

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
          <div className="flex gap-4 mt-4 text-sm text-white/60">
            <span>
              🎓 <strong className="text-white">{papers.undergrad.length}</strong> Undergraduate
            </span>
            <span>
              🏛️ <strong className="text-white">{papers.postgrad.length}</strong> Postgraduate
            </span>
            <span>
              📚 <strong className="text-white">{papers.all.length}</strong> Total
            </span>
          </div>
        </div>
      </section>

      {/* Client-side interactive list */}
      <PastPapersClient papers={papers} />

      <Footer />
    </div>
  );
}
