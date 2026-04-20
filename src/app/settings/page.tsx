"use client";

import { useState, useEffect } from "react";

const translations = {
  en: {
    settings: "Settings",
    title: "Customize your experience",
    description: "Personalize your portfolio viewing preferences.",
    languageTitle: "Language",
    languageDescription: "Choose your preferred language for the website.",
    accessibilityTitle: "Accessibility",
    fontSizeLabel: "Font Size",
    notificationsTitle: "Notifications",
    notificationsDescription: "Get notified about important updates and messages.",
    savedNote: "Your selected language and display preferences are saved locally.",
  },
  es: {
    settings: "Configuración",
    title: "Personaliza tu experiencia",
    description: "Ajusta las preferencias de visualización de tu portafolio.",
    languageTitle: "Idioma",
    languageDescription: "Elige tu idioma preferido para el sitio web.",
    accessibilityTitle: "Accesibilidad",
    fontSizeLabel: "Tamaño de fuente",
    notificationsTitle: "Notificaciones",
    notificationsDescription: "Recibe actualizaciones importantes y mensajes.",
    savedNote: "Tus ajustes se guardan localmente.",
  },
  fr: {
    settings: "Paramètres",
    title: "Personnalisez votre expérience",
    description: "Personnalisez les préférences d'affichage de votre portfolio.",
    languageTitle: "Langue",
    languageDescription: "Choisissez votre langue préférée pour le site.",
    accessibilityTitle: "Accessibilité",
    fontSizeLabel: "Taille de police",
    notificationsTitle: "Notifications",
    notificationsDescription: "Recevez des mises à jour et des messages importants.",
    savedNote: "Vos préférences sont enregistrées localement.",
  },
  de: {
    settings: "Einstellungen",
    title: "Passen Sie Ihre Erfahrung an",
    description: "Personalisieren Sie die Anzeigeeinstellungen Ihres Portfolios.",
    languageTitle: "Sprache",
    languageDescription: "Wähle deine bevorzugte Sprache für die Website.",
    accessibilityTitle: "Barrierefreiheit",
    fontSizeLabel: "Schriftgröße",
    notificationsTitle: "Benachrichtigungen",
    notificationsDescription: "Erhalte wichtige Updates und Nachrichten.",
    savedNote: "Deine Einstellungen werden lokal gespeichert.",
  },
  ja: {
    settings: "設定",
    title: "エクスペリエンスをカスタマイズ",
    description: "ポートフォリオの表示設定をパーソナライズします。",
    languageTitle: "言語",
    languageDescription: "ウェブサイトの使用言語を選択してください。",
    accessibilityTitle: "アクセシビリティ",
    fontSizeLabel: "フォントサイズ",
    notificationsTitle: "通知",
    notificationsDescription: "重要な更新やメッセージを受け取ります。",
    savedNote: "設定はローカルに保存されます。",
  },
};

export default function SettingsPage() {
  const [language, setLanguage] = useState<keyof typeof translations>("en");
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("normal");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    const storedNotifications = localStorage.getItem("notifications");
    const storedFontSize = localStorage.getItem("fontSize");

    if (storedLanguage) {
      const langKey = storedLanguage as keyof typeof translations;
      if (translations[langKey]) {
        setLanguage(langKey);
      }
    }
    if (storedNotifications !== null) {
      setNotifications(storedNotifications === "true");
    }
    if (storedFontSize) {
      setFontSize(storedFontSize);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("notifications", String(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
  }, [fontSize]);

  const t = translations[language];

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
          {t.settings}
        </p>
        <h1 className="text-4xl font-display font-bold">{t.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t.description}
        </p>
      </section>

      <div className="space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-700">
          <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.languageTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {t.languageDescription}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as keyof typeof translations)}
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
          <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.accessibilityTitle}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3 dark:text-white">
                {t.fontSizeLabel}
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
                {t.notificationsTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {t.notificationsDescription}
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
            ✓ {t.savedNote}
          </p>
        </div>
      </div>
    </main>
  );
}
