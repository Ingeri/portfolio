"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("normal");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
  ];

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 space-y-12">
      <section className="space-y-4 animate-fade-in">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
          Settings
        </p>
        <h1 className="text-4xl font-display font-bold">Customize your experience</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Personalize your portfolio viewing preferences.
        </p>
      </section>

      <div className="space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-700">
          <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">Language</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Choose your preferred language for the website.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`rounded-lg px-4 py-3 font-medium transition-smooth text-left ${
                  language === lang.code
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "border border-slate-200 text-slate-900 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-700">
          <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">Accessibility</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3 dark:text-white">
                Font Size
              </label>
              <div className="flex gap-3">
                {["small", "normal", "large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex-1 rounded-lg px-4 py-2 font-medium transition-smooth capitalize ${
                      fontSize === size
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 text-slate-900 hover:border-blue-300 dark:border-slate-700 dark:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Notifications
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Get notified about important updates and messages.
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-smooth ${
                notifications ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 dark:border-emerald-900 dark:bg-emerald-950">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            ✓ Your settings are automatically saved
          </p>
        </div>
      </div>
    </main>
  );
}
