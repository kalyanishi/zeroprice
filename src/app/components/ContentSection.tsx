import Image from "next/image";
import Link from "next/link";

export default function ContentSection() {
  return (
    <section className="px-4 sm:px-6 pb-0">
      <div className="max-w-7xl mx-auto bg-[#1A5F52] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left side - Text content */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col justify-center gap-6 sm:gap-8">
            <div>
              <h2 className="text-[#7AD1C3] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                No promises.
                <br />
                Only results.
              </h2>
              <p className="text-white text-base sm:text-lg leading-relaxed">
                Science-verified outcomes, publicly transparent, powered by India&apos;s brightest
                problem-solvers. A moment where innovation meets impact at national scale.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-[#030303] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-normal hover:bg-gray-100 transition-colors w-fit"
            >
              Learn about us
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 28 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-7 sm:h-7"
              >
                <path 
                  d="M5 14H23M23 14L14 5M23 14L14 23" 
                  stroke="#7AD1C3" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Right side - Illustration */}
          <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[600px]">
            <Image
              src="/no_promises.png"
              alt="Clean Energy Illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
