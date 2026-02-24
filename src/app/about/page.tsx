import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    icon: "📄",
    title: "Past Papers",
    description:
      "Access thousands of past examination papers organised by department, year, and semester to help you prepare effectively.",
  },
  {
    icon: "📚",
    title: "Resource Repository",
    description:
      "Browse lecture notes, textbooks, research papers, and study guides uploaded by faculty and students.",
  },
  {
    icon: "🎓",
    title: "Course Management",
    description:
      "Track your enrolled courses, monitor progress, and access all course materials in one convenient location.",
  },
  {
    icon: "📢",
    title: "Announcements",
    description:
      "Stay up to date with the latest university news, exam timetables, and important notices.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    description:
      "Quickly find any resource, paper, or course with our powerful search and filter system.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    description:
      "Access Tharaka University App from any device — desktop, tablet, or mobile — with a fully responsive design.",
  },
];

const team = [
  { name: "Dr. A. Johnson", role: "Platform Director", emoji: "👨‍💼" },
  { name: "Prof. M. Williams", role: "Academic Lead", emoji: "👩‍🏫" },
  { name: "R. Chen", role: "Lead Developer", emoji: "👨‍💻" },
  { name: "L. Nguyen", role: "UX Designer", emoji: "👩‍🎨" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="badge bg-[#c8a951]/20 text-[#c8a951] mb-4">
            About Tharaka University
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Education for{" "}
            <span className="text-[#c8a951]">Freedom</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tharaka University is your all-in-one academic hub, designed to make
            university life easier by centralising resources, past papers, and
            course information.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge bg-[#1a3a6b]/10 text-[#1a3a6b] mb-3">
              Our Mission
            </span>
            <h2 className="text-3xl font-extrabold text-[#1a3a6b] mb-4">
              Making Academic Resources Accessible to All
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe every student deserves equal access to quality academic
              resources. Tharaka University was built to break down barriers and ensure
              that no student is left behind due to lack of access to study
              materials.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              From first-year students navigating university life to postgraduate
              researchers, Tharaka University provides the tools and resources needed to
              succeed at every level — Education for Freedom.
            </p>
            <Link
              href="/home"
              className="inline-block bg-[#1a3a6b] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0f2244] transition-colors"
            >
              Get Started Today →
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10,000+", label: "Past Papers", icon: "📄" },
              { value: "3,500+", label: "Resources", icon: "📚" },
              { value: "500+", label: "Courses", icon: "🎓" },
              { value: "50,000+", label: "Students", icon: "👥" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-gray-100 p-6 text-center card-hover"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-extrabold text-[#1a3a6b]">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="badge bg-[#1a3a6b]/10 text-[#1a3a6b] mb-3">
              What We Offer
            </span>
            <h2 className="text-3xl font-extrabold text-[#1a3a6b]">
              Everything You Need in One Place
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-100 p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f0fe] flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#1a3a6b] text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="text-center mb-10">
          <span className="badge bg-[#1a3a6b]/10 text-[#1a3a6b] mb-3">
            Our Team
          </span>
          <h2 className="text-3xl font-extrabold text-[#1a3a6b]">
            The People Behind Tharaka University
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 text-center card-hover"
            >
              <div className="w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center text-3xl mx-auto mb-3">
                {member.emoji}
              </div>
              <h4 className="font-bold text-[#1a3a6b] text-sm">
                {member.name}
              </h4>
              <p className="text-gray-500 text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 mb-8">
            Join thousands of students already using Tharaka University App to access
            resources and ace their exams.
          </p>
          <Link
            href="/home"
            className="inline-block bg-[#c8a951] text-[#1a3a6b] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#d4b86a] transition-all shadow-lg"
          >
            Enter Tharaka University →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
