'use client';

import { useEffect, useState } from 'react';

export default function FileBazaar() {
  const [data, setData] = useState({ requests: [], templates: [] });
  const [f, setF] = useState({
    subject: '',
    type: 'Practical File',
    pages: 30,
    deadline: '',
    budget: 499,
    desc: ''
  });
  const [msg, setMsg] = useState('');
  const [copiedName, setCopiedName] = useState('');

  const load = () =>
    fetch('/api/file-bazaar')
      .then((r) => r.json())
      .then(setData);

  useEffect(load, []);

  async function post(e) {
    e.preventDefault();
    const r = await fetch('/api/file-bazaar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, student: 'Demo Student' })
    });
    if (r.ok) {
      setMsg('✅ Request successfully post ho gayi. Helpers aapko offers denge.');
      setF({ subject: '', type: 'Practical File', pages: 30, deadline: '', budget: 499, desc: '' });
      load();
    } else {
      setMsg('Request post nahi hui — subject aur details zaroor bharein.');
    }
  }

  async function handleCopy(t) {
    const textToCopy = `[Invertis University Format] ${t.name}\n\nDescription: ${t.desc}\n\nStructure:\n1. Title Page & Certificate\n2. Acknowledgement\n3. Table of Contents / Index with Experiment Numbers\n4. Aim, Algorithm, Code, and Sample Output Screenshots.`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedName(t.name);
      setTimeout(() => setCopiedName(''), 2500);
    } catch {
      setCopiedName(t.name);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          📁 File Bazaar — Lab File & Report Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Practical file, lab manual ya project report formatting me help chahiye? Request post karein ya free standard templates copy karein.
        </p>
      </div>

      {msg && (
        <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-3 mt-4 text-xs font-semibold flex items-center justify-between">
          <span>{msg}</span>
          <button type="button" onClick={() => setMsg('')} className="text-green-700 font-bold">✕</button>
        </div>
      )}

      {/* Main Grid: Form + Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Post Request Form */}
        <div className="card p-5 self-start">
          <h3 className="font-bold text-sm text-slate-900 mb-3">
            Nayi Request Post Karo
          </h3>

          <form onSubmit={post} className="space-y-3">
            <div>
              <label className="label">Subject / Title</label>
              <input
                className="input text-xs sm:text-sm"
                placeholder="e.g. DBMS Lab File, Web Tech"
                value={f.subject}
                onChange={(e) => setF({ ...f, subject: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">File Type</label>
              <select
                className="input text-xs sm:text-sm"
                value={f.type}
                onChange={(e) => setF({ ...f, type: e.target.value })}
              >
                <option>Practical File</option>
                <option>Project Report</option>
                <option>Synopsis</option>
                <option>Lab Manual</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Pages</label>
                <input
                  type="number"
                  className="input text-xs sm:text-sm"
                  placeholder="30"
                  value={f.pages}
                  onChange={(e) => setF({ ...f, pages: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Budget ₹</label>
                <input
                  type="number"
                  className="input text-xs sm:text-sm"
                  placeholder="499"
                  value={f.budget}
                  onChange={(e) => setF({ ...f, budget: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="label">Deadline</label>
              <input
                className="input text-xs sm:text-sm"
                placeholder="e.g. 25 Nov 2026"
                value={f.deadline}
                onChange={(e) => setF({ ...f, deadline: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Details</label>
              <textarea
                className="input text-xs sm:text-sm"
                rows={3}
                placeholder="Explain what needs to be formatted..."
                value={f.desc}
                onChange={(e) => setF({ ...f, desc: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-gold w-full text-xs font-bold py-2 cursor-pointer">
              Post Request →
            </button>
          </form>
        </div>

        {/* Existing Requests List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-bold text-sm text-slate-900">
            Open Student Requests ({data.requests.length})
          </h3>

          {data.requests.map((r) => (
            <div key={r.id} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <b className="text-sm font-bold text-slate-900">{r.subject}</b>
                  <span className="badge bg-orange-100 text-[#EE6200] text-xs">
                    {r.type}
                  </span>
                  <span className="badge bg-slate-100 text-slate-700 text-xs">
                    {r.status}
                  </span>
                </div>
                <b className="text-sm text-[#EE6200] font-black">₹{r.budget}</b>
              </div>

              <p className="text-xs text-slate-600 mt-2">{r.desc}</p>

              <div className="mt-2 text-[11px] text-slate-400 flex flex-wrap gap-2">
                <span>📄 {r.pages} pages</span>
                <span>•</span>
                <span>📅 Deadline: {r.deadline}</span>
                <span>•</span>
                <span>By {r.student}</span>
              </div>

              {r.offers && r.offers.length > 0 && (
                <div className="bg-slate-50 rounded-lg p-2.5 mt-3 text-xs border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-1">Offers:</span>
                  {r.offers.map((o, idx) => (
                    <p key={idx} className="text-slate-600">
                      🤝 <b>{o.helper}</b> — ₹{o.price} • {o.days} din • &ldquo;{o.msg}&rdquo;
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Free Templates Library */}
      <div className="card mt-8 p-5">
        <h3 className="font-bold text-base text-slate-900">📄 Free Document Templates</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Standard Invertis University lab file format. Click karke text clipboard me copy karein.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {data.templates.map((t, i) => (
            <div key={i} className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex flex-col justify-between">
              <div>
                <b className="text-xs font-bold text-slate-900">{t.name}</b>
                <p className="text-xs text-slate-600 mt-1">{t.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(t)}
                className="mt-3 text-left text-xs font-bold text-[#EE6200] hover:text-[#D45600] flex items-center gap-1 cursor-pointer"
              >
                {copiedName === t.name ? (
                  <span className="text-green-600 font-bold">✓ Copied to Clipboard!</span>
                ) : (
                  <span>Copy Standard Format →</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
