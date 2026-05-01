import Image from "next/image";

export default function WhyIndiaNeedsSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <Image
              src="/3_Why-It-Matters.png"
              alt="Pollution in India"
              width={600}
              height={600}
              className="object-contain w-full"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-normal text-[#030303]">
              Why India Needs the Zero Prize
            </h2>

            {/* Statistics */}
            <div className="space-y-8">
              {/* Stat 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12">
                  <Image
                    src="/wind.png"
                    alt="Air"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A5F52] mb-1">9 in 10</h3>
                  <p className="text-base text-gray-700 font-light">Indians breathe unsafe air</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12">
                  <Image
                    src="/water.png"
                    alt="Water"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A5F52] mb-1">70%</h3>
                  <p className="text-base text-gray-700 font-light">of surface water remains polluted</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12">
                  <Image
                    src="/plant.png"
                    alt="Land"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A5F52] mb-1">9+ million tonnes</h3>
                  <p className="text-base text-gray-700 font-light">of surface water remains polluted</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12">
                  <Image
                    src="/circles.png"
                    alt="Economic Loss"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1A5F52] mb-1">₹3 lakh crore</h3>
                  <p className="text-base text-gray-700 font-light">in economic losses from pollution each year</p>
                </div>
              </div>
            </div>

            {/* Bottom Call-out Box */}
            <div className="bg-[#F2EEEE] p-8">
              <h3 className="text-xl font-bold text-[#1A5F52] mb-3">
                India has thousands of pilots, but very few large-scale, proven solutions.
              </h3>
              <p className="text-base text-gray-700 font-light">
                The Zero Prize funds verified impact and accelerates solutions that can scale across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
