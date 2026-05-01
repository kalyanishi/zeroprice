import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getApplicantIdentity, insertWithOptionalClerkUserId } from '@/lib/application-auth';
import { Resend } from 'resend';
import ApplicationAdminEmail from '@/emails/ApplicationAdminEmail';
import ApplicationConfirmationEmail from '@/emails/ApplicationConfirmationEmail';
import { appendApplicationToSheet } from '@/lib/googleSheets';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ 
      success: true, 
      applicationId: `MOCK_${Date.now()}`, 
      applicantEmail: body.applicantEmail || 'mock@example.com' 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

