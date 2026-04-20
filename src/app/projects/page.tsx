const projects = [
  {
    name: "Portfolio Dashboard",
    role: "UI + interaction design",
    summary: "A clean responsive developer dashboard with animated UI components and fast load behavior.",
    tech: "Next.js · Tailwind · TypeScript",
  },
  {
    name: "Task Management App",
    role: "Full-stack delivery",
    summary: "A productivity tool built for teams, with task states, persistence, and an intuitive workflow.",
    tech: "React · Node.js · PostgreSQL",
  },
  {
    name: "API Sync Service",
    role: "Backend architecture",
    summary: "A service that connects multiple APIs, normalizes data, and keeps systems in sync.",
    tech: "Express · TypeScript · Supabase",
  },
  {
    name: "Design System Kit",
    role: "Component library",
    summary: "A reusable style system created to accelerate design consistency across apps.",
    tech: "React · Tailwind · Storybook",
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
          Projects
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Real work with real product focus.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          These projects highlight responsive interfaces, solid architecture, and practical developer tooling.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.name} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-200/10 opacity-0 transition group-hover:opacity-100" />
            <div className="relative space-y-4">
              <span className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">{project.role}</span>
              <h2 className="text-2xl font-semibold text-slate-900">{project.name}</h2>
              <p className="text-slate-600 leading-7">{project.summary}</p>
              <p className="text-sm text-slate-500">{project.tech}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
