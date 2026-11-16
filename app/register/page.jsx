'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [f, setF] = useState({
    name: '',
    email: '',
    password: '',
    course: 'BTech CSE',
    role: 'student'
  });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const r = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f)
      });
      const d = await r.json();
      if (!r.ok) {
        setErr(d.error || 'Registration failed');
        setLoading(false);
        return;
      }
      try {
        localStorage.setItem('user', JSON.stringify(d.user));
      } catch {}
      window.location.href = '/dashboard';
    } catch {
      setErr('Server error. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#EE6200] text-white flex items-center justify-center font-bold text-lg mx-auto mb-2">
            AI
          </div>
          <h1 className="text-xl font-bold text-slate-900">Create Account</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Join AI-Powered Technical Interview Prepper
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3.5">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input text-sm"
              placeholder="e.g. Aryan Sharma"
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label">Invertis Email ID</label>
            <input
              type="email"
              className="input text-sm"
              placeholder="e.g. aryan@invertis.ac.in"
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label">Course</label>
              <select
                className="input text-xs sm:text-sm font-medium"
                value={f.course}
                onChange={(e) => setF({ ...f, course: e.target.value })}
              >
                <option>BTech CSE</option>
                <option>BTech IT</option>
                <option>BCA</option>
                <option>MCA</option>
                <option>BBA</option>
                <option>BTech ECE</option>
              </select>
            </div>

            <div>
              <label className="label">Role</label>
              <select
                className="input text-xs sm:text-sm font-medium"
                value={f.role}
                onChange={(e) => setF({ ...f, role: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="helper">Helper (File Desk)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input text-sm"
              placeholder="Create strong password"
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
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
            {loading ? 'Creating account...' : 'Complete Registration →'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-600 mt-4">
          Pehle se account hai?{' '}
          <Link href="/login" className="text-[#EE6200] font-bold hover:underline">
            Login karein
          </Link>
        </p>
      </div>
    </div>
  );
}
