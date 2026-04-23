"use client";

import HeroAnimation from "@/components/HeroAnimation";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { label: t.projectsDelivered, value: "12+" },
    { label: t.yearsExperience, value: "4+" },
    { label: t.techStack, value: "React · Next.js · Node.js" },
  ];

  const featured = [
    {
      title: t.designSystems,
      description: t.designSystemsDesc,
    },
    {
      title: t.fullStack,
      description: t.fullStackDesc,
    },
    {
      title: t.highPerformance,
      description: t.highPerformanceDesc,
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            {t.webDeveloper}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {t.heroTitle}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            {t.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/projects"
              className="inline-block bg-blue-600 text-white px-7 py-3 rounded-full shadow-lg shadow-blue-200/40 hover:bg-blue-700 transition"
            >
              {t.seeProjects}
            </a>
            <a
              href="/about"
              className="inline-block border border-slate-300 text-slate-900 px-7 py-3 rounded-full hover:border-blue-600 hover:text-blue-600 transition"
            >
              {t.learnAbout}
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
