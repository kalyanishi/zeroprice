'use client';

import { useState } from 'react';
import Link from 'next/link';
import RegisterModal from './RegisterModal';
import PartnerModal from './PartnerModal';
import { useApplyMode } from '../hooks/useApplyMode';

export default function CTASection() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const isApplyMode = useApplyMode();

  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1D9770] py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Join the mission for a<br />
                Cleaner India
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 md:mb-10 font-normal">
                Be part of a movement that rewards real impact and transforms India's environmental future.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                {isApplyMode ? (
                  <Link
                    href="/apply"
                    className="bg-white text-[#1D9770] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="bg-white text-[#1D9770] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Register Your Interest
                  </button>
                )}
                <button 
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold border-2 border-white hover:bg-white hover:text-[#1D9770] transition-colors"
                >
                  Become a Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
      <PartnerModal 
        isOpen={isPartnerModalOpen} 
        onClose={() => setIsPartnerModalOpen(false)} 
      />
    </>
  );
}
