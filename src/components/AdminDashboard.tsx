'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Search,
  Star,
  CheckCircle2,
  Layers,
  LogOut,
  ChevronRight,
  User,
  BarChart3,
  Bell,
  Sparkles,
  Quote,
  Users,
  Headphones,
  Workflow,
  Settings
} from 'lucide-react';

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

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'projects' | 'blog' | 'features' | 'ratings' | 'process' | 'testimonials' | 'adminUsers' | 'support';

const COLORS = {
  surface: '#faf8ff',
  surfaceContainer: '#eaedff',
  surfaceContainerHigh: '#e2e7ff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#464555',
  outline: '#777587',
  outlineVariant: '#c7c4d8',
  primary: '#3525cd',
  primaryContainer: '#4f46e5',
  onPrimary: '#ffffff',
  secondary: '#006c49',
  secondaryContainer: '#6cf8bb',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
};

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchArticles();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleAddProject = () => {
    setEditingId(null);
    setFormData({});
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setFormData({ ...project });
    setShowForm(true);
  };

  const handleSaveProject = async () => {
    if (!formData.name || !formData.role || !formData.summary || !formData.tech) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const url = editingId ? `/api/admin/projects` : '/api/admin/projects';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowForm(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchProjects();
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const res = await fetch(`/api/admin/projects`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          fetchProjects();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleAddArticle = () => {
    setEditingId(null);
    setFormData({});
    setShowForm(true);
  };

  const handleEditArticle = (article: BlogArticle) => {
    setEditingId(article.id);
    setFormData({ ...article });
    setShowForm(true);
  };

  const handleSaveArticle = async () => {
    if (!formData.title || !formData.excerpt || !formData.date || !formData.category || !formData.readTime) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const url = editingId ? `/api/admin/blog` : '/api/admin/blog';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowForm(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchArticles();
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const res = await fetch(`/api/admin/blog`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          fetchArticles();
        }
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="bg-white border border-[#dae2fd] rounded-lg p-6 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <p className="text-xs font-semibold text-[#777587] tracking-wide mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </p>
      <p className="text-2xl font-semibold text-[#131b2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>
        {value}
      </p>
    </div>
  );

  const SidebarItem = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setSearchQuery(''); setShowForm(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
        activeTab === id
          ? 'bg-[#e2dfff] text-[#3525cd] border-l-2 border-[#3525cd]'
          : 'text-[#464555] hover:bg-[#eaedff] hover:text-[#131b2e]'
      }`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#777587]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span style={{ fontFamily: 'Inter, sans-serif' }}>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-[#dae2fd] fixed h-full flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-[#dae2fd]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#3525cd] rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[#131b2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>Portfolio Admin</h1>
              <p className="text-[10px] text-[#777587] tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>EXECUTIVE SUITE</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="projects" icon={FolderGit2} label="Projects" />
          <SidebarItem id="blog" icon={FileText} label="Blogs Article" />
          <SidebarItem id="features" icon={Sparkles} label="Features" />
          <SidebarItem id="ratings" icon={Star} label="Rating" />
          <SidebarItem id="process" icon={Workflow} label="Process" />
          <SidebarItem id="testimonials" icon={Quote} label="Testimonial" />
          <SidebarItem id="adminUsers" icon={Users} label="Admin Users" />
          <SidebarItem id="support" icon={Headphones} label="Support" />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#dae2fd]">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#ba1a1a] hover:bg-[#ffdad6] transition-all" style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Right Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-[#dae2fd] sticky top-0 z-30 px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Search - takes remaining width */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777587]" />
              <input
                type="text"
                placeholder="Search..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm text-[#131b2e] placeholder-[#777587] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Actions - pushed to right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 text-[#777587] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-lg transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
              </button>
              <button className="p-2 text-[#777587] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-lg transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile - pushed to right */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#dae2fd] flex-shrink-0">
              <div className="text-right">
                <p className="text-sm font-medium text-[#131b2e]" style={{ fontFamily: 'Inter, sans-serif' }}>Admin User</p>
                <p className="text-xs text-[#777587]" style={{ fontFamily: 'Inter, sans-serif' }}>Super Admin</p>
              </div>
              <div className="w-9 h-9 bg-[#3525cd] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={FolderGit2} label="TOTAL PROJECTS" value={projects.length} color="#3525cd" />
                <StatCard icon={FileText} label="BLOG ARTICLES" value={articles.length} color="#006c49" />
                <StatCard icon={Star} label="AVG. RATING" value="4.9" color="#684000" />
                <StatCard icon={BarChart3} label="MONTHLY VISITORS" value="12.4k" color="#3525cd" />
              </div>

              {/* Recent Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[#dae2fd] rounded-lg shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                  <div className="p-4 border-b border-[#dae2fd] flex items-center justify-between">
                    <h3 className="font-semibold text-[#131b2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Projects</h3>
                    <button onClick={() => setActiveTab('projects')} className="text-sm text-[#3525cd] hover:text-[#4f46e5] font-medium flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-start gap-3 py-3 border-b border-[#eaedff] last:border-0">
                        <div className="w-10 h-10 bg-[#e2dfff] rounded-lg flex items-center justify-center flex-shrink-0">
                          <FolderGit2 className="w-5 h-5 text-[#3525cd]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#131b2e] text-sm truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{project.name}</h4>
                          <p className="text-xs text-[#777587]" style={{ fontFamily: 'Inter, sans-serif' }}>{project.role}</p>
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <p className="text-sm text-[#777587] text-center py-8" style={{ fontFamily: 'Inter, sans-serif' }}>No projects yet</p>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-[#dae2fd] rounded-lg shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                  <div className="p-4 border-b border-[#dae2fd] flex items-center justify-between">
                    <h3 className="font-semibold text-[#131b2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Articles</h3>
                    <button onClick={() => setActiveTab('blog')} className="text-sm text-[#3525cd] hover:text-[#4f46e5] font-medium flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    {articles.slice(0, 3).map((article) => (
                      <div key={article.id} className="flex items-start gap-3 py-3 border-b border-[#eaedff] last:border-0">
                        <div className="w-10 h-10 bg-[#6cf8bb] rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-[#006c49]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#131b2e] text-sm truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{article.title}</h4>
                          <p className="text-xs text-[#777587]" style={{ fontFamily: 'Inter, sans-serif' }}>{article.category} • {article.date}</p>
                        </div>
                      </div>
                    ))}
                    {articles.length === 0 && (
                      <p className="text-sm text-[#777587] text-center py-8" style={{ fontFamily: 'Inter, sans-serif' }}>No articles yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {!showForm && (
                <div className="flex items-center justify-between">
                  <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777587]" />
                    <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-[#dae2fd] rounded-lg text-sm" />
                  </div>
                  <button onClick={handleAddProject} className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg"><Plus className="w-4 h-4" /> New Project</button>
                </div>
              )}

              {saveSuccess && (
                <div className="flex items-center gap-2 p-3 bg-[#6cf8bb] border border-[#006c49]/20 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                  <span className="text-sm text-[#006c49]">Saved successfully!</span>
                </div>
              )}

              {showForm && (
                <div className="bg-white border border-[#dae2fd] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#131b2e]">{editingId ? 'Edit Project' : 'New Project'}</h3>
                    <button onClick={() => setShowForm(false)} className="p-1.5 text-[#777587] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-md"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">PROJECT NAME</label>
                      <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Portfolio Dashboard" className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">ROLE</label>
                      <input type="text" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., Frontend Developer" className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">TECHNOLOGIES</label>
                      <input type="text" value={formData.tech || ''} onChange={(e) => setFormData({ ...formData, tech: e.target.value })} placeholder="e.g., Next.js, Tailwind" className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">SUMMARY</label>
                      <textarea value={formData.summary || ''} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} placeholder="Project description..." rows={3} className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6 pt-4 border-t border-[#dae2fd]">
                    <button onClick={handleSaveProject} className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg"><Save className="w-4 h-4" /> Save Project</button>
                    <button onClick={() => setShowForm(false)} className="px-4 py-2 text-[#777587] hover:text-[#131b2e] text-sm font-medium">Cancel</button>
                  </div>
                </div>
              )}

              {!showForm && (
                <div className="bg-white border border-[#dae2fd] rounded-lg overflow-hidden">
                  {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#eaedff] rounded-xl flex items-center justify-center mx-auto mb-4"><FolderGit2 className="w-8 h-8 text-[#777587]" /></div>
                      <p className="text-[#464555] font-medium">No projects found</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-[#f2f3ff]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#777587]">PROJECT</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#777587]">ROLE</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#777587]">TECH STACK</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-[#777587]">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#eaedff]">
                        {filteredProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-[#faf8ff]">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#e2dfff] rounded-lg flex items-center justify-center"><FolderGit2 className="w-4 h-4 text-[#3525cd]" /></div>
                                <div>
                                  <p className="font-medium text-[#131b2e] text-sm">{project.name}</p>
                                  <p className="text-xs text-[#777587]">{project.summary.slice(0, 50)}...</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4"><span className="px-2.5 py-1 bg-[#e2dfff] text-[#3525cd] text-xs font-medium rounded-md">{project.role}</span></td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {project.tech.split(',').slice(0, 3).map((tech, i) => (
                                  <span key={i} className="px-2 py-1 bg-[#faf8ff] text-[#464555] text-xs rounded-md border border-[#dae2fd]">{tech.trim()}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleEditProject(project)} className="p-2 text-[#777587] hover:text-[#3525cd] hover:bg-[#e2dfff] rounded-lg"><Pencil className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-[#777587] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="space-y-4">
              {!showForm && (
                <div className="flex items-center justify-between">
                  <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777587]" />
                    <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-[#dae2fd] rounded-lg text-sm" />
                  </div>
                  <button onClick={handleAddArticle} className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg"><Plus className="w-4 h-4" /> Create Article</button>
                </div>
              )}

              {saveSuccess && (
                <div className="flex items-center gap-2 p-3 bg-[#6cf8bb] border border-[#006c49]/20 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                  <span className="text-sm text-[#006c49]">Saved successfully!</span>
                </div>
              )}

              {showForm && (
                <div className="bg-white border border-[#dae2fd] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-[#131b2e]">{editingId ? 'Edit Article' : 'New Article'}</h3>
                    <button onClick={() => setShowForm(false)} className="p-1.5 text-[#777587] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-md"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">TITLE</label>
                      <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">CATEGORY</label>
                      <input type="text" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">READ TIME</label>
                      <input type="text" value={formData.readTime || ''} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">DATE</label>
                      <input type="text" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">EXCERPT</label>
                      <textarea value={formData.excerpt || ''} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm resize-none" />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6 pt-4 border-t border-[#dae2fd]">
                    <button onClick={handleSaveArticle} className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-lg"><Save className="w-4 h-4" /> Save Article</button>
                    <button onClick={() => setShowForm(false)} className="px-4 py-2 text-[#777587] hover:text-[#131b2e] text-sm font-medium">Cancel</button>
                  </div>
                </div>
              )}

              {!showForm && (
                <div className="bg-white border border-[#dae2fd] rounded-lg overflow-hidden">
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#eaedff] rounded-xl flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-[#777587]" /></div>
                      <p className="text-[#464555] font-medium">No articles found</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-[#f2f3ff]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#777587]">ARTICLE</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#777587]">CATEGORY</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-[#777587]">DATE</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-[#777587]">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#eaedff]">
                        {filteredArticles.map((article) => (
                          <tr key={article.id} className="hover:bg-[#faf8ff]">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#6cf8bb] rounded-lg flex items-center justify-center"><FileText className="w-4 h-4 text-[#006c49]" /></div>
                                <div>
                                  <p className="font-medium text-[#131b2e] text-sm">{article.title}</p>
                                  <p className="text-xs text-[#777587]">{article.excerpt.slice(0, 50)}...</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4"><span className="px-2.5 py-1 bg-[#6cf8bb] text-[#006c49] text-xs font-medium rounded-md">{article.category}</span></td>
                            <td className="px-6 py-4 text-sm text-[#464555]">{article.date}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleEditArticle(article)} className="p-2 text-[#777587] hover:text-[#3525cd] hover:bg-[#e2dfff] rounded-lg"><Pencil className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteArticle(article.id)} className="p-2 text-[#777587] hover:text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Placeholders */}
          {activeTab === 'features' && <PlaceholderCard icon={Sparkles} title="Features Portfolio" description="Manage the core value propositions and technical highlights. This feature is coming soon." />}
          {activeTab === 'ratings' && <PlaceholderCard icon={Star} title="Ratings & Reviews" description="Manage public feedback across your projects and articles. This feature is coming soon." />}
          {activeTab === 'process' && <PlaceholderCard icon={Workflow} title="Work Process" description="Manage your work process steps displayed on the homepage. This feature is coming soon." />}
          {activeTab === 'testimonials' && <PlaceholderCard icon={Quote} title="Testimonials" description="Manage client testimonials and reviews. This feature is coming soon." />}
          {activeTab === 'adminUsers' && <PlaceholderCard icon={Users} title="Admin Users" description="Manage admin users and permissions. This feature is coming soon." />}
          {activeTab === 'support' && <PlaceholderCard icon={Headphones} title="Support Center" description="Access support resources and documentation. This feature is coming soon." />}
        </main>
      </div>
    </div>
  );
}

function PlaceholderCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white border border-[#dae2fd] rounded-lg shadow-[0_2px_8px_rgba(15,23,42,0.04)] p-12 text-center">
      <div className="w-16 h-16 bg-[#e2dfff] rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-[#3525cd]" />
      </div>
      <h3 className="text-lg font-semibold text-[#131b2e] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}</h3>
      <p className="text-sm text-[#777587] max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
    </div>
  );
}
