'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();

  // Load user: check localStorage first for instant display, then sync with server
  useEffect(() => {
    try {
      const local = localStorage.getItem('user');
      if (local) {
        setUser(JSON.parse(local));
      }
    } catch {}

    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => {
        if (d && d.user) {
          setUser(d.user);
          try {
            localStorage.setItem('user', JSON.stringify(d.user));
          } catch {}
        } else {
          setUser(null);
          try {
            localStorage.removeItem('user');
          } catch {}
        }
      })
      .catch(() => {});
  }, [pathname]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      localStorage.removeItem('user');
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setUser(null);
    setMobileOpen(false);
    window.location.href = '/login';
  }

  const navItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'AI Voice Interview', href: '/ai-interview', icon: '🎙️', badge: 'Voice' },
    { label: 'Prep Hub', href: '/prep', icon: '🎯' },
    { label: 'Company Mock Tests', href: '/mock-tests', icon: '📝' },
    { label: 'CRC Campus Drives', href: '/drives', icon: '💼' },
    { label: 'Placement Records', href: '/placements', icon: '🏆' },
    { label: 'File Bazaar', href: '/file-bazaar', icon: '📁' },
    { label: 'Student Dashboard', href: '/dashboard', icon: '📊' },
  ];

  if (user?.role === 'crc_admin') {
    navItems.push({ label: 'CRC Admin Panel', href: '/admin', icon: '⚙️' });
  }

  // Sidebar content component (reused in desktop and mobile drawer)
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-800">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EE6200] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
            AI
          </div>
          <div>
            <h1 className="font-bold text-xs uppercase tracking-tight text-slate-900 leading-tight">
              AI-POWERED TECHNICAL INTERVIEW PREPPER
            </h1>
            <p className="text-[11px] text-[#EE6200] font-medium">Invertis Placement Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-orange-50 text-[#EE6200] font-bold border border-orange-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-[#EE6200] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Voice Mode Quick Box */}
      <div className="p-3 border-t border-slate-200">
        <div className="bg-orange-50/80 border border-orange-200 rounded-lg p-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#EE6200] mb-1">
            <span>🎙️ Bol kar Interview Do</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            AI question bol kar puchega aur aap mic se bol kar jawab de sakte hain.
          </p>
          <Link
            href="/ai-interview"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block text-center bg-[#EE6200] text-white font-semibold py-1.5 rounded text-xs hover:bg-[#D45600] transition-colors"
          >
            Start Voice Interview →
          </Link>
        </div>
      </div>

      {/* User Section & Logout */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        {user ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-full bg-[#EE6200] text-white font-bold text-xs flex items-center justify-center shrink-0">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.course || user.role}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-center py-1.5 px-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="text-center py-1.5 px-2 rounded-lg bg-[#EE6200] text-xs font-semibold text-white hover:bg-[#D45600]"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      {/* Desktop Permanent Side Panel */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 border-r border-slate-200 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden cursor-pointer"
        />
      )}

      {/* Mobile Sliding Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white z-50 transform transition-transform duration-200 ease-in-out lg:hidden shadow-xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Minimalist Header Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 h-14 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Breadcrumb / Title */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-slate-800">
                AI-POWERED TECHNICAL INTERVIEW PREPPER
              </span>
            </div>
          </div>

          {/* Right Header Status & Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/ai-interview"
              className="hidden sm:inline-flex items-center gap-1.5 bg-orange-50 text-[#EE6200] border border-orange-200 px-3 py-1 rounded-md text-xs font-semibold hover:bg-orange-100 transition-colors"
            >
              <span>🎙️ Voice Mock Interview</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 hidden md:inline">
                  Hi, <b>{user.name?.split(' ')[0]}</b>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-1 text-xs border border-slate-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50 text-slate-700 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/login"
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-semibold bg-[#EE6200] text-white hover:bg-[#D45600] px-3 py-1 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
