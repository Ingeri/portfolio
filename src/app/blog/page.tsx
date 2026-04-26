"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Star, Clock, Calendar, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  readTime: string;
  averageRating?: number;
  totalRatings?: number;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating">("newest");

  // Extract unique categories
  const categories = ["All", ...new Set(articles.map((a) => a.category))];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter and sort articles
  useEffect(() => {
    let filtered = articles;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    // Sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "rating":
          return (b.averageRating || 0) - (a.averageRating || 0);
        default:
          return 0;
      }
    });

    setFilteredArticles(filtered);
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-300 dark:text-slate-600"
            }`}
          />
        ))}
        <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
          {rating > 0 ? rating.toFixed(1) : "No ratings"}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
          {t.articles}
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white">
          {t.blogTitle}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t.blogDesc}
        </p>
      </section>

      {/* Search and Filters */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Results count */}
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No articles found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <article
              key={article.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900 dark:border-slate-700 dark:hover:border-blue-800"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Card Content */}
              <div className="flex-1 p-6 space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                  {renderStars(article.averageRating)}
                </div>

                {/* Title */}
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-600 dark:text-slate-400 leading-7 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Read More Link */}
              <Link
                href={`/blog/${article.id}`}
                className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 group-hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-800/50 dark:group-hover:bg-blue-950/30 transition-colors"
              >
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Read Article
                </span>
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
