import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASection";
import Marquee from "../components/Marquee";
import Image from "next/image";
import Link from "next/link";

export default function PrizePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-8 sm:py-12 md:py-16 overflow-visible">
          {/* Background decorative images */}
          <div className="absolute left-0 top-0 w-[600px] sm:w-[900px] md:w-[1200px] h-[200px] sm:h-[280px] md:h-[325px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/prize/prize-hero-left.png"
              alt=""
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="absolute right-0 top-0 w-[300px] sm:w-[500px] md:w-[700px] h-[200px] sm:h-[280px] md:h-[380px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/prize/prize-hero-right.png"
              alt=""
              fill
              className="object-contain object-right"
              priority
            />
          </div>

          {/* White overlay for mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-white md:from-transparent md:via-transparent md:to-transparent z-[5] pointer-events-none"></div>

          {/* Content */}
          <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
            <div className="ml-6 sm:ml-16 md:ml-24 lg:ml-20 max-w-3xl pt-16 sm:pt-24 md:pt-[160px]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-[#222E00] mb-2 leading-tight">
                THE PRIZE
              </h1>

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-normal text-[#030303] mb-6 sm:mb-8">
                How the Zero Prize Works
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#030303] font-normal leading-relaxed sm:leading-[28px] tracking-[0.02em]">
                  A transparent, rigorous process that identifies and rewards
                  real environmental impact
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-6 sm:py-8 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto md:pl-7">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {/* Card 1 - Launch & Open Call */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col">
                <div className="flex justify-between items-start mb-12 sm:mb-16 md:mb-20">
                  <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl sm:text-2xl font-light text-[#030303]">
                    1
                  </span>
                  <Image
                    src="/prize/launch.png"
                    alt="Launch"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Launch &<br />
                    Open Call
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Nationwide call for proven solutionsfrom innovators,
                    startups, civic bodies, researchers, and youth teams.
                  </p>
                </div>
              </div>

              {/* Card 2 - Independent Verification */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col">
                <div className="flex justify-between items-start mb-12 sm:mb-16 md:mb-20">
                  <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl sm:text-2xl font-light text-[#030303]">
                    2
                  </span>
                  <Image
                    src="/prize/verification.png"
                    alt="Verification"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Independent
                    <br />
                    Verification
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Scientific validation of real-world performance and impact.
                  </p>
                </div>
              </div>

              {/* Card 3 - Expert Evaluation */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col">
                <div className="flex justify-between items-start mb-12 sm:mb-16 md:mb-20">
                  <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl sm:text-2xl font-light text-[#030303]">
                    3
                  </span>
                  <Image
                    src="/prize/eye.png"
                    alt="Evaluation"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Expert
                    <br />
                    Evaluation
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Judges assess verified outcomes, scalability, innovation,
                    and sustainability.
                  </p>
                </div>
              </div>

              {/* Card 4 - Awards & Scale-Up */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col">
                <div className="flex justify-between items-start mb-12 sm:mb-16 md:mb-20">
                  <span className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl sm:text-2xl font-light text-[#030303]">
                    4
                  </span>
                  <Image
                    src="/prize/awards.png"
                    alt="Awards"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Awards &<br />
                    Scale-Up
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Winners gain funding, visibility, mentorship, corporate
                    partnerships, and government adoption pathways.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prize Structure Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#030303] mb-3 sm:mb-4 leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                Prize Structure
              </h2>
              <p className="text-base sm:text-lg md:text-[18px] text-[#030303] font-normal">
                <span className="font-bold">₹5 Crore</span> for Verified Impact
              </p>
            </div>

            {/* Prize Cards Container */}
            <div className="border border-gray-200">
              {/* Three Challenge Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Air Quality Challenge */}
                <div className="md:border-r border-gray-200">
                  <div className="bg-[#F7C064] p-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-[32px] font-semibold text-[#030303]">
                        ₹1 Crore
                      </h3>
                      <p className="text-[16px] text-[#030303] font-normal">
                        Air Quality Challenge
                      </p>
                    </div>
                    <Image
                      src="/prize/air.png"
                      alt="Air Quality"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-8 bg-white border-b md:border-b-0 border-gray-200">
                    <div className="mb-6">
                      <span className="inline-block border border-[#030303] px-4 py-2 text-sm text-[#030303] font-normal">
                        Goal
                      </span>
                    </div>
                    <p className="text-[16px] text-[#030303] mb-6 leading-relaxed">
                      Achieve a verified{" "}
                      <span className="font-bold">
                        15–25% reduction in population-weighted PM₂.₅ exposure
                      </span>{" "}
                      within a defined pilot area.
                    </p>
                    <ul className="space-y-3 text-[14px] text-[#666666]">
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Measurable air quality improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>2–3 month pilot period</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Independent verification</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Water Pollution Challenge */}
                <div className="border-r border-gray-200">
                  <div className="bg-[#7AD1C3] p-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-[32px] font-semibold text-[#030303]">
                        ₹1 Crore
                      </h3>
                      <p className="text-[16px] text-[#030303] font-normal">
                        Water Pollution Challenge
                      </p>
                    </div>
                    <Image
                      src="/prize/water.png"
                      alt="Water Quality"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-8 bg-white">
                    <div className="mb-6">
                      <span className="inline-block border border-[#030303] px-4 py-2 text-sm text-[#030303] font-normal">
                        Goal
                      </span>
                    </div>
                    <p className="text-[16px] text-[#030303] mb-6 leading-relaxed">
                      Demonstrate a verified{" "}
                      <span className="font-bold">
                        20–30% reduction in wastewater pollution load
                      </span>{" "}
                      at defined source points or discharge clusters.
                    </p>
                    <ul className="space-y-3 text-[14px] text-[#666666]">
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Reduction in BOD, COD, TSS and nutrient pollution load (kg/day)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Wastewater treated, reused, or prevented from discharge (MLD)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Verified water quality monitoring using CPCB-aligned sampling protocols</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Land Pollution Challenge */}
                <div>
                  <div className="bg-[#7AD180] p-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-[32px] font-semibold text-[#030303]">
                        ₹1 Crore
                      </h3>
                      <p className="text-[16px] text-[#030303] font-normal">
                        Land Pollution Challenge
                      </p>
                    </div>
                    <Image
                      src="/prize/land.png"
                      alt="Land Pollution"
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="p-8 bg-white">
                    <div className="mb-6">
                      <span className="inline-block border border-[#030303] px-4 py-2 text-sm text-[#030303] font-normal">
                        Goal
                      </span>
                    </div>
                    <p className="text-[16px] text-[#030303] mb-6 leading-relaxed">
                      Reduce,{" "}
                      <span className="font-bold">
                        recycle or sustainably prevent 15,000 tonnes
                      </span>{" "}
                      of waste from going to landfills over 3 years
                    </p>
                    <ul className="space-y-3 text-[14px] text-[#666666]">
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Waste reduction tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Recycling &amp; sustainable disposal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Image
                          src="/prize/tick.png"
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>Quarterly impact verification</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Banner */}
              <div className="bg-[#F7C064] px-8 py-6 flex items-center justify-between border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
                    <div className="relative w-8 h-8">
                      <Image
                        src="/SPG/cap.png"
                        alt="Icon"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-[16px] text-[#030303] font-bold">
                    Want to know about the Evaluation Framework?
                  </p>
                </div>
                <Link
                  href="/evaluation-framework"
                  className="bg-white text-[#1D9770] px-6 py-3 text-[14px] font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  Read More
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Special Categories Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left - Illustration */}
              <div className="relative w-full h-[500px]">
                <Image
                  src="/prize/special-categories.png"
                  alt="Special Categories"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right - Content */}
              <div className="space-y-8">
                <h2 className="text-[46px] font-semibold text-[#222E00] leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                  Special Categories
                </h2>

                <p className="text-[18px] text-[#666666] font-normal leading-relaxed">
                  Celebrating innovation across diverse groups and recognizing
                  breakthrough solutions
                </p>

                <div className="space-y-6">
                  {/* Youth Innovation */}
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      Youth Innovation
                    </h3>
                    <p className="text-[16px] text-[#666666] font-normal leading-relaxed">
                      Students and young innovators (&lt; 18 yrs) making impact
                    </p>
                  </div>

                  {/* Civic Innovation */}
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      Civic Innovation
                    </h3>
                    <p className="text-[16px] text-[#666666] font-normal leading-relaxed">
                      Government-led environmental solutions
                    </p>
                  </div>

                  {/* Popular Vote */}
                  <div>
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      Popular Vote
                    </h3>
                    <p className="text-[16px] text-[#666666] font-normal leading-relaxed">
                      Public recognition for impactful solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rollout Timeline Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#030303] mb-2 sm:mb-4 leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                Rollout Timeline
              </h2>
              <p className="text-sm sm:text-base md:text-[18px] text-[#666666] font-normal">
                Expected timeline of the roll out of the prize
              </p>

              {/* Marquee notice */}
              <Marquee variant="timeline" className="mt-5" />
            </div>

            {/* Desktop Timeline - Hidden on mobile */}
            <div className="relative hidden lg:block">
              {/* Horizontal Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>

              {/* Timeline Items */}
              <div className="relative grid grid-cols-7 gap-4">
                {/* Item 1 - February 2026 */}
                <div className="relative">
                  {/* Top Content */}
                  <div className="text-center mb-20 pb-8">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      February 2026
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Prize Launched
                    </p>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[120px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      1
                    </span>
                  </div>
                </div>

                {/* Item 2 - March 2026 */}
                <div className="relative">
                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      2
                    </span>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[252px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Bottom Content */}
                  <div className="text-center mt-[340px]">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      March 2026
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Applications Portal<br />Opens - 15 March 2026
                    </p>
                  </div>
                </div>

                {/* Item 3 - August 2026 */}
                <div className="relative">
                  {/* Top Content */}
                  <div className="text-center mb-20 pb-8">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      August 2026
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Application Submission Closes - 31 August 2026
                    </p>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[120px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      3
                    </span>
                  </div>
                </div>

                {/* Item 4 - September to October 2027 */}
                <div className="relative">
                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      4
                    </span>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[252px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Bottom Content */}
                  <div className="text-center mt-[340px]">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      September & October 2026
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Baseline Establishment & Pilot Approvals for Shortlisted Applications
                    </p>
                  </div>
                </div>

                {/* Item 5 - November to December 2026 */}
                <div className="relative">
                  {/* Top Content */}
                  <div className="text-center mb-20 pb-8">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      November & December 2026
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Pilot Implementation, Monitoring & Data Submission
                    </p>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[120px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      5
                    </span>
                  </div>
                </div>

                {/* Item 6 - January to February 2027 */}
                <div className="relative">
                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      6
                    </span>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[252px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Bottom Content */}
                  <div className="text-center mt-[340px]">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      January & February 2027
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Evaluation & Finalist Selection
                    </p>
                  </div>
                </div>

                {/* Item 7 - March 2027 */}
                <div className="relative">
                  {/* Top Content */}
                  <div className="text-center mb-20 pb-8">
                    <h3 className="text-[20px] font-bold text-[#1A5F52] mb-2">
                      March 2027
                    </h3>
                    <p className="text-[14px] text-[#666666] font-normal">
                      Finalist&apos;s Pitch Day & Awards Ceremony
                    </p>
                  </div>

                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-[120px] w-0.5 h-[80px] bg-gray-300 -translate-x-1/2"></div>

                  {/* Number Box */}
                  <div className="absolute left-1/2 top-[200px] -translate-x-1/2 w-12 h-12 bg-gray-200 flex items-center justify-center z-10">
                    <span className="text-[20px] font-semibold text-[#1A5F52]">
                      7
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Timeline - Vertical Layout */}
            <div className="lg:hidden space-y-6">
              {/* Item 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      1
                    </span>
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    February 2026
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Prize Launched
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      2
                    </span>
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    March 2026
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Applications Portal<br />Opens - 15 March 2026
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      3
                    </span>
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    August 2026
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Application Submission Closes - 31 August 2026
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      4
                    </span>
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    September & October 2026
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Baseline Establishment & Pilot Approvals for Shortlisted Applications
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      5
                    </span>
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    November & December 2026
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Pilot Implementation, Monitoring & Data Submission
                  </p>
                </div>
              </div>

              {/* Item 6 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      6
                    </span>
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    January & February 2027
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Evaluation & Finalist Selection
                  </p>
                </div>
              </div>

              {/* Item 7 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-base sm:text-lg font-semibold text-[#1A5F52]">
                      7
                    </span>
                  </div>
                </div>
                <div className="pb-6 flex-1">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                    March 2027
                  </h3>
                  <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] font-normal">
                    Finalist&apos;s Pitch Day & Awards Ceremony
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
