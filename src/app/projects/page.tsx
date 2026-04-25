"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            {t.projectsLabel}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {t.projectsTitle}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {t.projectsDesc}
          </p>
        </section>
        <div className="text-center text-slate-500 dark:text-slate-400">Loading projects...</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
          {t.projectsLabel}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          {t.projectsTitle}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          {t.projectsDesc}
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-200/10 opacity-0 transition group-hover:opacity-100" />
            <div className="relative space-y-4">
              <span className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">{project.role}</span>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.name}</h2>
              <p className="text-slate-600 leading-7 dark:text-slate-400">{project.summary}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{project.tech}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
