"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ClipboardList, Code, TestTube, Rocket, ChevronRight, LucideIcon } from "lucide-react";

interface WorkProcess {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

interface ProcessProps {
  steps: WorkProcess[];
}

// Icon mapping based on step number
const iconMap: Record<number, LucideIcon> = {
  1: ClipboardList,
  2: Code,
  3: TestTube,
  4: Rocket,
};

export default function Process({ steps }: ProcessProps) {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  // Ensure we have at least fallback data
  const processSteps = steps.length > 0 ? steps : [
    { id: "1", stepNumber: 1, title: "Planning", description: "Understanding requirements, defining project scope, and creating a roadmap aligned with business goals." },
    { id: "2", stepNumber: 2, title: "Development", description: "Building scalable solutions with clean code, modern technologies, and best practices." },
    { id: "3", stepNumber: 3, title: "Testing", description: "Rigorous quality assurance, performance optimization, and cross-browser compatibility checks." },
    { id: "4", stepNumber: 4, title: "Deployment", description: "Smooth launch with CI/CD pipelines, monitoring setup, and post-launch support." },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t.processTitle || "My Process"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.processSubtitle || "A structured approach to delivering high-quality solutions"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Step Indicators */}
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const IconComponent = iconMap[step.stepNumber] || ClipboardList;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                    activeStep === index
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      activeStep === index
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        activeStep === index
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Step {step.stepNumber}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      activeStep === index
                        ? "text-blue-500 rotate-90"
                        : "text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Step Detail */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-900">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                {(() => {
                  const IconComponent = iconMap[processSteps[activeStep]?.stepNumber] || ClipboardList;
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {processSteps[activeStep]?.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {processSteps[activeStep]?.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <span className="font-semibold">Step {processSteps[activeStep]?.stepNumber} of {processSteps.length}</span>
                <div className="flex gap-1">
                  {processSteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === activeStep
                          ? "bg-blue-500"
                          : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
