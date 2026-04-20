import OrbAnimation from "@/components/OrbAnimation";

const milestones = [
  {
    year: "2025",
    title: "Full-stack launches",
    detail: "Delivered multiple production apps with React, Next.js, and Node.js integrations.",
  },
  {
    year: "2024",
    title: "UX and performance focus",
    detail: "Built polished user interfaces with accessibility, speed, and animation in mind.",
  },
  {
    year: "2023",
    title: "Software engineering foundation",
    detail: "Built backend services, REST APIs, and scalable tooling for modern web products.",
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            About Me
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            I solve problems with code, design, and strong engineering habits.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            I combine frontend craftsmanship with backend reliability to build products that users enjoy and teams can maintain. My work is grounded in clean architecture, fast interfaces, and a clear development process.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-slate-900">4+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">Years coding</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-slate-900">12+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">Delivered projects</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950/5 p-8 shadow-lg">
          <OrbAnimation />
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-4">
            Career highlights
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {milestones.map((item) => (
              <article key={item.year} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 transition">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-3">{item.year}</p>
                <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
                <p className="text-slate-600 leading-7">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-sm">
        <h2 className="text-3xl font-bold mb-4">How I work</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Plan</h3>
            <p className="text-slate-600 leading-7">Understand the problem, define goals, and align the product with user and business needs.</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Build</h3>
            <p className="text-slate-600 leading-7">Write reliable code with modern tools, reusable patterns, and polished UI interactions.</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Refine</h3>
            <p className="text-slate-600 leading-7">Test, optimize, and maintain the product so it stays fast and easy to expand.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
