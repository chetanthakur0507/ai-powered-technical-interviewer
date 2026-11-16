'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Drives() {
  const [drives, setDrives] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetch('/api/drives')
      .then((r) => r.json())
      .then(setDrives);
  }, []);

  const list = drives.filter(
    (d) =>
      (status === 'All' || d.status === status) &&
      `${d.company || ''} ${d.role || ''}`.toLowerCase().includes(q.toLowerCase())
  );

  async function apply(d) {
    const r = await fetch('/api/auth/me').then((x) => x.json());
    if (!r.user) {
      setMsg({
        type: 'error',
        text: 'Apply karne ke liye pehle Login karna zaroori hai.',
        showLogin: true
      });
      return;
    }
    setMsg({
      type: 'success',
      text: `✅ ${d.company} (${d.role}) ke liye application register ho gayi hai.`
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          💼 CRC Campus Placement Drives
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Invertis University campus me aane wali companies, eligibility criteria, CTC aur selection rounds.
        </p>
      </div>

      {msg && (
        <div
          className={`p-3.5 rounded-lg mt-4 text-xs sm:text-sm font-semibold flex items-center justify-between border ${
            msg.type === 'error'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-green-50 border-green-300 text-green-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{msg.text}</span>
            {msg.showLogin && (
              <Link
                href="/login"
                className="bg-[#EE6200] text-white px-2.5 py-1 rounded text-xs font-bold hover:bg-[#D45600]"
              >
                Login Karein →
              </Link>
            )}
          </div>
          <button type="button" onClick={() => setMsg(null)} className="font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
        <div className="relative flex-1">
          <input
            className="input text-xs sm:text-sm"
            placeholder="Company ya role search karein (e.g. TCS, Virtuos, SDE)..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <select
          className="input sm:w-44 text-xs sm:text-sm font-medium"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Drives</option>
          <option value="Upcoming">Upcoming Only</option>
          <option value="Ongoing">Ongoing Only</option>
          <option value="Completed">Completed Only</option>
        </select>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {list.map((d, i) => (
          <div
            key={i}
            className="card p-5 flex flex-col justify-between hover:border-[#EE6200] transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900">{d.company}</h3>
                  <p className="text-xs font-semibold text-[#EE6200] mt-0.5">
                    {d.role} • <span className="text-slate-900 font-bold">{d.ctc}</span>
                  </p>
                </div>
                <span
                  className={`badge text-xs ${
                    d.status === 'Upcoming'
                      ? 'bg-green-100 text-green-800'
                      : d.status === 'Completed'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-orange-100 text-[#EE6200]'
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <p>📅 <b>Date:</b> {d.date}</p>
                <p>📍 <b>Venue / Mode:</b> {d.venue}</p>
                <p>🎓 <b>Eligibility:</b> {d.eligibility}</p>
              </div>

              <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-0.5">Rounds:</span>
                <span className="text-slate-600">{d.rounds ? d.rounds.join('  ➔  ') : 'Aptitude → Interview'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => apply(d)}
                className={`btn-gold text-xs py-1.5 px-4 cursor-pointer ${
                  d.status === 'Completed' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={d.status === 'Completed'}
              >
                {d.status === 'Completed' ? 'Drive Closed' : 'Apply Now'}
              </button>

              <Link
                href="/ai-interview"
                className="text-xs font-bold text-[#EE6200] hover:underline"
              >
                Prep for this role →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="card text-center p-8 mt-6">
          <p className="text-slate-500 text-sm">Koi drive match nahi hui.</p>
        </div>
      )}
    </div>
  );
}
