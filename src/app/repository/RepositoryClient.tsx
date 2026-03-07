"use client";

import { useState, useMemo } from "react";
import type { DSpaceItem } from "@/lib/dspace";
import { DSPACE_BASE } from "@/lib/dspace";

interface Props {
  items: DSpaceItem[];
}

export default function RepositoryClient({ items }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full flex-1">
      {/* Search */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-bold text-[#1a3a6b]">Recently Added</h2>
        <div className="flex gap-3 items-center">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="text-sm border border-gray-200 rounded-lg px-4 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 w-56"
          />
          <a
            href={`${DSPACE_BASE}/handle/1/1`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#1a3a6b] font-semibold hover:underline whitespace-nowrap"
          >
            View All →
          </a>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">📡</div>
          <h3 className="text-xl font-bold text-[#1a3a6b] mb-2">
            Could not load resources
          </h3>
          <p className="text-gray-500 mb-4">
            Unable to connect to the catalog. Please try again later.
          </p>
          <a
            href={DSPACE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1a3a6b] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#0f2244] transition-colors"
          >
            Visit Catalog Directly →
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <ResourceRow key={item.id} item={item} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No results for &ldquo;{search}&rdquo;
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function ResourceRow({ item }: { item: DSpaceItem }) {
  const year = item.date ? new Date(item.date).getFullYear().toString() : "";
  const itemUrl = `${DSPACE_BASE}/handle/${item.handle}`;

  // Extract course code
  const codeMatch = item.title.match(/^([A-Z]{2,6}\s*\d{3,4}[A-Z]?)/);
  const code = codeMatch ? codeMatch[1] : "";
  const subject = code
    ? item.title.replace(code, "").replace(/^[:\s-]+/, "").trim()
    : item.title;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 card-hover">
      <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-2xl flex-shrink-0">
        📄
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1a3a6b] text-sm truncate">
          {subject || item.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {code && (
            <span className="badge text-xs bg-blue-100 text-blue-700 font-mono">
              {code}
            </span>
          )}
          {year && (
            <span className="text-gray-400 text-xs">📅 {year}</span>
          )}
          <span className="text-gray-400 text-xs">{item.author}</span>
        </div>
      </div>
      <a
        href={itemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 bg-[#1a3a6b] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0f2244] transition-colors"
      >
        Download
      </a>
    </div>
  );
}
