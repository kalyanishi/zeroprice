'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { useApplyMode } from "../hooks/useApplyMode";

const ArrowIcon = () => (
  <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sm:w-5 sm:h-5 text-[#1D9770]"
    >
      <path
        d="M10 4L10 16M10 16L16 10M10 16L4 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default function NotificationBanner() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const isApplyMode = useApplyMode();

  return (
    <>
      <div className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-[#F5B461] px-4 sm:px-6 md:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
            <div className="bg-white rounded-full p-2 sm:p-2.5 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image
                src="/lightning.png"
                alt="Lightning"
                width={20}
                height={20}
                className="object-contain sm:w-6 sm:h-6"
              />
            </div>
            <div>
              <p className="text-[#030303] font-semibold text-sm sm:text-base">
                Stay updated on launch dates, applications,
              </p>
              <p className="text-[#030303] font-semibold text-sm sm:text-base">
                and partnership opportunities.
              </p>
            </div>
          </div>
          {isApplyMode ? (
            <Link
              href="/apply"
              className="flex items-center gap-2 text-[#030303] text-xs sm:text-sm font-normal hover:opacity-80 transition-opacity cursor-pointer"
            >
              Apply Now
              <ArrowIcon />
            </Link>
          ) : (
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 text-[#030303] text-xs sm:text-sm font-normal hover:opacity-80 transition-opacity cursor-pointer"
            >
              Register your Interest
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
