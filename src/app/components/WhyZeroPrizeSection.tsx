import Image from "next/image";

export default function WhyZeroPrizeSection() {
  return (
    <section className="px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left side - The Challenge (Dark Green) */}
          <div className="bg-[#1A5F52] p-6 sm:p-10 md:p-16">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <span className="bg-white text-[#030303] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-normal inline-block mb-6 sm:mb-8">
                The Challenge
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#7AD1C3] mb-4 sm:mb-6">
                Why Zero Prize?
                <br />
                Why Now?
              </h2>
              <p className="text-white text-base sm:text-lg font-light">
                Despite strong national policies, innovations struggle to scale due to:
              </p>
            </div>

            {/* Challenge Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Card 1 */}
              <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/fragment.png"
                      alt="Fragmented efforts"
                      width={20}
                      height={20}
                      className="object-contain w-4 sm:w-5"
                    />
                  </div>
                  <h3 className="text-[#030303] text-sm sm:text-base font-medium pt-0.5 sm:pt-1">
                    Fragmented<br />efforts
                  </h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm font-light">
                  Disconnected solutions across sectors
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/slow.png"
                      alt="Slow adoption"
                      width={20}
                      height={20}
                      className="object-contain w-4 sm:w-5"
                    />
                  </div>
                  <h3 className="text-[#030303] text-sm sm:text-base font-medium pt-0.5 sm:pt-1">
                    Slow<br />adoption
                  </h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm font-light">
                  Working solutions remain unused
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/insufficient.png"
                      alt="Insufficient proof"
                      width={20}
                      height={20}
                      className="object-contain w-4 sm:w-5"
                    />
                  </div>
                  <h3 className="text-[#030303] text-sm sm:text-base font-medium pt-0.5 sm:pt-1">
                    Insufficient<br />proof
                  </h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm font-light">
                  Lack of verified impact data
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/limited.png"
                      alt="Limited platforms"
                      width={20}
                      height={20}
                      className="object-contain w-4 sm:w-5"
                    />
                  </div>
                  <h3 className="text-[#030303] text-sm sm:text-base font-medium pt-0.5 sm:pt-1">
                    Limited<br />platforms
                  </h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm font-light">
                  Few outcome-based opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Right side - The Solution (Light Gray) */}
          <div className="bg-[#F2EEEE] p-6 sm:p-10 md:p-16">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <span className="bg-white border border-[#030303] text-[#030303] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-normal inline-block mb-6 sm:mb-8">
                The Solution
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A5F52] mb-4 sm:mb-6">
                The Zero Prize changes the equation.
              </h2>
              <p className="text-[#030303] text-base sm:text-lg font-light">
                It rewards results, not intentions, and builds the ecosystem India needs for breakthrough environmental innovation.
              </p>
            </div>

            {/* Solution List */}
            <div className="space-y-4 sm:space-y-6">
              {/* Item 1 */}
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="flex-shrink-0 bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Image
                    src="/tick.png"
                    alt="Check"
                    width={20}
                    height={20}
                    className="object-contain w-4 sm:w-5"
                  />
                </div>
                <p className="text-[#030303] text-sm sm:text-base font-light">
                  Results-based incentives that reward impact
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="flex-shrink-0 bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Image
                    src="/tick.png"
                    alt="Check"
                    width={20}
                    height={20}
                    className="object-contain w-4 sm:w-5"
                  />
                </div>
                <p className="text-[#030303] text-sm sm:text-base font-light">
                  Independent verification by leading institutions
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="flex-shrink-0 bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Image
                    src="/tick.png"
                    alt="Check"
                    width={20}
                    height={20}
                    className="object-contain w-4 sm:w-5"
                  />
                </div>
                <p className="text-[#030303] text-sm sm:text-base font-light">
                  National platform for solution discovery
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="flex-shrink-0 bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mt-0.5 sm:mt-1">
                  <Image
                    src="/tick.png"
                    alt="Check"
                    width={20}
                    height={20}
                    className="object-contain w-4 sm:w-5"
                  />
                </div>
                <p className="text-[#030303] text-sm sm:text-base font-light">
                  Ecosystem support for winning innovations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
