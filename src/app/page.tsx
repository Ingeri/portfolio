// Component Imports - Ordered as they appear on page
// NOTE: Client Components (Hero, Process, Education, FAQ) have 'use client' in their files
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Education from "@/components/Education";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";

// Database data fetching
import { getFeatures, getFeaturedProjects, getWorkProcess } from "@/lib/data";

export default async function Home() {
  // Fetch data from database in parallel
  const [features, projects, workProcess] = await Promise.all([
    getFeatures(),
    getFeaturedProjects(),
    getWorkProcess(),
  ]);

  return (
    <main className="overflow-x-hidden">
      {/* 1. Hero Section - Introduction with CV download & stats */}
      <Hero />

      {/* 2. Process Section - 4 stages from database */}
      <Process steps={workProcess} />

      {/* 3. Projects Section - Featured projects from database */}
      <ProjectsPreview projects={projects} />

      {/* 4. Features Section - Features from database */}
      <FeaturesSection features={features} />

      {/* 5. Education Section - Timeline with certifications */}
      <Education />

      {/* 6. Testimonials Section - Client reviews from database (fetches its own data) */}
      <Testimonials />

      {/* 7. FAQ Section - Common questions accordion */}
      <FAQ />

      {/* 8. Contact Section - Contact form and info */}
      <ContactSection />
    </main>
  );
}

// Types for component props (matching data.ts)
interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

// Projects Preview Section Component - Now with database data
function ProjectsPreview({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Explore my recent work across web development, design, and software engineering.
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200/40 dark:shadow-blue-900/40"
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Project Preview Cards - Fetched from Database */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-4">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {project.role}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
              {(project.projectUrl || project.githubUrl) && (
                <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section Component - Fetched from Database
function FeaturesSection({ features }: { features: Feature[] }) {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            What I Do
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Specialized in building modern, scalable web applications with focus on user experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/50 dark:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
                {feature.title}
              </h2>
              <p className="text-slate-600 leading-7 dark:text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Let&apos;s Work Together
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Have a project in mind? I&apos;m always open to discussing new opportunities, creative ideas, or potential collaborations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200/40 dark:shadow-blue-900/40"
          >
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
          <a
            href="mailto:ingeritresor@gmail.com"
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full font-medium hover:border-slate-400 hover:text-slate-900 transition dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Email
          </a>
        </div>
      </div>
    </section>
  );
}
