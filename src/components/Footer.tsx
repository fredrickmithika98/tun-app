import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f2244] text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#c8a951] flex items-center justify-center font-bold text-[#1a3a6b]">
                T
              </div>
              <span className="text-white font-bold text-lg">
                Tharaka <span className="text-[#c8a951]">University</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Education for Freedom — your all-in-one academic hub for
              resources, past papers, and university life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/home", label: "Home" },
                { href: "/past-papers", label: "Past Papers" },
                { href: "/repository", label: "Repository" },
                { href: "/courses", label: "Courses" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#c8a951] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Study Guides",
                "Lecture Notes",
                "Research Papers",
                "Timetables",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-[#c8a951] transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>📧 info@tharaka.ac.ke</li>
              <li>📞 +254 700 000 000</li>
              <li>📍 Tharaka University, Kenya</li>
            </ul>
            <Link
              href="/about"
              className="inline-block mt-4 text-sm text-[#c8a951] hover:underline"
            >
              About Us →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Tharaka University. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Use
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
