import Link from 'next/link';
import { seed } from '../lib/seed';

export default function Home() {
  const upcoming = seed.drives.filter((d) => d.status === 'Upcoming').slice(0, 5);

  const prepTracks = [
    { title: 'Aptitude & Reasoning', desc: '40+ MCQs, Quant + Logical + Verbal', href: '/prep/aptitude', icon: '🧮' },
    { title: 'Coding Practice', desc: '26 problems — TCS / Infosys / CodeVita', href: '/prep/coding', icon: '💻' },
    { title: 'Technical Notes', desc: 'DSA, DBMS, OS, CN, OOP Java notes', href: '/prep/technical', icon: '🎯' },
    { title: 'HR & Communication', desc: '60s intro, GD topics, email drills', href: '/prep/communication', icon: '🗣️' },
    { title: 'College Exams (PYQ)', desc: 'BTech semester PYQ-style questions', href: '/prep/exams', icon: '📚' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero Card */}
      <div className="card p-6 sm:p-8 border-slate-200 bg-white">
        <div className="max-w-3xl">
          <span className="badge bg-orange-100 text-[#EE6200] font-bold mb-2">
            Invertis Placement Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            AI-POWERED TECHNICAL INTERVIEW PREPPER
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Invertis University students ke liye technical interview taiyaari ka portal. AI bol kar sawaal puchega aur aap mic se bol kar jawab de sakte hain. Sath hi Aptitude, Coding tracks aur CRC Drives ek hi jagah.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5">
            <Link href="/ai-interview" className="btn-gold">
              <span>🎙️ Voice Mock Interview Shuru Karo →</span>
            </Link>
            <Link href="/prep" className="btn-outline">
              Prep Hub Dekho
            </Link>
            <Link href="/mock-tests" className="btn-navy">
              Company Mock Tests
            </Link>
          </div>
        </div>

        {/* Quick Numbers */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 pt-6 border-t border-slate-200 text-center">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-[#EE6200]">14,000+</p>
            <p className="text-xs text-slate-500 mt-0.5">Students</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-slate-900">80+</p>
            <p className="text-xs text-slate-500 mt-0.5">Programmes</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-[#EE6200]">500+</p>
            <p className="text-xs text-slate-500 mt-0.5">Placed in 2025–26*</p>
          </div>
        </div>
      </div>

      {/* Voice Interview Callout Box */}
      <div className="card p-5 sm:p-6 bg-orange-50/70 border-orange-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="badge bg-[#EE6200] text-white font-bold text-xs">
              NEW: Voice Interactive Mode
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              AI Question Bolega Aur Aap Bol Kar Answer Dein
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              DSA, React, Java, Python, System Design, SQL ya custom topic choose karein. Easy / Medium / Hard select karke real viva practice karein.
            </p>
          </div>
          <Link href="/ai-interview" className="btn-gold shrink-0">
            Start Voice Interview →
          </Link>
        </div>
      </div>

      {/* Upcoming Drives Announcement */}
      {upcoming.length > 0 && (
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-xs sm:text-sm text-slate-700 flex items-center gap-2">
          <span className="font-bold text-[#EE6200] shrink-0">📢 Upcoming Drives:</span>
          <div className="truncate">
            {upcoming.map((d) => `${d.company} (${d.role}) — ${d.date}`).join('  •  ')}
          </div>
        </div>
      )}

      {/* Prep Tracks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">Placement Prep Tracks</h2>
          <Link href="/prep" className="text-xs font-semibold text-[#EE6200] hover:underline">
            All Tracks →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {prepTracks.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card p-4 hover:border-[#EE6200] transition-colors"
            >
              <span className="text-2xl">{t.icon}</span>
              <p className="font-bold text-sm text-slate-900 mt-2">{t.title}</p>
              <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
              <p className="text-xs font-semibold text-[#EE6200] mt-3">Start →</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Placements & Notice Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placed Students */}
        <div className="card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">🏆 Top Placed Students</h3>
            <Link href="/placements" className="text-xs text-[#EE6200] hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100 mt-2">
            {seed.placedStudents.slice(0, 5).map((s) => (
              <div key={s.name} className="py-2 flex items-center justify-between text-xs">
                <div>
                  <b className="text-slate-800">{s.name}</b>
                  <span className="text-slate-500 ml-1">({s.course})</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-[#EE6200]">{s.company}</span>
                  <span className="text-slate-500 ml-1 font-bold">• {s.ctc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board */}
        <div className="card p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">📌 CRC Notice Board</h3>
            <Link href="/drives" className="text-xs text-[#EE6200] hover:underline">
              Drives
            </Link>
          </div>
          <div className="divide-y divide-slate-100 mt-2">
            {seed.notices.map((n) => (
              <div key={n.title} className="py-2 text-xs">
                <span className="badge bg-slate-100 text-slate-700 mr-1.5">{n.tag}</span>
                <span className="font-semibold text-slate-800">{n.title}</span>
                <p className="text-[10px] text-slate-400 mt-0.5">{n.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
