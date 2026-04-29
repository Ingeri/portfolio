'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, FolderGit2, FileText, Plus, Pencil, Trash2, X, Save,
  Loader2, Search, Star, CheckCircle2, Layers, LogOut, ChevronRight, User,
  BarChart3, Bell, Sparkles, Quote, Users, Headphones, Workflow, Settings, Download
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'projects' | 'blog' | 'features' | 'ratings' | 'process' | 'testimonials' | 'adminUsers';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [projects, setProjects] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [process, setProcess] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  // Notifications
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchAllData();

    if (supabase) {
      const channel = supabase.channel('admin-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
          const newNotif = {
            id: Date.now(),
            message: `${payload.eventType} event on ${payload.table}`,
            time: new Date().toLocaleTimeString(),
            unread: true
          };
          setNotifications(prev => [newNotif, ...prev]);
          // Re-fetch data if relevant table changes
          fetchAllData();
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, []);

  const fetchAllData = async () => {
    try {
      const [projRes, blogRes, featRes, procRes, testRes, userRes, ratRes] = await Promise.all([
        fetch('/api/admin/projects').catch(() => null),
        fetch('/api/admin/blog').catch(() => null),
        fetch('/api/admin/features').catch(() => null),
        fetch('/api/admin/process').catch(() => null),
        fetch('/api/admin/testimonials').catch(() => null),
        fetch('/api/admin/adminUsers').catch(() => null),
        fetch('/api/admin/ratings').catch(() => null),
      ]);

      if (projRes && projRes.ok) { const d = await projRes.json(); setProjects(d || []); }
      if (blogRes && blogRes.ok) { const d = await blogRes.json(); setArticles(d.articles || []); }
      if (featRes && featRes.ok) { const d = await featRes.json(); setFeatures(d.features || []); }
      if (procRes && procRes.ok) { const d = await procRes.json(); setProcess(d.process || []); }
      if (testRes && testRes.ok) { const d = await testRes.json(); setTestimonials(d.testimonials || []); }
      if (userRes && userRes.ok) { const d = await userRes.json(); setAdminUsers(d.adminUsers || []); }
      if (ratRes && ratRes.ok) { const d = await ratRes.json(); setRatings(d.ratings || []); }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(v => {
        if (v === null || v === undefined) return '""';
        return typeof v === 'object' ? `"${JSON.stringify(v).replace(/"/g, '""')}"` : `"${String(v).replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({});
    setShowForm(true);
  };

  const handleSave = async (endpoint: string, fetchFn: () => void) => {
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch(`/api/admin/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowForm(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        fetchAllData(); // Refresh all
      }
    } catch (error) {
      console.error(`Error saving ${endpoint}:`, error);
    }
  };

  const handleDelete = async (endpoint: string, id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await fetch(`/api/admin/${endpoint}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (res.ok) {
          fetchAllData();
        }
      } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
      }
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const SidebarItem = ({ id, icon: Icon, label }: { id: TabType, icon: any, label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setSearchQuery(''); setShowForm(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        activeTab === id
          ? 'bg-gradient-to-r from-[#3525cd]/10 to-[#3525cd]/5 text-[#3525cd] shadow-sm'
          : 'text-[#464555] hover:bg-white/50 hover:text-[#131b2e]'
      }`}
    >
      <Icon className={`w-4 h-4 ${activeTab === id ? 'text-[#3525cd]' : ''}`} />
      {label}
    </button>
  );

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) => (
    <div className="bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-white to-white/50 shadow-sm border border-white">
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <p className="text-xs font-semibold text-[#777587] tracking-wide mb-1 uppercase">
        {label}
      </p>
      <p className="text-3xl font-bold text-[#131b2e]">
        {value}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] to-[#f2f0fc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#3525cd]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="font-medium">Loading Executive Suite...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8ff] to-[#f2f0fc] flex font-sans text-[#131b2e]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed h-full flex flex-col z-40">
        <div className="p-6 border-b border-white/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3525cd] to-[#4f46e5] rounded-xl flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Portfolio Admin</h1>
              <p className="text-[10px] text-[#777587] tracking-widest font-semibold uppercase mt-0.5">Executive Suite</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="projects" icon={FolderGit2} label="Projects" />
          <SidebarItem id="blog" icon={FileText} label="Articles" />
          <SidebarItem id="features" icon={Sparkles} label="Features" />
          <SidebarItem id="process" icon={Workflow} label="Process" />
          <SidebarItem id="testimonials" icon={Quote} label="Testimonials" />
          <SidebarItem id="ratings" icon={Star} label="Ratings" />
          <SidebarItem id="adminUsers" icon={Users} label="Admin Users" />
        </nav>

        <div className="p-4 border-t border-white/60">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/60 sticky top-0 z-30 px-8 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4 justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777587]" />
              <input
                type="text"
                placeholder="Search across admin..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] shadow-inner transition-all placeholder:text-[#777587]"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 text-[#777587] hover:text-[#3525cd] hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-white relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full animate-pulse shadow-sm"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur-xl border border-white shadow-xl rounded-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
                      <h3 className="font-semibold">Live Notifications</h3>
                      <button onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))} className="text-xs text-[#3525cd]">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-6 text-sm text-center text-[#777587]">No notifications yet.</p>
                      ) : (
                        notifications.map((n, idx) => (
                          <div key={idx} className={`p-4 border-b border-gray-50 text-sm ${n.unread ? 'bg-[#f2f0fc]/50' : ''}`}>
                            <p className="font-medium">{n.message}</p>
                            <p className="text-xs text-[#777587] mt-1">{n.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-gray-200"></div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-[#777587]">Super Admin</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#3525cd] to-[#4f46e5] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-8">
          {saveSuccess && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium text-sm">Action completed successfully!</span>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={FolderGit2} label="Projects" value={projects.length} color="#3525cd" />
                <StatCard icon={FileText} label="Articles" value={articles.length} color="#006c49" />
                <StatCard icon={Star} label="Total Ratings" value={ratings.length} color="#b37700" />
                <StatCard icon={Users} label="Admin Users" value={adminUsers.length} color="#ba1a1a" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-2xl overflow-hidden">
                  <div className="p-5 border-b border-white/60 flex items-center justify-between bg-white/30">
                    <h3 className="font-semibold text-lg">Recent Projects</h3>
                    <button onClick={() => setActiveTab('projects')} className="text-sm text-[#3525cd] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center gap-4 p-3 hover:bg-white/50 rounded-xl transition-all">
                        <div className="w-10 h-10 bg-[#f2f0fc] rounded-lg flex items-center justify-center flex-shrink-0 text-[#3525cd]">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{project.name}</h4>
                          <p className="text-xs text-[#777587] truncate">{project.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white/70 backdrop-blur-md border border-white shadow-sm rounded-2xl overflow-hidden">
                  <div className="p-5 border-b border-white/60 flex items-center justify-between bg-white/30">
                    <h3 className="font-semibold text-lg">Recent Articles</h3>
                    <button onClick={() => setActiveTab('blog')} className="text-sm text-[#006c49] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2">
                    {articles.slice(0, 3).map((article) => (
                      <div key={article.id} className="flex items-center gap-4 p-3 hover:bg-white/50 rounded-xl transition-all">
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 text-[#006c49]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{article.title}</h4>
                          <p className="text-xs text-[#777587] truncate">{article.category} • {article.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shared Content Tab Layout */}
          {activeTab !== 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold capitalize tracking-tight flex items-center gap-3">
                  {activeTab === 'blog' ? 'Articles' : activeTab === 'adminUsers' ? 'Admin Users' : activeTab}
                </h2>
                
                {!showForm && (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button 
                      onClick={() => {
                        const dataMap: any = { projects, blog: articles, features, process, testimonials, adminUsers, ratings };
                        exportToCSV(dataMap[activeTab], `${activeTab}_export`);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/80 border border-white shadow-sm hover:shadow text-[#131b2e] text-sm font-semibold rounded-xl transition-all"
                    >
                      <Download className="w-4 h-4" /> Report
                    </button>
                    {activeTab !== 'ratings' && (
                      <button 
                        onClick={handleAdd} 
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] hover:shadow-lg hover:-translate-y-0.5 text-white text-sm font-semibold rounded-xl transition-all"
                      >
                        <Plus className="w-4 h-4" /> New Item
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Edit/Add Form */}
              {showForm && (
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-lg rounded-2xl p-8 animate-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">{editingId ? 'Edit Item' : 'Create New Item'}</h3>
                    <button onClick={() => setShowForm(false)} className="p-2 text-[#777587] hover:bg-gray-100 rounded-xl transition-all"><X className="w-5 h-5" /></button>
                  </div>
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Dynamic Fields based on tab */}
                    {activeTab === 'projects' && (
                      <>
                        <InputField label="Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
                        <InputField label="Role" value={formData.role} onChange={(v: string) => setFormData({...formData, role: v})} />
                        <InputField label="Technologies" value={formData.tech} onChange={(v: string) => setFormData({...formData, tech: v})} />
                        <div className="sm:col-span-2"><TextAreaField label="Summary" value={formData.summary} onChange={(v: string) => setFormData({...formData, summary: v})} /></div>
                      </>
                    )}
                    {activeTab === 'blog' && (
                      <>
                        <InputField label="Title" value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                        <InputField label="Category" value={formData.category} onChange={(v: string) => setFormData({...formData, category: v})} />
                        <InputField label="Date" value={formData.date} onChange={(v: string) => setFormData({...formData, date: v})} />
                        <InputField label="Read Time" value={formData.readTime} onChange={(v: string) => setFormData({...formData, readTime: v})} />
                        <div className="sm:col-span-2"><TextAreaField label="Excerpt" value={formData.excerpt} onChange={(v: string) => setFormData({...formData, excerpt: v})} /></div>
                      </>
                    )}
                    {activeTab === 'features' && (
                      <>
                        <InputField label="Title" value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                        <InputField label="Icon Name" value={formData.icon} onChange={(v: string) => setFormData({...formData, icon: v})} />
                        <InputField label="Order" type="number" value={formData.order} onChange={(v: string) => setFormData({...formData, order: v})} />
                        <div className="sm:col-span-2"><TextAreaField label="Description" value={formData.description} onChange={(v: string) => setFormData({...formData, description: v})} /></div>
                      </>
                    )}
                    {activeTab === 'process' && (
                      <>
                        <InputField label="Title" value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                        <InputField label="Step Number" type="number" value={formData.stepNumber} onChange={(v: string) => setFormData({...formData, stepNumber: v})} />
                        <div className="sm:col-span-2"><TextAreaField label="Description" value={formData.description} onChange={(v: string) => setFormData({...formData, description: v})} /></div>
                      </>
                    )}
                    {activeTab === 'testimonials' && (
                      <>
                        <InputField label="Name" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} />
                        <InputField label="Role" value={formData.role} onChange={(v: string) => setFormData({...formData, role: v})} />
                        <div className="sm:col-span-2"><TextAreaField label="Content" value={formData.content} onChange={(v: string) => setFormData({...formData, content: v})} /></div>
                      </>
                    )}
                    {activeTab === 'adminUsers' && (
                      <>
                        <InputField label="Email" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
                        <InputField label={editingId ? "New Password (Optional)" : "Password"} type="password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                    <button 
                      onClick={() => handleSave(activeTab, fetchAllData)} 
                      className="flex items-center gap-2 px-6 py-3 bg-[#3525cd] hover:bg-[#4f46e5] text-white font-medium rounded-xl shadow-md transition-all"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                    <button onClick={() => setShowForm(false)} className="px-6 py-3 text-[#777587] hover:bg-gray-100 font-medium rounded-xl transition-all">Cancel</button>
                  </div>
                </div>
              )}

              {/* Data Table */}
              {!showForm && (
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-sm rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-[#f2f0fc]/50 text-xs text-[#777587] uppercase tracking-wider font-semibold border-b border-white/60">
                        <tr>
                          {activeTab === 'projects' && <><th className="px-6 py-4">Project</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Tech</th></>}
                          {activeTab === 'blog' && <><th className="px-6 py-4">Article</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Date</th></>}
                          {activeTab === 'features' && <><th className="px-6 py-4">Title</th><th className="px-6 py-4">Icon</th><th className="px-6 py-4">Order</th></>}
                          {activeTab === 'process' && <><th className="px-6 py-4">Step</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Desc</th></>}
                          {activeTab === 'testimonials' && <><th className="px-6 py-4">Name</th><th className="px-6 py-4">Role</th></>}
                          {activeTab === 'adminUsers' && <><th className="px-6 py-4">Email</th><th className="px-6 py-4">Created</th></>}
                          {activeTab === 'ratings' && <><th className="px-6 py-4">Target</th><th className="px-6 py-4">Score</th><th className="px-6 py-4">User</th><th className="px-6 py-4">Comment</th></>}
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50/50">
                        {/* Dynamic Rows */}
                        {(activeTab === 'projects' ? projects :
                          activeTab === 'blog' ? articles :
                          activeTab === 'features' ? features :
                          activeTab === 'process' ? process :
                          activeTab === 'testimonials' ? testimonials :
                          activeTab === 'adminUsers' ? adminUsers :
                          ratings).map((item: any, i: number) => (
                          <tr key={item.id || i} className="hover:bg-white/60 transition-colors group">
                            {activeTab === 'projects' && <><td className="px-6 py-4 font-medium">{item.name}</td><td className="px-6 py-4 text-[#777587]">{item.role}</td><td className="px-6 py-4 text-[#777587]">{String(item.tech).slice(0, 30)}</td></>}
                            {activeTab === 'blog' && <><td className="px-6 py-4 font-medium">{item.title}</td><td className="px-6 py-4 text-[#777587]">{item.category}</td><td className="px-6 py-4 text-[#777587]">{item.date}</td></>}
                            {activeTab === 'features' && <><td className="px-6 py-4 font-medium">{item.title}</td><td className="px-6 py-4 text-[#777587]">{item.icon}</td><td className="px-6 py-4 text-[#777587]">{item.order}</td></>}
                            {activeTab === 'process' && <><td className="px-6 py-4 font-medium">{item.stepNumber}</td><td className="px-6 py-4">{item.title}</td><td className="px-6 py-4 text-[#777587]">{String(item.description).slice(0, 30)}...</td></>}
                            {activeTab === 'testimonials' && <><td className="px-6 py-4 font-medium">{item.name}</td><td className="px-6 py-4 text-[#777587]">{item.role}</td></>}
                            {activeTab === 'adminUsers' && <><td className="px-6 py-4 font-medium">{item.email}</td><td className="px-6 py-4 text-[#777587]">{new Date(item.createdAt).toLocaleDateString()}</td></>}
                            {activeTab === 'ratings' && <><td className="px-6 py-4 font-medium">{item.project?.name || item.article?.title || 'Unknown'}</td><td className="px-6 py-4 flex items-center text-amber-500 font-bold">{item.score} <Star className="w-3 h-3 ml-1 fill-amber-500" /></td><td className="px-6 py-4 text-[#777587]">{item.userName}</td><td className="px-6 py-4 text-[#777587]">{String(item.comment || '').slice(0, 30)}</td></>}
                            
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {activeTab !== 'ratings' && (
                                  <button onClick={() => handleEdit(item)} className="p-2 text-[#777587] hover:text-[#3525cd] hover:bg-indigo-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                )}
                                <button onClick={() => handleDelete(activeTab === 'blog' ? 'blog' : activeTab, item.id)} className="p-2 text-[#777587] hover:text-[#ba1a1a] hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Empty State */}
                    {(activeTab === 'projects' ? projects : activeTab === 'blog' ? articles : activeTab === 'features' ? features : activeTab === 'process' ? process : activeTab === 'testimonials' ? testimonials : activeTab === 'adminUsers' ? adminUsers : ratings).length === 0 && (
                      <div className="py-16 text-center text-[#777587]">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                          <Layers className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="font-medium">No records found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const InputField = ({ label, value, onChange, type = 'text' }: any) => (
  <div>
    <label className="block text-xs font-bold text-[#131b2e] mb-2 tracking-wide">{label}</label>
    <input 
      type={type} 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
      className="w-full px-4 py-3 bg-[#faf8ff] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all shadow-inner" 
    />
  </div>
);

const TextAreaField = ({ label, value, onChange }: any) => (
  <div>
    <label className="block text-xs font-bold text-[#131b2e] mb-2 tracking-wide">{label}</label>
    <textarea 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
      rows={4} 
      className="w-full px-4 py-3 bg-[#faf8ff] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all shadow-inner resize-none" 
    />
  </div>
);
