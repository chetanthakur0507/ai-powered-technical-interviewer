'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('student@invertis.ac.in');
  const [password, setPassword] = useState('student123');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e, customEmail, customPass) {
    if (e && e.preventDefault) e.preventDefault();
    setErr('');
    setLoading(true);

    const targetEmail = (customEmail || email || '').trim();
    const targetPass = (customPass || password || '').trim();

    if (!targetEmail || !targetPass) {
      setErr('Email aur password dono zaroori hain.');
      setLoading(false);
      return;
    }

    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: targetPass })
      });
      const d = await r.json();

      if (!r.ok) {
        setErr(d.error || 'Login fail — email ya password galat hai.');
        setLoading(false);
        return;
      }

      // Save user to localStorage for instant local client persistence
      try {
        localStorage.setItem('user', JSON.stringify(d.user));
      } catch {}

      // Hard redirect to dashboard so browser commits cookie and middleware receives it
      window.location.href = '/dashboard';
    } catch {
      setErr('Server se connect karne me dikkat aayi. Kripya dobara try karein.');
      setLoading(false);
    }
  }

  const quickDemoLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    handleLogin(null, demoEmail, demoPass);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#EE6200] text-white flex items-center justify-center font-bold text-lg mx-auto mb-2">
            AI
          </div>
          <h1 className="text-xl font-bold text-slate-900">Student & CRC Login</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            AI-Powered Technical Interview Prepper
          </p>
        </div>

        <form onSubmit={(e) => handleLogin(e)} className="space-y-3.5">
          <div>
            <label className="label">Invertis Email ID</label>
            <input
              type="email"
              className="input text-sm"
              placeholder="e.g. student@invertis.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {err && (
            <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              ⚠️ {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-2.5 text-sm font-bold cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Sign In →'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-600 mt-4">
          Naya account banana hai?{' '}
          <Link href="/register" className="text-[#EE6200] font-bold hover:underline">
            Register karein
          </Link>
        </p>

        {/* 1-Click Demo Logins */}
        <div className="bg-slate-50 rounded-lg p-3.5 mt-5 border border-slate-200 text-xs">
          <p className="font-bold text-slate-800 mb-2 uppercase text-[11px] tracking-wide">
            ⚡ 1-Click Demo Logins (Click karte hi dashboard khulega):
          </p>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => quickDemoLogin('student@invertis.ac.in', 'student123')}
              className="w-full text-left p-2 rounded bg-white hover:bg-orange-50 border border-slate-200 hover:border-[#EE6200] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>🎓 <b>Student:</b> student@invertis.ac.in</span>
              <span className="text-xs text-[#EE6200] font-bold">1-Click Login →</span>
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('crc@invertis.ac.in', 'crc123')}
              className="w-full text-left p-2 rounded bg-white hover:bg-orange-50 border border-slate-200 hover:border-[#EE6200] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>🏢 <b>CRC Admin:</b> crc@invertis.ac.in</span>
              <span className="text-xs text-[#EE6200] font-bold">1-Click Login →</span>
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('helper@invertis.ac.in', 'helper123')}
              className="w-full text-left p-2 rounded bg-white hover:bg-orange-50 border border-slate-200 hover:border-[#EE6200] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>🤝 <b>Helper:</b> helper@invertis.ac.in</span>
              <span className="text-xs text-[#EE6200] font-bold">1-Click Login →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
