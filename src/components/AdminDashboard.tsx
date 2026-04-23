'use client';

import React, { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  role: string;
  summary: string;
  tech: string;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Load data
  useEffect(() => {
    fetchProjects();
    fetchArticles();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      summary: '',
      tech: '',
    });
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setShowForm(true);
  };

  const handleAddArticle = () => {
    setEditingId(null);
    setFormData({
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      category: '',
      readTime: '',
    });
    setShowForm(true);
  };

  const handleEditArticle = (article: BlogArticle) => {
    setEditingId(article.id);
    setFormData(article);
    setShowForm(true);
  };

  const handleSaveProject = async () => {
    try {
      if (editingId) {
        const res = await fetch('/api/admin/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        if (res.ok) {
          fetchProjects();
          setShowForm(false);
        }
      } else {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchProjects();
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (editingId) {
        const res = await fetch('/api/admin/blog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        if (res.ok) {
          fetchArticles();
          setShowForm(false);
        }
      } else {
        const res = await fetch('/api/admin/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchArticles();
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const res = await fetch(`/api/admin/projects?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const res = await fetch(`/api/admin/blog?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchArticles();
        }
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'blog'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Blog Articles ({articles.length})
          </button>
        </div>

        {/* Add Button */}
        <button
          onClick={() =>
            activeTab === 'projects' ? handleAddProject() : handleAddArticle()
          }
          disabled={showForm}
          className="mb-8 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 rounded-lg font-semibold transition-colors"
        >
          + Add {activeTab === 'projects' ? 'Project' : 'Article'}
        </button>

        {/* Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-slate-800 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' : 'Article'}
            </h2>

            {activeTab === 'projects' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Portfolio Dashboard"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Role *</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Frontend Developer"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Summary *</label>
                  <textarea
                    value={formData.summary || ''}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Project description..."
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Technologies *</label>
                  <input
                    type="text"
                    value={formData.tech || ''}
                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                    placeholder="e.g., Next.js · Tailwind · TypeScript"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Article title..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Excerpt *</label>
                  <textarea
                    value={formData.excerpt || ''}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Article excerpt..."
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date *</label>
                    <input
                      type="text"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="April 15, 2026"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Frontend"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Read Time *</label>
                  <input
                    type="text"
                    value={formData.readTime || ''}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 8 min read"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => (activeTab === 'projects' ? handleSaveProject() : handleSaveArticle())}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Projects List */}
        {activeTab === 'projects' && (
          <div className="grid gap-4">
            {projects.length === 0 ? (
              <p className="text-slate-400">No projects yet.</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <p className="text-sm text-blue-400 mb-2">{project.role}</p>
                      <p className="text-slate-300 mb-2">{project.summary}</p>
                      <p className="text-xs text-slate-500">{project.tech}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Blog List */}
        {activeTab === 'blog' && (
          <div className="grid gap-4">
            {articles.length === 0 ? (
              <p className="text-slate-400">No articles yet.</p>
            ) : (
              articles.map((article) => (
                <div key={article.id} className="p-4 bg-slate-800 border border-slate-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{article.title}</h3>
                      <div className="flex gap-2 my-2 text-sm">
                        <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded">
                          {article.category}
                        </span>
                        <span className="text-slate-400">{article.date}</span>
                        <span className="text-slate-400">{article.readTime}</span>
                      </div>
                      <p className="text-slate-300">{article.excerpt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
