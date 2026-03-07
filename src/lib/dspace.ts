/**
 * DSpace catalog integration for Tharaka University
 * Fetches data from http://catalog.tharaka.ac.ke/xmlui/
 * Uses Atom/RSS feeds since the REST API is not publicly exposed.
 */

export const DSPACE_BASE = "http://catalog.tharaka.ac.ke/xmlui";

export interface DSpaceItem {
  id: string;
  title: string;
  handle: string;
  url: string;
  date: string;
  description: string;
  author: string;
}

/**
 * Parse an Atom feed XML string into DSpaceItem[]
 */
export function parseAtomFeed(xml: string): DSpaceItem[] {
  const items: DSpaceItem[] = [];

  // Extract all <entry> blocks
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];

    const title = extractTag(entry, "title") ?? "";
    const link = extractAttr(entry, "link", "href") ?? "";
    const id = extractTag(entry, "id") ?? link;
    const updated = extractTag(entry, "updated") ?? "";
    const published = extractTag(entry, "published") ?? updated;
    const summary = extractTag(entry, "summary") ?? "";
    const authorName = extractTag(entry, "name") ?? "Tharaka University";

    // Extract handle ID from URL like http://repository.tharaka.ac.ke/xmlui/handle/1/4265
    const handleMatch = link.match(/\/handle\/(\d+\/\d+)/);
    const handle = handleMatch ? handleMatch[1] : "";

    items.push({
      id,
      title: decodeHtmlEntities(title),
      handle,
      url: link,
      date: published,
      description: decodeHtmlEntities(summary.trim()),
      author: decodeHtmlEntities(authorName),
    });
  }

  return items;
}

/**
 * Fetch papers from a DSpace collection Atom feed
 * @param collectionHandle e.g. "1/1" for Past Papers root, "1/22" for Undergraduate
 */
export async function fetchDSpaceItems(
  collectionHandle: string = "1/1"
): Promise<DSpaceItem[]> {
  const url = `${DSPACE_BASE}/feed/atom_1.0/${collectionHandle}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: {
      Accept: "application/atom+xml, application/xml, text/xml",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch DSpace feed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  return parseAtomFeed(xml);
}

/**
 * Search DSpace by query using the discover endpoint (HTML scraping)
 */
export async function searchDSpace(query: string): Promise<DSpaceItem[]> {
  const url = `${DSPACE_BASE}/discover?query=${encodeURIComponent(query)}&scope=1%2F1&rpp=20`;

  const res = await fetch(url, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error(`Failed to search DSpace: ${res.status}`);
  }

  const html = await res.text();
  return parseDSpaceSearchResults(html);
}

/**
 * Parse search results from DSpace HTML page
 */
function parseDSpaceSearchResults(html: string): DSpaceItem[] {
  const items: DSpaceItem[] = [];

  // Match artifact items in search results
  const itemRegex =
    /<li class="ds-artifact-item[^"]*">[\s\S]*?<h4 class="artifact-title">[\s\S]*?<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/li>/g;

  let match;
  while ((match = itemRegex.exec(html)) !== null) {
    const href = match[1];
    const rawTitle = match[2].replace(/<[^>]+>/g, "").trim();

    const handleMatch = href.match(/\/handle\/(\d+\/\d+)/);
    const handle = handleMatch ? handleMatch[1] : "";
    const fullUrl = `http://repository.tharaka.ac.ke${href}`;

    if (handle && rawTitle) {
      items.push({
        id: fullUrl,
        title: decodeHtmlEntities(rawTitle),
        handle,
        url: fullUrl,
        date: "",
        description: rawTitle,
        author: "Tharaka University",
      });
    }
  }

  return items;
}

/**
 * Extract the PDF download URL for a given item handle
 * Returns the bitstream URL pattern
 */
export function getPdfUrl(handle: string, filename: string): string {
  return `${DSPACE_BASE}/bitstream/handle/${handle}/${encodeURIComponent(filename)}?sequence=1&isAllowed=y`;
}

/**
 * Get the item page URL
 */
export function getItemUrl(handle: string): string {
  return `${DSPACE_BASE}/handle/${handle}`;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractTag(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function extractAttr(
  xml: string,
  tag: string,
  attr: string
): string | null {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(regex);
  return match ? match[1] : null;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#\d+;/g, "");
}
