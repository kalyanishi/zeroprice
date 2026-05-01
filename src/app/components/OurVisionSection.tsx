import Image from "next/image";

export default function OurVisionSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-normal text-center text-[#030303] mb-4 max-w-4xl mx-auto">
          Our Vision
        </h2>
        <p className="text-xl text-center text-[#030303] font-light mb-16">
          A Cleaner, Healthier, Future-Ready India
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-1">
          {/* Card 1 - Inspire Innovation */}
          <div className="bg-[#F2EEEE] p-10 flex flex-col">
            <div className="flex justify-end mb-20">
              <Image
                src="/inspire.png"
                alt="Inspire Innovation"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-3xl font-light text-[#030303] mb-3">
                Inspire<br />Innovation
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Mobilise India's brightest minds to deliver measurable impact
              </p>
            </div>
          </div>

          {/* Card 2 - Build the Ecosystem */}
          <div className="bg-[#F2EEEE] p-10 flex flex-col">
            <div className="flex justify-end mb-20">
              <Image
                src="/build.png"
                alt="Build the Ecosystem"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-3xl font-light text-[#030303] mb-3">
                Build the<br />Ecosystem
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Connect science, policy, industry, communities, and youth.
              </p>
            </div>
          </div>

          {/* Card 3 - Lead Globally */}
          <div className="bg-[#F2EEEE] p-10 flex flex-col">
            <div className="flex justify-end mb-20">
              <Image
                src="/lead.png"
                alt="Lead Globally"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-3xl font-light text-[#030303] mb-3">
                Lead<br />Globally
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Establish India as a model for pay-for-results environmental action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
