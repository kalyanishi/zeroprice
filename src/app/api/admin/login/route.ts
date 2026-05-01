import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionCookieValue,
} from '@/lib/admin-auth';
import { resolveAdminAccount } from '@/lib/admin-user-store';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const response = NextResponse.json({
      success: true,
      session: {
        email: email || 'admin@zeroprize.local',
        role: 'super_admin',
        allowedCategories: ['air', 'water', 'land'],
        displayName: 'Admin User',
      },
    });
    response.cookies.set(ADMIN_SESSION_COOKIE_NAME, 'mock_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

