"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/past-papers", label: "Past Papers" },
  { href: "/repository", label: "Repository" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a3a6b] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#1a3a6b] text-lg group-hover:scale-105 transition-transform">
              T
            </div>
            <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
              Tharaka <span className="text-[#c8a951]">University</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[#c8a951] bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="bg-[#c8a951] text-[#1a3a6b] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#d4b86a] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f2244] border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#c8a951] bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 flex gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center text-sm text-white/70 hover:text-white py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-[#c8a951] text-[#1a3a6b] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#d4b86a] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
