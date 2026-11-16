'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { seed } from '../../../lib/seed';

const META = {
  aptitude: { title: 'Aptitude & Reasoning', icon: '🧮' },
  coding: { title: 'Coding Practice', icon: '💻' },
  technical: { title: 'Technical Subjects Notes', icon: '🎯' },
  communication: { title: 'HR + Communication Drills', icon: '🗣️' },
  exams: { title: 'College Exams (PYQ)', icon: '📚' }
};

export default function Track({ params }) {
  const track = params.track;
  const meta = META[track] || META.aptitude;
  const [answers, setAnswers] = useState({});
  const [sec, setSec] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const qs =
    track === 'aptitude'
      ? seed.aptitudeQuestions
      : track === 'exams'
      ? seed.examQuestions
      : track === 'technical'
      ? seed.examQuestions
      : [];

  const score = qs.filter((q, i) => answers[i] === q.answer).length;
  const answered = Object.keys(answers).length;

  // 1. CODING TRACK
  if (track === 'coding') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            💻 Coding Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            TCS CodeVita / NQT / Infosys style — Hand-curated algorithmic coding problems with hints and sample I/O.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {seed.codingQuestions.map((c, i) => (
            <div key={i} className="card p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <b className="text-base text-slate-900">{c.title}</b>
                  <span
                    className={`badge text-xs ${
                      c.difficulty === 'Hard'
                        ? 'bg-red-100 text-red-700'
                        : c.difficulty === 'Medium'
                        ? 'bg-orange-100 text-[#EE6200]'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {c.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                  {c.statement}
                </p>

                <div className="mt-2 text-[11px] text-slate-500">
                  <b>Company:</b> {c.company} • <b>Topics:</b> {c.topics.join(', ')}
                </div>

                <div className="bg-slate-900 text-amber-200 rounded-lg p-3 mt-3 text-xs font-mono whitespace-pre-wrap">
                  <span className="text-slate-400 block mb-1">Sample I/O:</span>
                  <b>Input:</b> {c.sampleInput}
                  {'\n'}
                  <b>Output:</b> {c.sampleOutput}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 bg-orange-50/60 p-2.5 rounded border border-orange-100">
                <b className="text-[#EE6200]">💡 Hint:</b> {c.hint}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. HR & COMMUNICATION TRACK
  if (track === 'communication') {
    const [intro, setIntro] = useState({
      name: '',
      branch: 'BTech CSE',
      skill: '',
      project: ''
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            🗣️ HR & Communication Drills
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            60-second self-intro builder aur daily placement interview drills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="card p-5">
            <h3 className="font-bold text-sm text-slate-900 mb-3">
              🎯 60-Second Self-Intro Builder
            </h3>
            <div className="space-y-3">
              <div>
                <label className="label">Aapka Naam</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. Rahul Sharma"
                  value={intro.name}
                  onChange={(e) => setIntro({ ...intro, name: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Branch / Degree</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. BTech Computer Science"
                  value={intro.branch}
                  onChange={(e) => setIntro({ ...intro, branch: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Primary Skill</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. Java, Data Structures, SQL"
                  value={intro.skill}
                  onChange={(e) => setIntro({ ...intro, skill: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Key Project</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. Placement Portal with AI Assistant"
                  value={intro.project}
                  onChange={(e) => setIntro({ ...intro, project: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-3.5 mt-4 border border-slate-200">
              <span className="text-xs font-bold text-[#EE6200] block uppercase tracking-wide">
                Generated Pitch:
              </span>
              <p className="mt-1.5 text-xs text-slate-800 leading-relaxed italic">
                &ldquo;Hello, my name is <b className="text-[#EE6200]">{intro.name || '[Your Name]'}</b>. I am currently in my final year of{' '}
                <b>{intro.branch || 'BTech CSE'}</b> at Invertis University. My key strengths are{' '}
                <b className="text-[#EE6200]">{intro.skill || '[Your Skills]'}</b>. Recently, I built{' '}
                <b>{intro.project || '[Your Project]'}</b>, which taught me end-to-end problem solving and clean coding. I am excited to contribute to your engineering team.&rdquo;
              </p>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-sm text-slate-900 mb-3">
              🗣️ Daily Communication Drills
            </h3>
            <div className="divide-y divide-slate-100">
              {seed.communicationDrills.map((d, i) => (
                <div key={i} className="py-3 text-xs">
                  <b className="text-slate-900 block">{d.title}</b>
                  <p className="text-slate-600 mt-0.5">{d.desc}</p>
                  <p className="text-[11px] font-semibold text-[#EE6200] mt-1">
                    💡 Tip: {d.tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. MCQ TRACKS: APTITUDE, TECHNICAL, EXAMS
  const min = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, '0');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {meta.icon} {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            MCQs solve karein aur immediate solutions check karein.
          </p>
        </div>

        {/* Timer Card */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200">
            ⏱ {min}:{s}
          </span>
          <button
            type="button"
            onClick={() => setRunning(!running)}
            className="btn-navy text-xs py-1.5 px-3 cursor-pointer"
          >
            {running ? 'Pause' : 'Start Timer'}
          </button>
        </div>
      </div>

      {/* Score Tracker */}
      <div className="flex items-center justify-between mt-4 text-xs font-bold text-slate-700">
        <span>Answered: {answered} / {qs.length}</span>
        <span>Score: {score} correct</span>
      </div>

      {/* MCQ Questions List */}
      <div className="space-y-4 mt-3">
        {qs.map((q, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="badge bg-orange-50 text-[#EE6200] text-xs font-bold">
                {q.topic || q.subject} • {q.difficulty || 'Medium'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">Q{i + 1} of {qs.length}</span>
            </div>

            <p className="font-bold text-sm sm:text-base text-slate-900 mt-2 leading-snug">
              {q.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {q.options.map((o, oi) => {
                const isChosen = answers[i] === oi;
                const isCorrect = oi === q.answer;
                const isAnswered = answers[i] !== undefined;

                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [i]: oi })}
                    className={`text-left border rounded-lg p-2.5 text-xs sm:text-sm font-medium transition-all flex items-start gap-2 cursor-pointer ${
                      isAnswered && isChosen
                        ? isCorrect
                          ? 'bg-green-50 border-green-400 text-green-900 font-bold'
                          : 'bg-red-50 border-red-300 text-red-900 font-bold'
                        : isAnswered && isCorrect
                        ? 'bg-green-50/50 border-green-300 text-green-900 font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                        isAnswered && isChosen
                          ? isCorrect
                            ? 'bg-green-600 text-white'
                            : 'bg-red-500 text-white'
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

            {answers[i] !== undefined && (
              <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <p className={`font-bold ${answers[i] === q.answer ? 'text-green-700' : 'text-red-600'}`}>
                  {answers[i] === q.answer
                    ? '✅ Sahi Jawab!'
                    : `❌ Galat — Sahi Option: ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`}
                </p>
                <p className="text-slate-600 mt-1">
                  <b>Explanation:</b> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
