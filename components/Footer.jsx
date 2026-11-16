import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-800">AI-POWERED TECHNICAL INTERVIEW PREPPER</p>
          <p className="mt-0.5">Invertis University • Placement Preparation Portal</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
          <Link href="/ai-interview" className="hover:text-[#EE6200]">Voice Interview</Link>
          <Link href="/prep" className="hover:text-[#EE6200]">Prep Hub</Link>
          <Link href="/mock-tests" className="hover:text-[#EE6200]">Mock Tests</Link>
          <Link href="/drives" className="hover:text-[#EE6200]">CRC Drives</Link>
          <Link href="/placements" className="hover:text-[#EE6200]">Placements</Link>
          <Link href="/file-bazaar" className="hover:text-[#EE6200]">File Bazaar</Link>
        </div>
      </div>
    </footer>
  );
}
