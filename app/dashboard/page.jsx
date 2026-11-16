'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [drives, setDrives] = useState([]);
  const [last, setLast] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUser(d.user));
    fetch('/api/mock-attempts')
      .then((r) => r.json())
      .then(setAttempts);
    fetch('/api/drives')
      .then((r) => r.json())
      .then(setDrives);
    try {
      const interview = JSON.parse(localStorage.getItem('lastInterview') || 'null');
      const mock = JSON.parse(localStorage.getItem('lastMock') || 'null');
      setLast(interview || mock);
    } catch {}
  }, []);

  const avg = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + (a.score || 0), 0) / attempts.length)
    : 0;

  const topics = [
    { t: 'Aptitude & Reasoning', s: 72, color: 'from-[#EE6200] to-[#FF9A00]' },
    { t: 'Coding & DSA', s: 58, color: 'from-[#FF9A00] to-[#FBA17E]' },
    { t: 'HR & Communication', s: 80, color: 'from-[#EE6200] to-[#FFAA24]' },
    { t: 'Technical Subjects (DBMS/OS)', s: 64, color: 'from-[#FBA17E] to-[#EE6200]' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#191310] via-[#241A14] to-[#120D0A] text-white rounded-3xl p-6 sm:p-8 border border-[#EE6200]/30 shadow-flame mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="badge bg-[#EE6200]/20 text-[#FFAA24] border border-[#EE6200]/40 text-xs font-bold uppercase tracking-wider mb-2">
            Student Dashboard
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
            Namaste, {user?.name || 'Student'} 👋
          </h1>
          <p className="text-white/80 text-xs sm:text-sm mt-1.5">
            {user?.course || 'BTech CSE'} • {user?.email || 'student@invertis.ac.in'} • Role:{' '}
            <span className="capitalize font-semibold text-[#F7D794]">{user?.role || 'student'}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/ai-interview" className="btn-gold text-xs sm:text-sm shadow-flame">
            <span>⚡ Launch AI Prepper</span>
          </Link>
          <Link
            href="/mock-tests"
            className="bg-[#2D1F17] hover:bg-[#3D2B20] text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
          >
            <span>Take Mock Test</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="card text-center p-4 sm:p-5 border-[#F5E6D8]">
          <p className="text-3xl sm:text-4xl font-black text-[#191310]">{attempts.length}</p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Mock Tests Diye</p>
        </div>

        <div className="card text-center p-4 sm:p-5 border-[#F5E6D8]">
          <p className="text-3xl sm:text-4xl font-black text-[#EE6200]">{avg}%</p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Avg Mock Score</p>
        </div>

        <div className="card text-center p-4 sm:p-5 border-[#F5E6D8]">
          <p className="text-3xl sm:text-4xl font-black text-[#FF9A00]">
            {last?.avg || last?.score || '78'}%
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Last AI Interview {last?.role ? `(${last.role})` : ''}
          </p>
        </div>

        <div className="card text-center p-4 sm:p-5 border-[#F5E6D8]">
          <p className="text-3xl sm:text-4xl font-black text-[#EE6200]">4 🔥</p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Day Prep Streak</p>
        </div>
      </div>

      {/* Main Grid: Strengths & Drives/Attempts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Strengths & Checklist */}
        <div className="space-y-6">
          <div className="card border-[#F5E6D8] p-5 sm:p-6">
            <h3 className="font-black text-lg text-[#191310] flex items-center justify-between">
              <span>📊 Topic-wise Placement Strength</span>
              <span className="text-xs text-[#EE6200] font-bold">Auto Evaluated</span>
            </h3>

            <div className="space-y-4 mt-5">
              {topics.map((t) => (
                <div key={t.t}>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#191310]">
                    <span>{t.t}</span>
                    <b className="text-[#EE6200]">{t.s}%</b>
                  </div>
                  <div className="h-2.5 bg-[#FAF3EC] rounded-full mt-1.5 overflow-hidden border border-[#F2E0D0]">
                    <div
                      className={`h-full bg-gradient-to-r ${t.color} rounded-full`}
                      style={{ width: `${t.s}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FFF5EB] border border-[#FBA17E]/40 rounded-xl p-3.5 mt-5 text-xs text-[#8C4600] leading-relaxed">
              <b>💡 AI Recommendation:</b> Coding aur Technical interview practice ki requirement hai. Roz 2 coding problems (/prep/coding) aur ek AI technical interview simulation dekar score 75%+ le jaayein.
            </div>
          </div>

          <div className="card border-[#F5E6D8] p-5 sm:p-6">
            <h3 className="font-black text-base text-[#191310] flex items-center gap-2">
              <span>✅ Placement Readiness Checklist</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-600 mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">✓</span>
                <span>1-page standard ATS-friendly PDF Resume ready</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">✓</span>
                <span>2 major technical projects hosted with live GitHub URLs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">!</span>
                <span>DSA Core Topics: Arrays, LinkedList, Trees, Graphs, DP</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">✓</span>
                <span>LinkedIn profile updated with latest certifications</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Upcoming Drives & Recent Attempts */}
        <div className="space-y-6">
          <div className="card border-[#F5E6D8] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#F5E6D8] pb-3 mb-3">
              <h3 className="font-black text-lg text-[#191310]">💼 Upcoming Campus Drives</h3>
              <Link href="/drives" className="text-xs font-bold text-[#EE6200] hover:underline">
                View All →
              </Link>
            </div>

            <div className="divide-y divide-[#F5E6D8]">
              {drives
                .filter((d) => d.status === 'Upcoming')
                .slice(0, 4)
                .map((d, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <b className="text-[#191310] block">{d.company}</b>
                      <span className="text-slate-500 text-xs">{d.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-700 font-semibold block">{d.date}</span>
                      <span className="badge bg-[#FFF5EB] text-[#EE6200] border border-[#FBA17E]/40 text-[10px]">
                        {d.ctc}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="card border-[#F5E6D8] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#F5E6D8] pb-3 mb-3">
              <h3 className="font-black text-lg text-[#191310]">📝 Recent Mock Test Attempts</h3>
              <Link href="/mock-tests" className="text-xs font-bold text-[#EE6200] hover:underline">
                Take Test →
              </Link>
            </div>

            {attempts.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-500 py-3">
                Abhi koi attempt nahi kiya hai. Pehla mock test dekar score analyze karein!
              </p>
            ) : (
              <div className="divide-y divide-[#F5E6D8]">
                {attempts.slice(0, 5).map((a, i) => (
                  <div key={i} className="py-2 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-[#191310]">{a.company} Mock</span>
                      <span className="text-slate-400 text-xs block">{a.date}</span>
                    </div>
                    <div className="text-right">
                      <b className="text-[#EE6200]">{a.score}%</b>
                      <span className="text-xs text-slate-500 block">
                        ({a.correct}/{a.total} correct)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
