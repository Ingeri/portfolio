"use client";

import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react";

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  type: "certificate" | "degree";
  link?: string;
}

export default function Education() {
  const { t } = useLanguage();

  const educationItems: EducationItem[] = [
    {
      id: 1,
      title: t.educationA2 || "A2 Certificate - German Language",
      institution: t.educationA2Institution || "Goethe-Institut",
      date: "2023",
      description: t.educationA2Desc || "Official certification proving proficiency in German language at the elementary level, enabling professional communication in German-speaking environments.",
      type: "certificate",
      link: "#",
    },
    {
      id: 2,
      title: t.educationData || "Data & DevOps Engineering",
      institution: t.educationDataInstitution || "ALX Africa / Holberton School",
      date: "2022 - 2023",
      description: t.educationDataDesc || "Comprehensive training in data engineering, cloud infrastructure, CI/CD pipelines, and DevOps best practices with hands-on project experience.",
      type: "certificate",
      link: "#",
    },
    {
      id: 3,
      title: t.educationFullStack || "Full Stack Software Engineering",
      institution: t.educationFullStackInstitution || "ALX Africa / Holberton School",
      date: "2021 - 2022",
      description: t.educationFullStackDesc || "Intensive program covering frontend and backend development, system engineering, and low-level programming with C and Python.",
      type: "certificate",
      link: "#",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.educationTitle || "Education & Certifications"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.educationSubtitle || "Continuous learning and professional development"}
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block" />

          <div className="space-y-8">
            {educationItems.map((item, index) => (
              <div
                key={item.id}
                className="relative flex gap-6 md:gap-8 items-start"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 hidden md:flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      item.type === "certificate"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                        : "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
                    }`}
                  >
                    {item.type === "certificate" ? (
                      <Award className="w-7 h-7" />
                    ) : (
                      <GraduationCap className="w-7 h-7" />
                    )}
                  </div>
                  {index !== educationItems.length - 1 && (
                    <div className="h-full w-0.5 bg-slate-200 dark:bg-slate-700 mt-4" />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === "certificate"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                      }`}
                    >
                      {item.type === "certificate" ? (
                        <>
                          <Award className="w-3 h-3" />
                          {t.certification || "Certification"}
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-3 h-3" />
                          {t.degree || "Degree"}
                        </>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {item.institution}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      {t.viewCredential || "View Credential"}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
