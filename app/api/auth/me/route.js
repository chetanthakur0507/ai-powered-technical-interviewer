import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, findUser, publicUser } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req) {
  try {
    // Check from NextRequest cookies
    let token = req?.cookies?.get('token')?.value;

    // Check from next/headers cookies()
    if (!token) {
      try {
        token = cookies().get('token')?.value;
      } catch {}
    }

    // Check from raw Cookie header
    if (!token && req?.headers) {
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
      if (match) {
        token = decodeURIComponent(match[1]);
      }
    }

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.email) {
      return NextResponse.json({ user: null });
    }

    const user = findUser(decoded.email);
    if (user) {
      return NextResponse.json({ user: publicUser(user), success: true });
    }

    // Fallback to decoded token payload
    return NextResponse.json({
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role || 'student',
        course: decoded.course || 'BTech CSE'
      },
      success: true
    });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
