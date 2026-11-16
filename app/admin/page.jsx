'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [drives, setDrives] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [reqs, setReqs] = useState([]);
  const [msg, setMsg] = useState('');

  const [nd, setNd] = useState({
    company: '',
    role: '',
    ctc: '',
    eligibility: 'BTech CSE, 60%',
    date: '',
    venue: 'Online Assessment'
  });
  const [np, setNp] = useState({
    name: '',
    course: 'BTech CSE',
    company: '',
    ctc: '',
    year: 2026
  });

  const load = () => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUser(d.user));
    fetch('/api/drives')
      .then((r) => r.json())
      .then(setDrives);
    fetch('/api/placements')
      .then((r) => r.json())
      .then(setPlaced);
    fetch('/api/file-bazaar')
      .then((r) => r.json())
      .then((d) => setReqs(d.requests || []));
  };

  useEffect(load, []);

  async function addDrive(e) {
    e.preventDefault();
    const r = await fetch('/api/drives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nd)
    });
    if (r.ok) {
      setMsg('✅ Drive successfully publish ho gayi.');
      setNd({ company: '', role: '', ctc: '', eligibility: 'BTech CSE, 60%', date: '', venue: 'Online Assessment' });
      load();
    }
  }

  async function addPlaced(e) {
    e.preventDefault();
    const r = await fetch('/api/placements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(np)
    });
    if (r.ok) {
      setMsg('✅ Placed student successfully record me add ho gaya.');
      setNp({ name: '', course: 'BTech CSE', company: '', ctc: '', year: 2026 });
      load();
    }
  }

  function exportCSV() {
    const rows = [
      ['Name', 'Course', 'Company', 'CTC', 'Year'],
      ...placed.map((p) => [p.name, p.course, p.company, p.ctc, p.year])
    ];
    const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'placed-students.csv';
    a.click();
    setMsg('📥 Placed students list CSV download ho gayi.');
  }

  function moderate(id, action) {
    if (action === 'approve') {
      setMsg(`✅ Request ${id} approve ho gayi.`);
    } else {
      setReqs((prev) => prev.filter((x) => x.id !== id));
      setMsg(`🗑️ Request ${id} successfully remove kar di gayi.`);
    }
  }

  if (user && user.role !== 'crc_admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="card text-center p-8">
          <span className="text-3xl block mb-2">🔒</span>
          <h1 className="text-lg font-bold text-slate-900">CRC Admin Access Only</h1>
          <p className="text-xs text-slate-600 mt-1">
            Ye portal sirf Invertis CRC admin ke liye hai. Demo CRC Admin se login karein:
            <br />
            <b>crc@invertis.ac.in</b> / <b>crc123</b>
          </p>
          <div className="mt-4">
            <Link href="/login" className="btn-gold text-xs">
              CRC Login Page Par Jayein →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          ⚙️ CRC Placement Cell Administration
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Nayi drives publish karein, placed students add karein, CSV export karein aur File Bazaar moderation handle karein.
        </p>
      </div>

      {msg && (
        <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-3 mt-4 text-xs font-semibold flex items-center justify-between">
          <span>{msg}</span>
          <button type="button" onClick={() => setMsg('')} className="text-green-700 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Add Drive */}
        <div className="card p-5">
          <h3 className="font-bold text-sm text-slate-900 mb-3">
            ➕ Nayi Campus Drive Publish Karein
          </h3>

          <form onSubmit={addDrive} className="space-y-3">
            <div>
              <label className="label">Company Name</label>
              <input
                className="input text-xs sm:text-sm"
                placeholder="e.g. Cisco, Virtuos, Cognizant"
                value={nd.company}
                onChange={(e) => setNd({ ...nd, company: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Role</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. Software Engineer"
                  value={nd.role}
                  onChange={(e) => setNd({ ...nd, role: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">CTC</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. 6.5 LPA"
                  value={nd.ctc}
                  onChange={(e) => setNd({ ...nd, ctc: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Drive Date</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. 15 Dec 2026"
                  value={nd.date}
                  onChange={(e) => setNd({ ...nd, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Venue / Mode</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="Online / Campus"
                  value={nd.venue}
                  onChange={(e) => setNd({ ...nd, venue: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-gold w-full text-xs font-bold py-2 cursor-pointer">
              Publish Drive Now →
            </button>
          </form>

          <h4 className="font-bold text-xs text-slate-700 mt-5 mb-2">Live Drives List ({drives.length})</h4>
          <div className="divide-y divide-slate-100 max-h-44 overflow-y-auto pr-1 text-xs">
            {drives.slice(0, 6).map((d, i) => (
              <div key={i} className="py-1.5 flex items-center justify-between">
                <span>
                  <b>{d.company}</b> — {d.role}
                </span>
                <span className="badge bg-orange-50 text-[#EE6200] text-[10px]">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Placed Student */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-3">
              ➕ Placed Student Record Add Karein
            </h3>

            <form onSubmit={addPlaced} className="space-y-3">
              <div>
                <label className="label">Student Name</label>
                <input
                  className="input text-xs sm:text-sm"
                  placeholder="e.g. Priyanshu Saxena"
                  value={np.name}
                  onChange={(e) => setNp({ ...np, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">Company</label>
                  <input
                    className="input text-xs sm:text-sm"
                    placeholder="e.g. TCS Digital"
                    value={np.company}
                    onChange={(e) => setNp({ ...np, company: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">Offered CTC</label>
                  <input
                    className="input text-xs sm:text-sm"
                    placeholder="e.g. 7.5 LPA"
                    value={np.ctc}
                    onChange={(e) => setNp({ ...np, ctc: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-navy w-full text-xs font-bold py-2 cursor-pointer">
                Add to Placed Records →
              </button>
            </form>

            <button
              type="button"
              onClick={exportCSV}
              className="btn-soft text-xs font-bold mt-3 w-full cursor-pointer"
            >
              ⬇ Export Placed Students CSV
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200">
            <h4 className="font-bold text-xs text-slate-700 mb-1">Total Placed: {placed.length} Students</h4>
            <p className="text-[11px] text-slate-500">
              CSV file direct download ho jayegi jisme Name, Course, Company, CTC aur Year ka data hoga.
            </p>
          </div>
        </div>
      </div>

      {/* Moderation */}
      <div className="card mt-6 p-5">
        <h3 className="font-bold text-sm text-slate-900 mb-1">
          🛡️ File Bazaar Moderation Panel
        </h3>
        <p className="text-xs text-slate-500 mb-3">
          Student requests review karein — unwanted spam requests ko remove karein.
        </p>

        <div className="divide-y divide-slate-100">
          {reqs.map((r) => (
            <div key={r.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <b>{r.subject}</b> — {r.student} • <span className="text-[#EE6200] font-bold">₹{r.budget}</span> • {r.status}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moderate(r.id, 'approve')}
                  className="text-green-700 hover:underline font-bold text-xs cursor-pointer"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => moderate(r.id, 'remove')}
                  className="text-red-600 hover:underline font-bold text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
