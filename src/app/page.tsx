import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const quickLinks = [
  {
    href: "/past-papers",
    icon: "📄",
    title: "Past Papers",
    description: "Browse and download exam papers from previous years.",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    href: "/repository",
    icon: "📚",
    title: "Repository",
    description: "Access lecture notes, textbooks, and study materials.",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
  },
  {
    href: "/courses",
    icon: "🎓",
    title: "Courses",
    description: "View your enrolled courses and upcoming schedules.",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
  },
  {
    href: "/about",
    icon: "ℹ️",
    title: "About",
    description: "Learn more about Tharaka University and how to get the most out of it.",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
];

const announcements = [
  {
    date: "Feb 20, 2026",
    title: "Tharaka University Semester 1 Exam Timetable Released",
    tag: "Exams",
    tagColor: "bg-red-100 text-red-700",
  },
  {
    date: "Feb 18, 2026",
    title: "New Past Papers Added: Computer Science 2025",
    tag: "Resources",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    date: "Feb 15, 2026",
    title: "Tharaka University Library Hours Extended During Exam Period",
    tag: "Notice",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    date: "Feb 10, 2026",
    title: "Repository Updated with 2025 Lecture Notes",
    tag: "Resources",
    tagColor: "bg-blue-100 text-blue-700",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Hero Banner */}
      <section className="gradient-hero text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="badge bg-[#c8a951]/20 text-[#c8a951] mb-3">
                🎓 Education for Freedom
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
                Good day, Student! 👋
              </h1>
              <p className="text-white/70 text-lg max-w-lg">
                Welcome to Tharaka University. Explore your academic resources,
                download past papers, and stay on top of your studies — all from one place.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/past-papers"
                className="bg-[#c8a951] text-[#1a3a6b] font-bold px-6 py-3 rounded-xl hover:bg-[#d4b86a] transition-all shadow-md"
              >
                Browse Past Papers
              </Link>
              <Link
                href="/repository"
                className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                Open Repository
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`card-hover border rounded-2xl p-6 flex flex-col gap-3 ${item.color}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.iconBg}`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#1a3a6b] text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              </div>
              <span className="text-[#1a3a6b] font-semibold text-sm mt-auto">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Announcements + Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#1a3a6b] mb-5">
              Announcements
            </h2>
            <div className="space-y-4">
              {announcements.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 card-hover cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-[#1a3a6b] font-bold text-sm flex-shrink-0">
                    📢
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`badge text-xs ${a.tagColor}`}
                      >
                        {a.tag}
                      </span>
                      <span className="text-gray-400 text-xs">{a.date}</span>
                    </div>
                    <p className="text-[#1a3a6b] font-semibold text-sm">
                      {a.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a3a6b] mb-5">
              Portal Stats
            </h2>
            <div className="space-y-4">
              {[
                { icon: "📄", label: "Past Papers", value: "10,248", color: "text-blue-600" },
                { icon: "📚", label: "Resources", value: "3,512", color: "text-amber-600" },
                { icon: "🎓", label: "Courses", value: "512", color: "text-green-600" },
                { icon: "👥", label: "Active Students", value: "52,100", color: "text-purple-600" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
                >
                  <div className="text-2xl">{stat.icon}</div>
                  <div>
                    <div className={`text-xl font-extrabold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
