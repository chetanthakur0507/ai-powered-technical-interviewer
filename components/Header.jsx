'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUser(d.user || null))
      .catch(() => {});
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout');
      setUser(null);
      setMobileOpen(false);
      router.push('/');
      router.refresh();
    } catch (e) {
      window.location.href = '/api/auth/logout';
    } finally {
      setLoggingOut(false);
    }
  }

  const navLinks = [
    { label: 'AI Interview', href: '/ai-interview', highlight: true, icon: '⚡' },
    { label: 'Prep Hub', href: '/prep', icon: '🎯' },
    { label: 'Mock Tests', href: '/mock-tests', icon: '📝' },
    { label: 'CRC Drives', href: '/drives', icon: '💼' },
    { label: 'Placements', href: '/placements', icon: '🏆' },
    { label: 'File Bazaar', href: '/file-bazaar', icon: '📁' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#16110D]/95 backdrop-blur-md border-b border-[#EE6200]/25 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#EE6200] via-[#FF9A00] to-[#FBA17E] p-0.5 shadow-flame transition-transform group-hover:scale-105 flex items-center justify-center">
              <div className="w-full h-full bg-[#181310] rounded-[10px] flex items-center justify-center font-black text-lg text-[#FF9A00]">
                <span>AI</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-tight text-white group-hover:text-[#F7D794] transition-colors leading-tight">
                  AI-POWERED TECHNICAL INTERVIEW PREPPER
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-[#FBA17E] font-medium leading-none mt-0.5">
                Invertis Placement Portal • Career Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                      active
                        ? 'bg-gradient-to-r from-[#EE6200] to-[#FF9A00] text-white shadow-flame'
                        : 'bg-[#EE6200]/15 text-[#FFAA24] border border-[#EE6200]/40 hover:bg-[#EE6200]/30 hover:text-white'
                    }`}
                  >
                    <span className="animate-pulse text-xs">⚡</span>
                    <span>{item.label}</span>
                    <span className="text-[9px] bg-[#EE6200] text-white px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold">
                      PRO
                    </span>
                  </Link>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    active
                      ? 'text-[#F7D794] font-bold bg-white/5'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop User Status & Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-[#251D18] border border-[#EE6200]/30 hover:border-[#EE6200] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#EE6200] to-[#FF9A00] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </span>
                  <span className="max-w-[100px] truncate text-white/90">{user.name || 'Dashboard'}</span>
                </Link>

                {user.role === 'crc_admin' && (
                  <Link
                    href="/admin"
                    className="bg-[#F7D794] text-[#191310] font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-white transition-colors"
                  >
                    Admin
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  title="Sign out of your account"
                  className="flex items-center gap-1.5 bg-[#2A1E18] text-[#FBA17E] hover:text-white hover:bg-[#EE6200] border border-[#FBA17E]/30 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-[#EE6200] to-[#FF9A00] text-white font-bold px-4 py-1.5 rounded-xl text-xs sm:text-sm hover:shadow-flame transition-all active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-xs bg-[#2A1E18] text-[#FBA17E] border border-[#FBA17E]/30 px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 sm:hidden"
                title="Logout"
              >
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-[#F7D794] hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1E1713] border-b border-[#EE6200]/30 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* User Card if logged in */}
          {user ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#281E18] border border-[#EE6200]/25">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-gradient-to-r from-[#EE6200] to-[#FF9A00] text-white flex items-center justify-center font-black text-sm">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </span>
                <div>
                  <p className="font-bold text-sm text-white leading-tight">{user.name}</p>
                  <p className="text-[11px] text-[#FBA17E]">{user.course || user.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="bg-[#EE6200]/20 text-[#FF9A00] text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[#EE6200]/40"
                >
                  Dashboard
                </Link>
                {user.role === 'crc_admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="bg-[#F7D794] text-[#191310] text-xs font-bold px-2 py-1 rounded-lg"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-[#281E18] border border-white/10">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center py-2 rounded-lg font-semibold text-sm bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-center py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-[#EE6200] to-[#FF9A00] text-white shadow-flame transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Nav List */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium transition-all ${
                    item.highlight
                      ? 'col-span-2 bg-gradient-to-r from-[#EE6200] to-[#FF9A00] text-white font-bold shadow-flame'
                      : active
                      ? 'bg-[#EE6200]/20 text-[#F7D794] font-bold border border-[#EE6200]/40'
                      : 'bg-[#281E18] text-white/90 hover:bg-[#34271F]'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Prominent Mobile Logout Button */}
          {user && (
            <div className="pt-2">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center justify-center gap-2 bg-[#2D1B15] text-[#FBA17E] hover:bg-[#EE6200] hover:text-white border border-[#FBA17E]/30 py-2.5 rounded-xl font-bold text-sm transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{loggingOut ? 'Signing out...' : 'Logout from Account'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
