import { NextResponse } from 'next/server'; import { store } from '../../../lib/store';
export async function GET() { return NextResponse.json(store().placed); }
export async function POST(req) { const b = await req.json(); const s = { name: b.name, course: b.course, company: b.company, ctc: b.ctc, year: Number(b.year) || 2026 }; store().placed.unshift(s); return NextResponse.json(s, { status: 201 }); }
