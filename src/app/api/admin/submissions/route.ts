import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';
import {
  ADMIN_SESSION_COOKIE_NAME,
  canAccessCategory,
  getCategoryScopeLabel,
  isSuperAdmin,
  verifyAdminSessionCookie,
} from '@/lib/admin-auth';

export async function GET() {
  return NextResponse.json({
    contacts: [],
    registrations: [],
    partners: [],
    applications: [],
    session: {
      email: 'admin@zeroprize.local',
      role: 'super_admin',
      allowedCategories: ['air', 'water', 'land'],
      displayName: 'Admin User',
      scopeLabel: 'All categories',
    },
  });
}

