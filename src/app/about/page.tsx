"use client";

import OrbAnimation from "@/components/OrbAnimation";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: "2025",
      title: t.fullStackLaunches,
      detail: t.fullStackDetail,
    },
    {
      year: "2024",
      title: t.uxPerformance,
      detail: t.uxDetail,
    },
    {
      year: "2023",
      title: t.softwareEngineering,
      detail: t.softwareDetail,
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            {t.aboutMe}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {t.aboutTitle}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            {t.aboutDesc}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-slate-900">4+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">{t.yearsCoding}</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-slate-900">12+</p>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">{t.deliveredProjects}</p>
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
            {t.careerHighlights}
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
        <h2 className="text-3xl font-bold mb-4">{t.howIWork}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">{t.plan}</h3>
            <p className="text-slate-600 leading-7">{t.planDesc}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">{t.build}</h3>
            <p className="text-slate-600 leading-7">{t.buildDesc}</p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
            <h3 className="font-semibold mb-3">{t.refine}</h3>
            <p className="text-slate-600 leading-7">{t.refineDesc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
