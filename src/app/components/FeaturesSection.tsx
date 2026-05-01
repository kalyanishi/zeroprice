import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center text-[#030303] mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto px-4">
          India's First Results-Based Environmental Prize
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {/* Card 1 - Prize Pool */}
          <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col">
            <div className="flex justify-end mb-12 sm:mb-16 md:mb-20">
              <Image
                src="/rupee.png"
                alt="Prize Pool"
                width={60}
                height={60}
                className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                ₹5 Cr<br />Prize Pool
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                A nationwide call to innovators, startups, civic bodies, researchers, and youth to tackle pollution at scale.
              </p>
            </div>
          </div>

          {/* Card 2 - Global Innovation Models */}
          <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col">
            <div className="flex justify-end mb-12 sm:mb-16 md:mb-20">
              <Image
                src="/globe.png"
                alt="Global Innovation"
                width={60}
                height={60}
                className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                Inspired by Global<br />Innovation Models
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                Built on the principles of XPRIZE and Earthshot, adapted for India's scale, urgency, and complexity.
              </p>
            </div>
          </div>

          {/* Card 3 - Verified Impact */}
          <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col sm:col-span-2 md:col-span-1">
            <div className="flex justify-end mb-12 sm:mb-16 md:mb-20">
              <Image
                src="/security.png"
                alt="Verified Impact"
                width={60}
                height={60}
                className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                Verified<br />Impact Only
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                Every winning solution to be validated by independent scientific institutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
