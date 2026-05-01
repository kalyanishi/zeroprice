import { NextRequest, NextResponse } from 'next/server';

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
