import Link from 'next/link';

const tracks = [
  {
    slug: 'aptitude',
    icon: '🧮',
    title: 'Aptitude & Reasoning',
    desc: 'Quantitative, Logical Reasoning aur Verbal Ability — 42 MCQs with detailed explanations.',
    meta: '42 MCQs • Timed Mode'
  },
  {
    slug: 'coding',
    icon: '💻',
    title: 'Coding Practice',
    desc: 'TCS CodeVita / NQT / Infosys style — 26 hand-curated algorithmic coding challenges.',
    meta: '26 Problems • Company-tagged'
  },
  {
    slug: 'technical',
    icon: '🎯',
    title: 'Technical Subjects Notes',
    desc: 'DSA, DBMS, Operating Systems, Computer Networks, OOP-Java — core concepts & viva questions.',
    meta: 'Core Subjects Notes & Qs'
  },
  {
    slug: 'communication',
    icon: '🗣️',
    title: 'HR & Communication Drills',
    desc: '60-Second self-intro builder, GD topics, email etiquette, daily speaking drills.',
    meta: '10 Drills • GD Topics'
  },
  {
    slug: 'exams',
    icon: '📚',
    title: 'College Exams (PYQ)',
    desc: 'Invertis BTech semester PYQ-style questions — DSA, DBMS, OS, CN, and Java revision.',
    meta: 'Semester PYQ Series'
  },
];

export default function Prep() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="badge bg-[#FFF5EB] text-[#EE6200] border border-[#FBA17E]/40 font-bold text-xs uppercase mb-2">
          Comprehensive Study Tracks
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#191310] tracking-tight">
          Placement Prep Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Aptitude se lekar coding aur HR communication tak — har track me structured concept notes, timer-based questions aur clear solutions available hain.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {tracks.map((t) => (
          <Link
            key={t.slug}
            href={`/prep/${t.slug}`}
            className="card border-[#F5E6D8] hover:border-[#EE6200]/50 p-6 flex flex-col justify-between group transition-all"
          >
            <div>
              <span className="text-3xl block group-hover:scale-110 transition-transform">
                {t.icon}
              </span>
              <h3 className="font-black text-lg text-[#191310] mt-3 group-hover:text-[#EE6200] transition-colors">
                {t.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{t.desc}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#F5E6D8] flex items-center justify-between text-xs font-bold text-[#EE6200]">
              <span>{t.meta}</span>
              <span>Start Track →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* AI Prepper Callout */}
      <div className="card mt-8 sm:mt-12 bg-gradient-to-r from-[#191310] via-[#241A14] to-[#140F0C] text-white p-6 sm:p-8 border-[#EE6200]/30 shadow-flame flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="badge bg-[#EE6200]/20 text-[#FFAA24] border border-[#EE6200]/40 text-xs font-bold uppercase mb-2">
            AI-Powered Simulation
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            AI Technical Interview Simulator Se Practice Karein
          </h3>
          <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Topic chunein (DSA, React, Java, System Design) aur Easy/Medium/Hard level par authentic viva interview dekar apni placement readiness check karein.
          </p>
        </div>
        <Link href="/ai-interview" className="btn-gold text-sm sm:text-base px-6 py-3 shrink-0 shadow-flame">
          <span>⚡ Launch AI Interview →</span>
        </Link>
      </div>
    </div>
  );
}
