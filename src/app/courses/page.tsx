import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const courses = [
  {
    code: "CS301",
    title: "Data Structures & Algorithms",
    department: "Computer Science",
    credits: 4,
    lecturer: "Dr. A. Johnson",
    enrolled: 120,
    progress: 65,
    color: "border-blue-300 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    code: "MTH201",
    title: "Linear Algebra",
    department: "Mathematics",
    credits: 3,
    lecturer: "Prof. M. Williams",
    enrolled: 95,
    progress: 40,
    color: "border-green-300 bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
  {
    code: "PHY101",
    title: "Classical Mechanics",
    department: "Physics",
    credits: 4,
    lecturer: "Dr. S. Patel",
    enrolled: 80,
    progress: 80,
    color: "border-purple-300 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
  {
    code: "CS202",
    title: "Operating Systems",
    department: "Computer Science",
    credits: 3,
    lecturer: "Dr. R. Chen",
    enrolled: 110,
    progress: 55,
    color: "border-amber-300 bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    code: "ENG202",
    title: "Engineering Thermodynamics",
    department: "Engineering",
    credits: 4,
    lecturer: "Prof. K. Osei",
    enrolled: 75,
    progress: 30,
    color: "border-red-300 bg-red-50",
    badge: "bg-red-100 text-red-700",
  },
  {
    code: "CS305",
    title: "Database Systems",
    department: "Computer Science",
    credits: 3,
    lecturer: "Dr. L. Nguyen",
    enrolled: 100,
    progress: 70,
    color: "border-teal-300 bg-teal-50",
    badge: "bg-teal-100 text-teal-700",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Page Header */}
      <section className="gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎓</span>
            <span className="badge bg-[#c8a951]/20 text-[#c8a951]">
              Academic Courses
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            My Courses
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            View your enrolled courses, track your progress, and access course
            materials for the current semester.
          </p>
        </div>
      </section>

      {/* Summary bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-6">
          {[
            { label: "Enrolled Courses", value: courses.length },
            {
              label: "Total Credits",
              value: courses.reduce((s, c) => s + c.credits, 0),
            },
            { label: "Semester", value: "Semester 1, 2026" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-[#1a3a6b]">
                {item.value}
              </span>
              <span className="text-sm text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.code}
              className={`card-hover border-2 rounded-2xl p-6 flex flex-col gap-4 ${course.color}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`badge text-xs font-bold ${course.badge}`}
                >
                  {course.code}
                </span>
                <span className="text-xs text-gray-500">
                  {course.credits} credits
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-bold text-[#1a3a6b] text-lg leading-snug">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {course.department}
                </p>
              </div>

              {/* Meta */}
              <div className="text-sm text-gray-500 space-y-1">
                <div className="flex items-center gap-2">
                  <span>👨‍🏫</span>
                  <span>{course.lecturer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>{course.enrolled} students enrolled</span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Course Progress</span>
                  <span className="font-semibold text-[#1a3a6b]">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-white/60 rounded-full h-2">
                  <div
                    className="bg-[#1a3a6b] h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-white/50">
                <button className="flex-1 text-center text-sm font-semibold text-[#1a3a6b] bg-white/70 hover:bg-white py-2 rounded-lg transition-colors">
                  Materials
                </button>
                <button className="flex-1 text-center text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#0f2244] py-2 rounded-lg transition-colors">
                  View Course
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
