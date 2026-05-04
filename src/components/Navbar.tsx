"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, Check } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.about, href: "/about" },
    { name: t.projects, href: "/projects" },
    { name: t.blog, href: "/blog" },
    { name: t.contact, href: "/contact" },
    { name: t.settings, href: "/settings" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl transition-smooth dark:bg-slate-900/80 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover-lift transition-smooth">
          INGERI<span className="text-blue-600">.</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-smooth dark:text-slate-300 dark:hover:text-blue-400 relative group"
            >
              {link.name}
              <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-blue-600 transform scale-x-0 transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Select language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium uppercase">{language}</span>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
                {[
                  { code: "en", label: "English" },
                  { code: "fr", label: "French" },
                  { code: "rw", label: "Kinyarwanda" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as "en" | "es" | "fr" | "de" | "ja" | "rw");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === lang.code
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {lang.label}
                    {language === lang.code && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-smooth dark:bg-slate-800 dark:hover:bg-slate-700"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl animate-slide-down dark:bg-slate-900/95 dark:border-slate-700">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-smooth dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}