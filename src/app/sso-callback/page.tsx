'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SSOCallback() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/apply');
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1D9770]/10 border border-[#1D9770]/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 animate-spin text-[#1D9770]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Returning you to the portal</h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Please wait...
        </p>
      </div>
    </main>
  );
}
