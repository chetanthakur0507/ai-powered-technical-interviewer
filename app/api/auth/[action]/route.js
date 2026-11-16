import { NextResponse } from 'next/server';
import { findUser, getUsers, verifyPassword, signToken, publicUser } from '../../../../lib/auth';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req, { params }) {
  const { action } = params;
  const body = await req.json().catch(() => ({}));

  if (action === 'logout') {
    const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
    res.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      expires: new Date(0)
    });
    return res;
  }

  if (action === 'login') {
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email aur password dono zaroori hain' }, { status: 400 });
    }

    const u = findUser(email);
    if (!u || !verifyPassword(u, password)) {
      return NextResponse.json({ error: 'Galat email ya password. Kripya dobara check karein.' }, { status: 401 });
    }

    const token = signToken(u);
    const res = NextResponse.json({ user: publicUser(u), success: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 3600,
      sameSite: 'lax'
    });
    return res;
  }

  if (action === 'register') {
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();
    const course = body.course || 'BTech CSE';
    const role = body.role === 'helper' ? 'helper' : 'student';

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Naam, email aur password zaroori hain' }, { status: 400 });
    }

    if (findUser(email)) {
      return NextResponse.json({ error: 'Ye email pehle se registered hai. Kripya login karein.' }, { status: 400 });
    }

    const u = {
      id: 'u-' + Date.now(),
      name,
      email,
      password,
      passwordHash: bcrypt.hashSync(password, 10),
      role,
      course,
      year: 'Final Year'
    };

    getUsers().push(u);
    const token = signToken(u);
    const res = NextResponse.json({ user: publicUser(u), success: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 7 * 24 * 3600,
      sameSite: 'lax'
    });
    return res;
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 404 });
}

export async function GET(req, { params }) {
  if (params.action === 'logout') {
    const isFetch = req.headers.get('accept')?.includes('application/json');
    if (isFetch) {
      const res = NextResponse.json({ success: true, message: 'Logged out' });
      res.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0, expires: new Date(0) });
      return res;
    }
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0, expires: new Date(0) });
    return res;
  }
  return NextResponse.json({ error: 'Use POST' }, { status: 405 });
}
