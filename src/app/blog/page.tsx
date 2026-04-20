const articles = [
  {
    id: 1,
    title: "Building Modern Web Interfaces with React and Tailwind",
    excerpt: "Learn how to create beautiful, responsive user interfaces using React and Tailwind CSS with practical examples and best practices.",
    date: "April 15, 2026",
    category: "Frontend",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Scaling Node.js APIs for Production",
    excerpt: "Deep dive into building scalable and performant REST APIs using Node.js, Express, and best practices for production environments.",
    date: "April 10, 2026",
    category: "Backend",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Next.js 16 - What's New and Exciting",
    excerpt: "Explore the latest features in Next.js 16, including improved performance, new rendering options, and developer experience enhancements.",
    date: "April 5, 2026",
    category: "Framework",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "TypeScript Best Practices for Large Projects",
    excerpt: "Master TypeScript with advanced patterns, type safety strategies, and architectural approaches for maintaining large codebases.",
    date: "March 28, 2026",
    category: "TypeScript",
    readTime: "15 min read",
  },
  {
    id: 5,
    title: "The Art of Component Design Systems",
    excerpt: "Discover how to build and maintain effective component libraries that scale with your organization's needs.",
    date: "March 20, 2026",
    category: "Design",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Deploying Full-Stack Applications Successfully",
    excerpt: "Complete guide to deploying modern full-stack applications on various platforms with CI/CD pipelines and monitoring.",
    date: "March 15, 2026",
    category: "DevOps",
    readTime: "11 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      <section className="space-y-4 animate-fade-in">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
          Articles
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-bold">
          Thoughts on web development, software architecture, and modern tooling.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Sharing insights from years of building scalable web applications and tackling real-world engineering challenges.
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
                Read →
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
