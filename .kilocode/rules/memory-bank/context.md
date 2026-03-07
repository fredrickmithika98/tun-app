# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] DSpace catalog integration — live data from catalog.tharaka.ac.ke
- [x] Past Papers page now fetches live papers via Atom feed (handle 1/1)
- [x] Repository page now fetches live items from DSpace catalog
- [x] Admin panel at /admin with catalog overview, upload instructions, live preview table
- [x] API route at /api/papers for fetching/searching DSpace items
- [x] DSpace utility library at src/lib/dspace.ts (Atom feed parser, search)
- [x] Past Papers page now fetches from BOTH undergraduate (1/22) AND postgraduate (1/21) collections with tab filter
- [x] Admin panel protected with username/password login at /admin/login
- [x] Next.js middleware at src/middleware.ts redirects unauthenticated users to /admin/login
- [x] Admin login API at /api/admin/login sets httpOnly session cookie (8h expiry)
- [x] Admin logout API at /api/admin/logout clears session cookie
- [x] Default credentials: username=admin, password=tharaka2024 (override via ADMIN_USERNAME/ADMIN_PASSWORD env vars)

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2026-02-23 | Built complete University App: splash page, home dashboard, past papers, repository, courses, about pages + shared Navbar/Footer components |
| 2026-02-24 | Rebranded entire app from "UniPortal" to "Tharaka University App" — Education for Freedom (matching Adalo app at previewer.adalo.com/2a5c0179) |
| 2026-02-24 | Made home dashboard the landing page at `/` — removed old splash page, `/home` now redirects to `/`, Navbar links updated |
