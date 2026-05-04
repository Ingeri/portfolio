"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Code2, Palette, Globe, BarChart3 } from "lucide-react";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code2,
      title: t.webDev,
      description: t.webDevDesc,
    },
    {
      icon: Palette,
      title: t.graphicDesign,
      description: t.graphicDesignDesc,
    },
    {
      icon: Globe,
      title: t.eServices,
      description: t.eServicesDesc,
    },
    {
      icon: BarChart3,
      title: t.dataAnalysis,
      description: t.dataAnalysisDesc,
    },
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.servicesSubtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
