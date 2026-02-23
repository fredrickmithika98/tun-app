import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const papers = [
  {
    subject: "Computer Science",
    code: "CS301",
    year: "2025",
    semester: "Semester 1",
    type: "Final Exam",
    pages: 12,
  },
  {
    subject: "Mathematics",
    code: "MTH201",
    year: "2025",
    semester: "Semester 2",
    type: "Mid-Term",
    pages: 8,
  },
  {
    subject: "Physics",
    code: "PHY101",
    year: "2024",
    semester: "Semester 1",
    type: "Final Exam",
    pages: 10,
  },
  {
    subject: "Engineering Mechanics",
    code: "ENG202",
    year: "2024",
    semester: "Semester 2",
    type: "Final Exam",
    pages: 14,
  },
  {
    subject: "Data Structures",
    code: "CS202",
    year: "2025",
    semester: "Semester 1",
    type: "Final Exam",
    pages: 11,
  },
  {
    subject: "Calculus",
    code: "MTH101",
    year: "2023",
    semester: "Semester 2",
    type: "Mid-Term",
    pages: 6,
  },
  {
    subject: "Database Systems",
    code: "CS305",
    year: "2024",
    semester: "Semester 1",
    type: "Final Exam",
    pages: 9,
  },
  {
    subject: "Thermodynamics",
    code: "PHY202",
    year: "2023",
    semester: "Semester 1",
    type: "Final Exam",
    pages: 13,
  },
];

const departments = [
  "All Departments",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Engineering",
];

const years = ["All Years", "2025", "2024", "2023", "2022"];

export default function PastPapersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Page Header */}
      <section className="gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📄</span>
            <span className="badge bg-[#c8a951]/20 text-[#c8a951]">
              Academic Resources
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Past Papers
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Download past examination papers to prepare for your upcoming exams.
            Organised by department, year, and semester.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500">
              Department:
            </span>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-[#1a3a6b] font-medium focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20">
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500">Year:</span>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-[#1a3a6b] font-medium focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20">
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
          <div className="ml-auto">
            <input
              type="search"
              placeholder="Search papers..."
              className="text-sm border border-gray-200 rounded-lg px-4 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 w-56"
            />
          </div>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <p className="text-sm text-gray-500 mb-6">
          Showing <strong>{papers.length}</strong> papers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {papers.map((paper) => (
            <div
              key={`${paper.code}-${paper.year}-${paper.semester}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 card-hover flex flex-col gap-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">
                  📄
                </div>
                <span
                  className={`badge text-xs ${
                    paper.type === "Final Exam"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {paper.type}
                </span>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-bold text-[#1a3a6b] text-base leading-snug">
                  {paper.subject}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">{paper.code}</p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 rounded-full px-2 py-0.5">
                  📅 {paper.year}
                </span>
                <span className="bg-gray-100 rounded-full px-2 py-0.5">
                  {paper.semester}
                </span>
                <span className="bg-gray-100 rounded-full px-2 py-0.5">
                  {paper.pages} pages
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
                <button className="flex-1 text-center text-sm font-semibold text-[#1a3a6b] bg-[#e8f0fe] hover:bg-[#d0e2ff] py-2 rounded-lg transition-colors">
                  Preview
                </button>
                <button className="flex-1 text-center text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#0f2244] py-2 rounded-lg transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
