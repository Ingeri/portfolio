"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Download, ArrowRight, FolderGit2, Users } from "lucide-react";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  const { t } = useLanguage();

  const stats = [
    { 
      label: t.heroProjects || "Projects", 
      value: "21+",
      icon: FolderGit2 
    },
    { 
      label: t.heroClients || "Clients", 
      value: "12+",
      icon: Users 
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
              {t.webDeveloper}
            </p>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 dark:text-white">
              {t.heroTitle}
            </h1>
            
            <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-full shadow-lg shadow-blue-200/40 hover:bg-blue-700 transition-all duration-300 hover:shadow-xl dark:shadow-blue-900/40"
              >
                {t.seeProjects}
                <ArrowRight className="w-4 h-4" />
              </a>
              
              {/* High Contrast Download CV Button */}
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full border-2 border-slate-900 hover:bg-slate-800 hover:border-slate-800 transition-all duration-300 shadow-lg dark:bg-white dark:text-slate-900 dark:border-white dark:hover:bg-slate-100"
              >
                <Download className="w-4 h-4" />
                {t.downloadCV || "Download CV"}
              </a>
              
              <a
                href="/about"
                className="inline-flex items-center gap-2 border border-slate-300 text-blue-600 px-7 py-3 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300 dark:border-slate-600 dark:text-blue-400 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                {t.learnAbout}
              </a>
            </div>

            {/* By the Numbers - Stats Row */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-4 font-medium">
                {t.byTheNumbers || "By the Numbers"}
              </p>
              <div className="flex flex-wrap gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Animation */}
          <div className="relative">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
