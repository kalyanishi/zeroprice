import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

const BUCKET = 'application-files';
const MAX_SIZE_MB = 10;

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({ 
      url: 'https://example.com/mock-file.pdf', 
      path: 'mock/path/file.pdf' 
    });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

