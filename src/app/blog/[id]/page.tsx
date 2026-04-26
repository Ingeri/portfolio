"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Clock, Calendar, User, Send, MessageCircle } from "lucide-react";

interface Rating {
  id: string;
  score: number;
  userName: string;
  comment: string | null;
  createdAt: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/blog/${articleId}`);
        if (!res.ok) throw new Error("Failed to fetch article");
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/blog/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          score: userRating,
          userName: userName || "Anonymous",
          comment: comment || null,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        // Refresh article data to show new rating
        const updatedRes = await fetch(`/api/blog/${articleId}`);
        const updatedData = await updatedRes.json();
        setArticle(updatedData);
        // Reset form
        setUserRating(0);
        setComment("");
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number = 0, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRate?.(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (interactive ? hoverRating || userRating : Math.round(rating))
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-300 dark:text-slate-600"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-96 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Article not found
        </h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Article Header */}
      <article className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            {article.averageRating > 0 ? `${article.averageRating.toFixed(1)} (${article.totalRatings})` : "No ratings"}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p className="text-slate-500 italic">Full content coming soon...</p>
          )}
        </div>
      </article>

      {/* Rating & Comment Section */}
      <section className="border-t border-slate-200 dark:border-slate-700 pt-12 space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Rate & Comment
        </h2>

        {/* Rating Form */}
        <form onSubmit={handleSubmitRating} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Your Rating
            </label>
            {renderStars(0, true, setUserRating)}
            {userRating > 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You rated: {userRating} star{userRating !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Your Name (optional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Anonymous"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts on this article..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || userRating === 0}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Rating
              </>
            )}
          </button>

          {submitSuccess && (
            <p className="text-green-600 dark:text-green-400 font-medium">
              Thank you for your rating!
            </p>
          )}
        </form>

        {/* Existing Ratings */}
        {article.ratings.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Previous Ratings & Comments
            </h3>
            <div className="space-y-4">
              {article.ratings.map((rating) => (
                <div
                  key={rating.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {rating.userName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.score
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {rating.comment && (
                    <p className="text-slate-600 dark:text-slate-400">
                      {rating.comment}
                    </p>
                  )}
                  <time className="text-xs text-slate-500 dark:text-slate-500">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </time>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
