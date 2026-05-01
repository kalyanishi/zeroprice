'use client';

import { useState } from 'react';
import Link from 'next/link';
import RegisterModal from './RegisterModal';
import Marquee from './Marquee';
import { useApplyMode } from '../hooks/useApplyMode';

export default function Hero() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const isApplyMode = useApplyMode();

  return (
    <>
      <div className="pt-20">
        <Marquee variant="hero" />
      </div>
      <section className="min-h-[calc(100vh-450px)] flex items-center px-4 sm:px-6 pt-4 sm:pt-6 pb-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - Heading */}
          <div>
            <h1 className="text-[#030303] font-bold ext-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
              THE ZERO PRIZE
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-normal text-[#030303]">
              For a Pollution-Free India
            </p>
          </div>

          {/* Right side - Description and CTA */}
          <div className="space-y-6 sm:space-y-8">
            <p
              className="text-[#030303] text-base sm:text-lg md:text-[22px] leading-6 sm:leading-7 md:leading-[28px] tracking-[0.02em] font-normal"
            >
              A <span className="font-bold">₹5 Crore</span> national innovation challenge
              rewarding real, independently verified solutions
              that make India&apos;s air, water, and land
              measurably cleaner for future generations.
            </p>
            {isApplyMode ? (
              <Link
                href="/apply"
                className="inline-block bg-[#1D9770] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-normal hover:bg-[#178760] transition-colors"
              >
                Apply Now
              </Link>
            ) : (
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="inline-block bg-[#1D9770] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-normal hover:bg-[#178760] transition-colors"
              >
                Register your Interest
              </button>
            )}
          </div>
        </div>
      </section>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
