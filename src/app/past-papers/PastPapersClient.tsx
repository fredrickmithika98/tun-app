"use client";

import { useState, useMemo } from "react";
import type { DSpaceItem } from "@/lib/dspace";
import { DSPACE_BASE } from "@/lib/dspace";
import type { PapersData } from "./page";

interface Props {
  papers: PapersData;
}

type Tab = "all" | "undergrad" | "postgrad";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "all", label: "All Papers", icon: "📚" },
  { key: "undergrad", label: "Undergraduate", icon: "🎓" },
  { key: "postgrad", label: "Postgraduate", icon: "🏛️" },
];

export default function PastPapersClient({ papers }: Props) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const activeList = useMemo(() => {
    switch (tab) {
      case "undergrad":
        return papers.undergrad;
      case "postgrad":
        return papers.postgrad;
      default:
        return papers.all;
    }
  }, [tab, papers]);

  const filtered = useMemo(() => {
    if (!search.trim()) return activeList;
    const q = search.toLowerCase();
    return activeList.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [activeList, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleTab(t: Tab) {
    setTab(t);
    setPage(1);
    setSearch("");
  }

  const counts: Record<Tab, number> = {
    all: papers.all.length,
    undergrad: papers.undergrad.length,
    postgrad: papers.postgrad.length,
  };

  return (
    <>
      {/* Tabs + Search */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3 items-center justify-between">
          {/* Tabs */}
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => handleTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  tab === t.key
                    ? "bg-[#1a3a6b] text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    tab === t.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {counts[t.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search papers by title or subject..."
            className="text-sm border border-gray-200 rounded-lg px-4 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 w-full sm:w-72"
          />
        </div>
      </section>

      {/* Papers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        {papers.all.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📡</div>
            <h3 className="text-xl font-bold text-[#1a3a6b] mb-2">
              Could not load papers
            </h3>
            <p className="text-gray-500 mb-4">
              Unable to connect to the catalog. Please try again later.
            </p>
            <a
              href={`${DSPACE_BASE}/handle/1/1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1a3a6b] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#0f2244] transition-colors"
            >
              Visit Catalog Directly →
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#1a3a6b] mb-2">
              No papers found
            </h3>
            <p className="text-gray-500">
              Try a different search term or switch tabs.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Showing{" "}
              <strong>
                {(page - 1) * PER_PAGE + 1}–
                {Math.min(page * PER_PAGE, filtered.length)}
              </strong>{" "}
              of <strong>{filtered.length}</strong> papers
              {search && (
                <span className="ml-1">
                  for &ldquo;<em>{search}</em>&rdquo;
                </span>
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginated.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-[#1a3a6b] disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-[#1a3a6b] disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

function PaperCard({ paper }: { paper: DSpaceItem }) {
  const year = paper.date ? new Date(paper.date).getFullYear().toString() : "";

  // Extract course code from title (e.g. "GEOG 221: POPULATION GEOGRAPHY" → "GEOG 221")
  const codeMatch = paper.title.match(/^([A-Z]{2,6}\s*\d{3,4}[A-Z]?)/);
  const code = codeMatch ? codeMatch[1] : "";
  const subject = code
    ? paper.title.replace(code, "").replace(/^[:\s-]+/, "").trim()
    : paper.title;

  const itemUrl = `${DSPACE_BASE}/handle/${paper.handle}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 card-hover flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
          📄
        </div>
        {year && (
          <span className="badge text-xs bg-blue-100 text-blue-700">
            {year}
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="font-bold text-[#1a3a6b] text-sm leading-snug line-clamp-2">
          {subject || paper.title}
        </h3>
        {code && (
          <p className="text-gray-400 text-xs mt-0.5 font-mono">{code}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
        <a
          href={itemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-semibold text-[#1a3a6b] bg-[#e8f0fe] hover:bg-[#d0e2ff] py-2 rounded-lg transition-colors"
        >
          View
        </a>
        <a
          href={itemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#0f2244] py-2 rounded-lg transition-colors"
        >
          Download
        </a>
      </div>
    </div>
  );
}
