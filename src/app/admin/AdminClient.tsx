"use client";

import { useState, useMemo } from "react";
import type { DSpaceItem } from "@/lib/dspace";
import { DSPACE_BASE } from "@/lib/dspace";

interface Props {
  items: DSpaceItem[];
}

export default function AdminClient({ items }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [items, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <h2 className="text-xl font-bold text-[#1a3a6b]">
          Live Catalog Preview
        </h2>
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Filter items..."
          className="text-sm border border-gray-200 rounded-lg px-4 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 w-56"
        />
      </div>

      {items.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="font-semibold text-amber-800">
            Could not fetch live data from the catalog
          </p>
          <p className="text-sm text-amber-700 mt-1">
            The DSpace catalog may be temporarily unavailable. Check{" "}
            <a
              href={DSPACE_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              catalog.tharaka.ac.ke
            </a>{" "}
            directly.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Showing{" "}
            <strong>
              {(page - 1) * PER_PAGE + 1}–
              {Math.min(page * PER_PAGE, filtered.length)}
            </strong>{" "}
            of <strong>{filtered.length}</strong> items
          </p>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">
                    Handle
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item, i) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      i % 2 === 0 ? "" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#1a3a6b] line-clamp-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {item.author}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell whitespace-nowrap">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("en-KE", {
                            year: "numeric",
                            month: "short",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs hidden md:table-cell">
                      {item.handle}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`${DSPACE_BASE}/handle/${item.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1a3a6b] font-semibold text-xs hover:underline whitespace-nowrap"
                      >
                        Open →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
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
  );
}
