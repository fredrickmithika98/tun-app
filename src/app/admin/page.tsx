import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchDSpaceItems, DSPACE_BASE } from "@/lib/dspace";
import AdminClient from "./AdminClient";

export const revalidate = 0; // Always fresh in admin

async function getStats() {
  try {
    const [allPapers, undergrad, postgrad] = await Promise.allSettled([
      fetchDSpaceItems("1/1"),
      fetchDSpaceItems("1/22"),
      fetchDSpaceItems("1/21"),
    ]);

    return {
      all: allPapers.status === "fulfilled" ? allPapers.value : [],
      undergrad: undergrad.status === "fulfilled" ? undergrad.value : [],
      postgrad: postgrad.status === "fulfilled" ? postgrad.value : [],
    };
  } catch {
    return { all: [], undergrad: [], postgrad: [] };
  }
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Header */}
      <section className="gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚙️</span>
            <span className="badge bg-[#c8a951]/20 text-[#c8a951]">
              Admin Panel
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Content Management
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Manage and preview content from the Tharaka University digital
            catalog. All content is sourced from{" "}
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

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h2 className="text-xl font-bold text-[#1a3a6b] mb-4">
          Catalog Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon="📄"
            label="Recent Papers (Feed)"
            value={stats.all.length}
            sub="Latest from all collections"
            color="bg-blue-50 border-blue-200"
          />
          <StatCard
            icon="🎓"
            label="Undergraduate (Feed)"
            value={stats.undergrad.length}
            sub="From handle 1/22"
            color="bg-green-50 border-green-200"
          />
          <StatCard
            icon="🏛️"
            label="Postgraduate (Feed)"
            value={stats.postgrad.length}
            sub="From handle 1/21"
            color="bg-purple-50 border-purple-200"
          />
        </div>

        {/* Quick Links */}
        <h2 className="text-xl font-bold text-[#1a3a6b] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickLink
            href={`${DSPACE_BASE}/handle/1/1`}
            icon="📄"
            label="View Past Papers"
            sub="Browse all papers on DSpace"
          />
          <QuickLink
            href={`${DSPACE_BASE}/xmlui/submit`}
            icon="⬆️"
            label="Upload New Paper"
            sub="Submit to DSpace catalog"
          />
          <QuickLink
            href={`${DSPACE_BASE}/community-list`}
            icon="🗂️"
            label="All Collections"
            sub="Browse communities & collections"
          />
          <QuickLink
            href={`${DSPACE_BASE}/login`}
            icon="🔐"
            label="DSpace Login"
            sub="Admin access to catalog"
          />
        </div>

        {/* How to Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-[#1a3a6b] mb-3">
            📋 How to Upload Papers & Resources
          </h2>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong>Go to the DSpace catalog</strong> at{" "}
                <a
                  href={DSPACE_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a3a6b] underline"
                >
                  catalog.tharaka.ac.ke/xmlui
                </a>{" "}
                and log in with your admin credentials.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong>Navigate to the correct collection</strong> — e.g.
                &ldquo;Undergraduate Past Papers&rdquo; or &ldquo;Post Graduate
                Past Papers&rdquo;.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong>Click &ldquo;Submit a new item&rdquo;</strong> and fill
                in the metadata (title, subject, date, etc.) then upload the PDF
                file.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1a3a6b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                4
              </span>
              <div>
                <strong>The app updates automatically</strong> — the Tharaka
                University App fetches live data from the catalog every hour.
                New papers appear within 60 minutes.
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Live Preview */}
      <AdminClient items={stats.all} />

      <Footer />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  sub: string;
  color: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${color}`}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold text-[#1a3a6b] text-sm">{label}</span>
      </div>
      <div className="text-3xl font-extrabold text-[#1a3a6b]">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{sub}</div>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: string;
  label: string;
  sub: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 card-hover hover:border-[#1a3a6b]/20"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-semibold text-[#1a3a6b] text-sm">{label}</div>
        <div className="text-xs text-gray-400">{sub}</div>
      </div>
    </a>
  );
}
