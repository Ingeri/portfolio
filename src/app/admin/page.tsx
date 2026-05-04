'use client';

import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { Shield, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Layers } from 'lucide-react';

export default function AdminPage() {
  const { isAuthenticated, login, logout, isLoading } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    const success = await login(email, password);
    if (success) {
      setEmail('');
      setPassword('');
    } else {
      setError('Invalid email or password');
      setPassword('');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#777587]">
          <div className="w-5 h-5 border-2 border-[#3525cd]/30 border-t-[#3525cd] rounded-full animate-spin" />
          <span style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-[#dae2fd] rounded-lg p-8 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
            {/* Logo/Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#3525cd] rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#131b2e]" style={{ fontFamily: 'Manrope, sans-serif' }}>Portfolio Admin</h1>
                <p className="text-xs text-[#464555]">Executive Suite</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-[#131b2e] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Welcome back</h2>
            <p className="text-sm text-[#464555] mb-6">Sign in to manage your portfolio content</p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-[#131b2e] tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777587]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    disabled={isLoggingIn}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm text-[#131b2e] placeholder-[#777587] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] disabled:opacity-50 transition-all"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-[#131b2e] tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777587]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoggingIn}
                    className="w-full pl-10 pr-10 py-2.5 bg-[#faf8ff] border border-[#c7c4d8] rounded-lg text-sm text-[#131b2e] placeholder-[#777587] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] disabled:opacity-50 transition-all"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoggingIn}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777587] hover:text-[#464555] disabled:opacity-50 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-[#ffdad6] border border-[#ba1a1a]/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-[#ba1a1a] flex-shrink-0" />
                  <p className="text-sm text-[#ba1a1a]" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn || !email || !password}
                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3525cd] hover:bg-[#4f46e5] disabled:bg-[#c7c4d8] text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 shadow-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-[#777587]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Protected area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <AdminDashboard onLogout={handleLogout} />
    </div>
  );
}
