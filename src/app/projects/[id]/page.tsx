"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Calendar, ExternalLink, Send, MessageCircle, User } from "lucide-react";

interface Rating {
  id: string;
  score: number;
  userName: string;
  comment: string | null;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
  content?: string;
  imageUrl: string | null;
  projectUrl: string | null;
  githubUrl: string | null;
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
}

// GitHub icon component
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/projects/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          score: userRating,
          userName: userName || "Anonymous",
          comment: comment || null,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        // Refresh project data
        const updatedRes = await fetch(`/api/projects/${projectId}`);
        const updatedData = await updatedRes.json();
        setProject(updatedData);
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
          <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Project not found
        </h1>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <article className="space-y-6">
        {/* Image */}
        {project.imageUrl ? (
          <div className="aspect-video relative overflow-hidden rounded-2xl">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-6xl font-bold">{project.name.charAt(0)}</span>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
            {project.role}
          </span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            {project.averageRating > 0 
              ? `${project.averageRating.toFixed(1)} (${project.totalRatings} ratings)` 
              : "No ratings yet"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
          {project.name}
        </h1>

        {/* Summary */}
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {project.summary}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.split(",").map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <GitHubIcon className="w-5 h-5" />
              View Code
            </a>
          )}
        </div>
      </article>

      {/* Rating & Comment Section */}
      <section className="border-t border-slate-200 dark:border-slate-700 pt-12 space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Rate & Review This Project
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
              Comment / Review (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this project..."
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
                Submit Review
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
        {project.ratings.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Previous Reviews
            </h3>
            <div className="space-y-4">
              {project.ratings.map((rating) => (
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
