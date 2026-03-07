import { NextRequest, NextResponse } from "next/server";
import { fetchDSpaceItems, searchDSpace } from "@/lib/dspace";

/**
 * GET /api/papers
 * Query params:
 *   - collection: DSpace collection handle (default: "1/1" = all past papers)
 *   - q: search query (uses DSpace discover)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection") ?? "1/1";
  const query = searchParams.get("q") ?? "";

  try {
    let items;

    if (query.trim()) {
      items = await searchDSpace(query.trim());
    } else {
      items = await fetchDSpaceItems(collection);
    }

    return NextResponse.json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("DSpace fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch papers from catalog",
        items: [],
      },
      { status: 500 }
    );
  }
}
