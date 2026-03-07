import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchDSpaceItems, DSPACE_BASE } from "@/lib/dspace";
import type { DSpaceItem } from "@/lib/dspace";
import RepositoryClient from "./RepositoryClient";

export const revalidate = 3600; // Revalidate every hour

async function getRecentItems(): Promise<DSpaceItem[]> {
  try {
    const items = await fetchDSpaceItems("1/1");
    // Return the most recent 12 items
    return items.slice(0, 12);
  } catch (error) {
    console.error("Failed to fetch repository items:", error);
    return [];
  }
}

const collections = [
  {
    icon: "📄",
    title: "Past Papers",
    handle: "1/1",
    description: "Undergraduate & postgraduate exam papers",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🎓",
    title: "Undergraduate Papers",
    handle: "1/22",
    description: "All undergraduate past examination papers",
    color: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-100",
  },
  {
    icon: "🏛️",
    title: "Postgraduate Papers",
    handle: "1/21",
    description: "Masters & PhD level past papers",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconBg: "bg-purple-100",
  },
];

export default async function RepositoryPage() {
  const recentItems = await getRecentItems();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Page Header */}
      <section className="gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <span className="badge bg-[#c8a951]/20 text-[#c8a951]">
              Academic Repository
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Resource Repository
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Access academic resources from the Tharaka University digital
            catalog. Powered by{" "}
            <a
              href={DSPACE_BASE}
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

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">
          Browse Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {collections.map((col) => (
            <a
              key={col.handle}
              href={`${DSPACE_BASE}/handle/${col.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-hover border rounded-2xl p-5 flex items-center gap-4 ${col.color}`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${col.iconBg}`}
              >
                {col.icon}
              </div>
              <div>
                <span className="font-bold text-base block">{col.title}</span>
                <span className="text-xs opacity-70">{col.description}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Client-side interactive recent items */}
      <RepositoryClient items={recentItems} />

      <Footer />
    </div>
  );
}
