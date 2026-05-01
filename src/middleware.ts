import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  // Allow all traffic in frontend-only mode
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
