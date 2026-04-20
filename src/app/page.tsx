import HeroAnimation from "@/components/HeroAnimation";

const stats = [
  { label: "Projects delivered", value: "12+" },
  { label: "Years experience", value: "4+" },
  { label: "Tech stack", value: "React · Next.js · Node.js" },
];

const featured = [
  {
    title: "Design systems built for scale",
    description: "Reusable UI patterns, accessibility-first layouts, and component-driven workflows for fast delivery.",
  },
  {
    title: "Full-stack product delivery",
    description: "From frontend interfaces to backend APIs, I ship end-to-end solutions with reliability and speed.",
  },
  {
    title: "High-performance experiences",
    description: "I optimize loading, interactions, and visuals so products feel polished and responsive.",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            Web & Software Developer
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            I create interactive web products and software tools with polished animation and real engineering quality.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            I build interfaces that move naturally, APIs that scale reliably, and software that supports real business value.
            Explore work across frontend, backend, and full-stack delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/projects"
              className="inline-block bg-blue-600 text-white px-7 py-3 rounded-full shadow-lg shadow-blue-200/40 hover:bg-blue-700 transition"
            >
              See Projects
            </a>
            <a
              href="/about"
              className="inline-block border border-slate-300 text-slate-900 px-7 py-3 rounded-full hover:border-blue-600 hover:text-blue-600 transition"
            >
              Learn About Me
            </a>
          </div>
        </div>

        <HeroAnimation />
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {featured.map((item) => (
          <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-slate-950/5 p-8 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{item.title}</h2>
            <p className="text-slate-600 leading-7">{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
