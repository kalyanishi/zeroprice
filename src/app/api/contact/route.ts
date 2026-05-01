import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactConfirmationEmail from '@/emails/ContactConfirmationEmail';
import ContactAdminEmail from '@/emails/ContactAdminEmail';
import { supabaseAdmin } from '@/lib/supabase';
import { appendContactToSheet } from '@/lib/googleSheets';

const SUBJECT_MAP: Record<string, string> = {
  apply: 'Thank you for your interest in the Zero Prize',
  partnerships: 'Thank you for your interest in partnering with the Zero Prize',
  sponsorships: 'Thank you for your interest in sponsoring the Zero Prize',
  media: 'Thank you for contacting Zero Prize',
  volunteering: 'Thank you for contacting Zero Prize',
};

const CC_OPTIONS = new Set(['partnerships', 'sponsorships']);
const CC_ADDRESSES = ['info@policyandgovernance.in', 'skrishnan@policyandgovernance.in'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully (Mock)!',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}

