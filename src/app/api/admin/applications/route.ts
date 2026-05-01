import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { updateApplicationStatusInSheet } from '@/lib/googleSheets';
import {
  ADMIN_SESSION_COOKIE_NAME,
  canAccessCategory,
  verifyAdminSessionCookie,
} from '@/lib/admin-auth';

export async function PATCH(req: NextRequest) {
  return NextResponse.json({ success: true });
}

