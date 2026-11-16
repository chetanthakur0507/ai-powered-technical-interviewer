import { NextResponse } from 'next/server'; import { store } from '../../../lib/store';
export async function GET() { return NextResponse.json(store().attempts); }
export async function POST(req) { const b = await req.json(); const a = { ...b, id: 'A-' + Date.now(), date: new Date().toLocaleDateString('en-IN') }; store().attempts.unshift(a); return NextResponse.json(a, { status: 201 }); }
