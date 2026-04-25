"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/admin/blog');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <section className="space-y-4 animate-fade-in">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
            {t.articles}
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-bold">
            {t.blogTitle}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {t.blogDesc}
          </p>
        </section>
        <div className="text-center text-slate-500">Loading articles...</div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      <section className="space-y-4 animate-fade-in">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
          {t.articles}
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-bold">
          {t.blogTitle}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          {t.blogDesc}
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article, index) => (
          <article
            key={article.id}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 animate-slide-up dark:bg-slate-900 dark:border-slate-700 dark:hover:border-blue-800"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {article.readTime}
              </span>
            </div>

            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 leading-7 mb-6">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <time className="text-sm text-slate-500 dark:text-slate-400">
                {article.date}
              </time>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover-scale transition-all">
                {t.readMore}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
