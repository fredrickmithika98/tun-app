import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  {
    icon: "📖",
    title: "Lecture Notes",
    count: 1240,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: "📗",
    title: "Textbooks",
    count: 380,
    color: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-100",
  },
  {
    icon: "🔬",
    title: "Research Papers",
    count: 920,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconBg: "bg-purple-100",
  },
  {
    icon: "📊",
    title: "Presentations",
    count: 560,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    icon: "🧪",
    title: "Lab Manuals",
    count: 210,
    color: "bg-red-50 border-red-200 text-red-700",
    iconBg: "bg-red-100",
  },
  {
    icon: "📝",
    title: "Study Guides",
    count: 430,
    color: "bg-teal-50 border-teal-200 text-teal-700",
    iconBg: "bg-teal-100",
  },
];

const recentResources = [
  {
    title: "Introduction to Algorithms — Lecture Notes",
    subject: "Computer Science",
    type: "Lecture Notes",
    size: "2.4 MB",
    date: "Feb 20, 2026",
    downloads: 1240,
  },
  {
    title: "Calculus III — Complete Textbook",
    subject: "Mathematics",
    type: "Textbook",
    size: "18.7 MB",
    date: "Feb 18, 2026",
    downloads: 890,
  },
  {
    title: "Quantum Mechanics — Study Guide",
    subject: "Physics",
    type: "Study Guide",
    size: "1.1 MB",
    date: "Feb 15, 2026",
    downloads: 670,
  },
  {
    title: "Database Design Principles — Slides",
    subject: "Computer Science",
    type: "Presentation",
    size: "5.3 MB",
    date: "Feb 12, 2026",
    downloads: 540,
  },
  {
    title: "Organic Chemistry Lab Manual",
    subject: "Chemistry",
    type: "Lab Manual",
    size: "3.8 MB",
    date: "Feb 10, 2026",
    downloads: 420,
  },
  {
    title: "Machine Learning Research Survey 2025",
    subject: "Computer Science",
    type: "Research Paper",
    size: "0.9 MB",
    date: "Feb 8, 2026",
    downloads: 1100,
  },
];

const typeColors: Record<string, string> = {
  "Lecture Notes": "bg-blue-100 text-blue-700",
  Textbook: "bg-green-100 text-green-700",
  "Study Guide": "bg-teal-100 text-teal-700",
  Presentation: "bg-amber-100 text-amber-700",
  "Lab Manual": "bg-red-100 text-red-700",
  "Research Paper": "bg-purple-100 text-purple-700",
};

export default function RepositoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Page Header */}
      <section className="gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <span className="badge bg-[#c8a951]/20 text-[#c8a951]">
              Academic Repository
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Resource Repository
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Access thousands of academic resources — lecture notes, textbooks,
            research papers, and more — all in one place.
          </p>

          {/* Search bar */}
          <div className="mt-6 flex gap-3 max-w-xl">
            <input
              type="search"
              placeholder="Search resources, subjects, authors..."
              className="flex-1 text-sm border-0 rounded-xl px-4 py-3 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c8a951]/50 backdrop-blur"
            />
            <button className="bg-[#c8a951] text-[#1a3a6b] font-bold px-6 py-3 rounded-xl hover:bg-[#d4b86a] transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <h2 className="text-2xl font-bold text-[#1a3a6b] mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.title}
              className={`card-hover border rounded-2xl p-4 flex flex-col items-center gap-2 text-center ${cat.color}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${cat.iconBg}`}
              >
                {cat.icon}
              </div>
              <span className="font-semibold text-sm">{cat.title}</span>
              <span className="text-xs opacity-70">{cat.count} files</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1a3a6b]">
            Recently Added
          </h2>
          <button className="text-sm text-[#1a3a6b] font-semibold hover:underline">
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {recentResources.map((res) => (
            <div
              key={res.title}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-2xl flex-shrink-0">
                📄
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#1a3a6b] text-sm truncate">
                  {res.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className={`badge text-xs ${typeColors[res.type] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {res.type}
                  </span>
                  <span className="text-gray-400 text-xs">{res.subject}</span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-400 text-xs">{res.date}</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs text-gray-400">{res.size}</span>
                <span className="text-xs text-gray-400">
                  ⬇ {res.downloads.toLocaleString()}
                </span>
              </div>
              <button className="flex-shrink-0 bg-[#1a3a6b] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0f2244] transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
