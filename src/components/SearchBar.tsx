"use client";

import { useState } from "react";

interface SearchResult {
  title: string;
  path: string;
  category: string;
}

const searchData: SearchResult[] = [
  { title: "Home", path: "/", category: "Pages" },
  { title: "About Me", path: "/about", category: "Pages" },
  { title: "Projects", path: "/projects", category: "Pages" },
  { title: "Contact", path: "/contact", category: "Pages" },
  { title: "Settings", path: "/settings", category: "Pages" },
  { title: "React", path: "#", category: "Skills" },
  { title: "Next.js", path: "#", category: "Skills" },
  { title: "TypeScript", path: "#", category: "Skills" },
  { title: "Node.js", path: "#", category: "Skills" },
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (path: string) => {
    if (path.startsWith("/")) {
      window.location.href = path;
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-smooth dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 rounded-xl border border-slate-200 bg-white shadow-xl animate-slide-down dark:bg-slate-900 dark:border-slate-700">
          <input
            type="text"
            placeholder="Search pages, skills, projects..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            className="w-full rounded-t-xl border-b border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:bg-slate-900 dark:border-slate-700"
          />
          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.map((result) => (
                  <button
                    key={`${result.category}-${result.title}`}
                    onClick={() => handleSelect(result.path)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-smooth dark:hover:bg-slate-800 flex justify-between items-center group"
                  >
                    <span>
                      <p className="font-medium text-slate-900 dark:text-white">{result.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{result.category}</p>
                    </span>
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-400 dark:group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No results for "{query}"
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
