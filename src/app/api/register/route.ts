import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import RegisterConfirmationEmail from '@/emails/RegisterConfirmationEmail';
import { supabaseAdmin } from '@/lib/supabase';
import { appendRegistrationToSheet } from '@/lib/googleSheets';

interface RegisterAdminEmailData {
  name: string;
  email: string;
  organization?: string;
  phone?: string;
  category: string;
  interest?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful (Mock)!',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to complete registration.' }, { status: 500 });
  }
}

