'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { seed } from '../../lib/seed';

export default function MockTests() {
  const [active, setActive] = useState(null);
  const [ans, setAns] = useState({});
  const [done, setDone] = useState(null);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (!active || done) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [active, done]);

  async function finish() {
    if (!active || !active.questions) return;
    const qs = active.questions;
    let c = 0;
    const weak = {};
    qs.forEach((q, i) => {
      if (ans[i] === q.answer) c++;
      else weak[q.topic] = (weak[q.topic] || 0) + 1;
    });
    const score = Math.round((c / qs.length) * 100);
    const result = {
      company: active.company,
      score,
      correct: c,
      total: qs.length,
      weak: Object.entries(weak)
        .sort((a, b) => b[1] - a[1])
        .map(([t]) => t)
        .slice(0, 3)
    };
    setDone(result);
    try {
      await fetch('/api/mock-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      localStorage.setItem('lastMock', JSON.stringify(result));
    } catch {}
  }

  // ACTIVE TEST VIEW
  if (active && !done) {
    const min = Math.floor(sec / 60);
    const s = String(sec % 60).padStart(2, '0');
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Test HUD */}
        <div className="card p-4 sm:p-5 mb-5 flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-[#EE6200]">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">{active.title}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Negative marking: {active.negativeMarking} • Sections: {active.sections.join(', ')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-slate-100 text-slate-800 font-mono font-bold px-3 py-1 rounded text-xs sm:text-sm">
              ⏱ {min}:{s} / {active.durationMin}m
            </span>
            <button
              type="button"
              onClick={() => {
                if (confirm('Test chhod kar wapas jana chahte hain?')) {
                  setActive(null);
                  setAns({});
                  setSec(0);
                }
              }}
              className="text-xs text-slate-500 hover:text-red-600 underline cursor-pointer"
            >
              Cancel Test
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {active.questions.map((q, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="badge bg-orange-50 text-[#EE6200] border border-orange-200 text-xs font-bold">
                  {q.topic}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Q{i + 1} of {active.questions.length}</span>
              </div>

              <p className="font-bold text-sm sm:text-base text-slate-900 mt-2 leading-snug">
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {q.options.map((o, oi) => {
                  const selected = ans[i] === oi;
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => setAns({ ...ans, [i]: oi })}
                      className={`text-left border rounded-lg p-3 text-xs sm:text-sm font-medium transition-all flex items-start gap-2 cursor-pointer ${
                        selected
                          ? 'bg-orange-50 border-[#EE6200] text-[#EE6200] font-bold ring-1 ring-[#EE6200]'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                          selected
                            ? 'bg-[#EE6200] text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="leading-tight">{o}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="mt-6 pt-2">
          <button
            type="button"
            onClick={finish}
            className="btn-gold w-full sm:w-auto px-6 py-2.5 text-sm font-bold cursor-pointer"
          >
            Submit Test & See Scorecard →
          </button>
        </div>
      </div>
    );
  }

  // TEST RESULT VIEW
  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="card text-center p-6 sm:p-8">
          <span className="badge bg-orange-100 text-[#EE6200] font-bold text-xs uppercase mb-2">
            Assessment Result
          </span>

          <p className="text-4xl sm:text-5xl font-black text-slate-900">{done.score}%</p>
          <p className="font-bold text-base text-slate-800 mt-1">
            {done.company} Placement Mock Test
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {done.correct} out of {done.total} correct
          </p>

          <div className="bg-slate-50 rounded-lg p-4 mt-5 text-left text-xs">
            <span className="font-bold text-slate-800 block mb-1">
              📌 Weak Topics:
            </span>
            <p className="text-[#EE6200] font-bold">
              {done.weak.length > 0 ? done.weak.join(', ') : 'Koi weak topic nahi mila — Excellent preparation!'}
            </p>

            <p className="text-slate-600 mt-2 pt-2 border-t border-slate-200">
              {done.score >= 70
                ? '🎉 Excellent score! AI Voice Interview se verbal viva practice karein.'
                : '📚 Weak topics ko Prep Hub se revise karein aur mock dobara attempt karein.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setActive(null);
                setDone(null);
                setAns({});
                setSec(0);
              }}
              className="btn-navy text-xs cursor-pointer"
            >
              Back to Mock Tests
            </button>
            <Link href="/ai-interview" className="btn-gold text-xs">
              🎙️ Practice in AI Voice Interview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Company-Wise Mock Tests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          TCS NQT, Infosys, Wipro, Accenture ke actual placement exam pattern par timed tests attempt karein.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {seed.mockTests.map((m) => (
          <div
            key={m.id}
            className="card p-5 flex flex-col justify-between hover:border-[#EE6200] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="badge bg-orange-50 text-[#EE6200] text-xs font-bold">
                  {m.durationMin} Min
                </span>
                <span className="text-xs text-slate-400 font-semibold">{m.totalQuestions} Questions</span>
              </div>

              <h3 className="font-bold text-lg text-slate-900 mt-2">
                {m.company}
              </h3>

              <p className="text-xs text-slate-600 mt-1">
                Sections: <span className="font-semibold text-slate-800">{m.sections.join(' + ')}</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Marking: {m.negativeMarking}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setActive(m);
                setAns({});
                setSec(0);
              }}
              className="btn-gold mt-5 text-xs font-bold w-full cursor-pointer"
            >
              Start Timed Test →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
