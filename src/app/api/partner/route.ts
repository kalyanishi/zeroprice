import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import PartnerConfirmationEmail from '@/emails/PartnerConfirmationEmail';
import { supabaseAdmin } from '@/lib/supabase';
import { appendPartnerToSheet } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Partnership inquiry submitted successfully (Mock)!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit inquiry.' }, { status: 500 });
  }
}

