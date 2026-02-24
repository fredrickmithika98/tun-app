import Link from "next/link";

export default function SplashPage() {
  return (
    <main className="min-h-screen gradient-hero flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full bg-[#c8a951]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-[-120px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Logo mark */}
        <div className="w-24 h-24 rounded-full bg-[#c8a951] flex items-center justify-center mb-6 shadow-2xl">
          <span className="text-[#1a3a6b] font-extrabold text-4xl">T</span>
        </div>

        {/* Badge */}
        <span className="badge bg-[#c8a951]/20 text-[#c8a951] mb-4">
          🎓 Education for Freedom
        </span>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
          Welcome to{" "}
          <span className="text-[#c8a951]">Tharaka University</span>
        </h1>

        <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
          Your all-in-one hub for past papers, academic resources, course
          materials, and everything you need to excel at Tharaka University.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/home"
            className="bg-[#c8a951] text-[#1a3a6b] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#d4b86a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
          >
            Enter Portal →
          </Link>
          <Link
            href="/about"
            className="border-2 border-white/30 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 text-center">
          {[
            { value: "10,000+", label: "Past Papers" },
            { value: "500+", label: "Courses" },
            { value: "50,000+", label: "Students" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#c8a951]">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#f8f9fc"
          />
        </svg>
      </div>
    </main>
  );
}
