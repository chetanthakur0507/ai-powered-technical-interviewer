'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Placements() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('/api/placements')
      .then((r) => r.json())
      .then(setList);
  }, []);

  const years = [
    { y: '2026', n: 280 },
    { y: '2025', n: 520 },
    { y: '2024', n: 480 },
    { y: '2023', n: 410 },
  ];

  const branches = [
    { b: 'BTech CSE', n: 180 },
    { b: 'BTech IT', n: 95 },
    { b: 'BCA', n: 80 },
    { b: 'MCA', n: 60 },
    { b: 'BBA', n: 55 },
    { b: 'BTech ECE', n: 50 },
  ];

  const max = Math.max(...branches.map((x) => x.n));
  const companies = [...new Set(list.map((s) => s.company))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fadeIn">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="badge bg-[#FFF5EB] text-[#EE6200] border border-[#FBA17E]/40 font-bold text-xs uppercase mb-2">
          CRC Placement Statistics
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#191310] tracking-tight">
          Placement Records & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Year-wise, branch-wise placement numbers aur top recruiters ka official overview. CRC Placement Office dwara verified updates.
        </p>
      </div>

      {/* Year-wise Placed KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
        {years.map((y) => (
          <div key={y.y} className="card text-center p-4 sm:p-5 border-[#F5E6D8]">
            <p className="text-2xl sm:text-4xl font-black text-[#191310]">{y.n}</p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
              Placed in Batch {y.y}
            </p>
          </div>
        ))}
      </div>

      {/* Branch Breakdown & Recruiters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Branch-wise placed */}
        <div className="card border-[#F5E6D8] p-5 sm:p-6">
          <h3 className="font-black text-lg text-[#191310] mb-4">
            🎓 Branch-wise Placement Distribution
          </h3>

          <div className="space-y-4">
            {branches.map((b) => (
              <div key={b.b}>
                <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#191310]">
                  <span>{b.b}</span>
                  <b className="text-[#EE6200]">{b.n} Placed</b>
                </div>
                <div className="h-2.5 bg-[#FAF3EC] rounded-full mt-1.5 overflow-hidden border border-[#F2E0D0]">
                  <div
                    className="h-full bg-gradient-to-r from-[#EE6200] via-[#FF8500] to-[#FF9A00] rounded-full"
                    style={{ width: `${(b.n / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="card border-[#F5E6D8] p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-lg text-[#191310] mb-3">
              🏢 Top Recruiting Partners
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {companies.map((c) => (
                <span
                  key={c}
                  className="badge bg-[#FFF5EB] text-[#EE6200] border border-[#FBA17E]/40 font-bold px-3 py-1.5 text-xs"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE1D5] mt-6 text-xs sm:text-sm space-y-1">
              <p>
                <b>Highest Package:</b> <span className="text-[#EE6200] font-black">₹12 LPA</span>
              </p>
              <p>
                <b>Average Package:</b> <span className="font-bold">₹4.8 LPA</span>
              </p>
              <p>
                <b>Median Package:</b> <span className="font-bold">₹4.2 LPA</span>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F5E6D8]">
            <Link href="/ai-interview" className="btn-gold w-full text-xs sm:text-sm shadow-flame font-bold">
              <span>⚡ Practice AI Interview for Top Recruiters →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Placed Students Table */}
      <div className="card mt-8 border-[#F5E6D8] p-5 sm:p-6 overflow-hidden">
        <h3 className="font-black text-lg text-[#191310] mb-4">
          🏆 Placed Students Honor Roll
        </h3>

        <div className="overflow-x-auto -mx-5 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#F5E6D8] text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Course</th>
                <th className="py-3 px-3">Recruiter Company</th>
                <th className="py-3 px-3">Offered CTC</th>
                <th className="py-3 px-3">Graduation Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E6D8]">
              {list.map((s, i) => (
                <tr key={i} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-3 font-bold text-[#191310]">{s.name}</td>
                  <td className="py-3 px-3 text-slate-600">{s.course}</td>
                  <td className="py-3 px-3 font-semibold text-[#EE6200]">{s.company}</td>
                  <td className="py-3 px-3 font-black text-[#191310]">{s.ctc}</td>
                  <td className="py-3 px-3 text-slate-500">{s.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
