"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AboutPage() {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [isPriyankaModalOpen, setIsPriyankaModalOpen] = useState(false);
  const [isBraintrustModalOpen, setIsBraintrustModalOpen] = useState(false);
  const [isShobhaModalOpen, setIsShobhaModalOpen] = useState(false);
  const [isIndumathiModalOpen, setIsIndumathiModalOpen] = useState(false);
  const [isNitinModalOpen, setIsNitinModalOpen] = useState(false);
  const [isMishraModalOpen, setIsMishraModalOpen] = useState(false);
  const [isBhaskarModalOpen, setIsBhaskarModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative w-full bg-white pt-14 sm:pt-20 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* LEFT DECOR SVG */}
            <div className="absolute left-0 top-0 w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] h-[140px] sm:h-[200px] md:h-[260px] lg:h-[300px]">
              <Image
                src="/about-hero-left.svg"
                alt=""
                fill
                className="object-contain object-left-top"
                priority
              />
            </div>

            {/* RIGHT DECOR SVG */}
            <div className="absolute right-0 top-0 w-[70%] sm:w-[55%] md:w-[60%] lg:w-[65%] h-[140px] sm:h-[200px] md:h-[260px] lg:h-[300px]">
              <Image
                src="/about-hero-right.svg"
                alt=""
                fill
                className="object-contain object-right-top"
                priority
              />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pl-6 sm:pl-14 md:pl-20 lg:pl-30">
            <div
              className="max-w-2xl 
      pt-8 sm:pt-12 md:pt-16 lg:pt-20 
      pb-10 sm:pb-12 md:pb-16"
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px]
        font-bold text-[#222E00] leading-tight mb-1 sm:mb-2"
              >
                ABOUT US
              </h1>

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#030303] mb-6">
                What is the Zero Prize
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#030303] leading-relaxed mb-4">
                The Zero Prize is India's first results-based environmental
                challenge dedicated to reducing air, water, and land pollution
                through
                <span className="font-bold">
                  {" "}
                  measurable, independently validated outcomes.
                </span>
              </p>

              <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#030303] leading-relaxed">
                It brings together innovators, businesses, researchers, and
                civic organisations and youth groups to deliver
                <span className="font-bold"> real, scalable impact</span> at a
                national level.
              </p>
            </div>
          </div>
        </section>

        {/* About SPG Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left - Illustration */}
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] order-2 lg:order-1">
                <Image
                  src="/SPG/about spg.png"
                  alt="About SPG Illustration"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right - Content */}
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                  About the School
                  <br />
                  of Policy & Governance
                  <br />
                  (SPG)
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52]">
                    Convenor of the Zero Prize
                  </h3>
                  <p className="text-sm sm:text-base md:text-[18px] text-[#030303] font-normal leading-relaxed">
                    The School of Policy & Governance (SPG) is India&apos;s
                    leading institution for sustainability, climate action and
                    public-policy education with over 2,000+ alumni influencing
                    policy and practice across India and the Global South.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base md:text-[18px] font-bold text-[#030303]">
                    SPG has collaborated with:
                  </h3>

                  {/* Logos Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    <Link
                      href="https://www.undp.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/undp.png"
                          alt="UNDP"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/two-logo.png"
                          alt="Partner Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="https://www.unwomen.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/UN-women.png"
                          alt="UN Women"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="https://www.iitm.ac.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/iit-madras.png"
                          alt="IIT Madras"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="https://www.iiml.ac.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/IIM-lucknow.png"
                          alt="IIM Lucknow"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="https://manipal.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-24 sm:h-28 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://www.manipal.edu/content/dam/manipal/mu/mcops-manipal/Images_new/MAHE_Color.svg"
                          alt="Manipal Academy of Higher Education"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="https://mes.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/military.png"
                          alt="Military Engineering Services"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <Link
                      href="https://sscgj.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <div className="relative w-full h-20 sm:h-24">
                        <Image
                          src="/SPG/scgj.jpg"
                          alt="SCGJ"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Visit SPG Button */}
                  <div className="pt-2">
                    <Link
                      href="https://policyandgovernance.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#1D9770] text-white px-6 py-3 text-sm font-bold hover:bg-[#178760] transition-colors"
                    >
                      Visit SPG
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] mb-3 sm:mb-4 leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                Team Behind the Zero Prize
              </h2>
              <p className="text-sm sm:text-base md:text-[18px] text-[#030303] font-normal">
                Visionary leaders committed to transforming India&apos;s
                environmental future
              </p>
            </div>
          </div>

          {/* Team Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mb-1">
              {/* Saket Burman Card */}
              <div className="bg-[#F2EEEE] flex flex-col sm:flex-row overflow-hidden">
                {/* Photo */}
                <div className="relative w-full sm:w-1/2 h-[350px] sm:h-[400px] md:h-[450px] sm:-ml-6 -mt-[2px]">
                  <Image
                    src="/SPG/Saket-Burman 1.png"
                    alt="Saket Burman"
                    fill
                    className="object-contain object-center sm:object-left"
                    quality={100}
                  />
                </div>

                {/* Content */}
                <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center font-['Inter']">
                  <h3 className="text-xl sm:text-2xl md:text-[28px] font-normal text-[#030303] mb-3 sm:mb-4 leading-tight">
                    Saket Burman
                  </h3>
                  <p className="text-sm sm:text-sm md:text-[14px] font-bold text-[#1A5F52] mb-4 sm:mb-6 leading-snug">
                    Vice Chairman,
                    <br />
                    Dabur India Ltd.
                  </p>
                  <p className="text-sm sm:text-sm md:text-[14px] text-[#666666] font-normal leading-relaxed">
                    Entrepreneur, investor, and advisor to multiple business and
                    social-impact initiatives.
                  </p>
                </div>
              </div>

              {/* Ruchir Punjabi Card */}
              <div className="bg-[#F2EEEE] flex flex-col sm:flex-row overflow-hidden">
                {/* Photo */}
                <div className="relative w-full sm:w-1/2 h-[350px] sm:h-[400px] md:h-[450px] sm:-ml-6">
                  <Image
                    src="/SPG/ruchir.png"
                    alt="Ruchir Punjabi"
                    fill
                    className="object-contain object-center sm:object-left"
                    quality={100}
                  />
                </div>

                {/* Content */}
                <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center font-['Inter']">
                  <h3 className="text-xl sm:text-2xl md:text-[28px] font-normal text-[#030303] mb-3 sm:mb-4 leading-tight">
                    Ruchir Punjabi
                  </h3>
                  <p className="text-sm sm:text-sm md:text-[14px] font-bold text-[#1A5F52] mb-4 sm:mb-6 leading-snug">
                    Chair, School of Policy &<br />
                    Governance
                  </p>
                  <p className="text-sm sm:text-sm md:text-[14px] text-[#666666] font-normal leading-relaxed">
                    Founder of clean-energy and technology ventures; active in
                    public-policy and youth leadership initiatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="bg-[#7AD1C3] px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                    <Image
                      src="/SPG/cap.png"
                      alt="Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-[16px] text-[#030303] font-bold">
                  A Steering Committee and SPG Secretariat ensure smooth
                  execution, governance, and national coordination.
                </p>
              </div>
              <button className="bg-white text-[#030303] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-[14px] font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors self-start sm:self-auto whitespace-nowrap">
                Know More
                <span>↓</span>
              </button>
            </div>
          </div>
        </section>

        {/* Board of Advisors Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] mb-3 sm:mb-4 leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                Board of Advisors
              </h2>
            </div>

            {/* Advisor Cards */}
            <div className="flex flex-wrap justify-center gap-6">
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsAdvisorModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px]">
                  <Image
                    src="/advisors/Premal.jpg"
                    alt="Premal Shah"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Mr. Premal Shah
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      Co-founder & President, Kiva
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>

              {/* Ms. Priyanka Sharma Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsPriyankaModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px]">
                  <Image
                    src="/advisors/priyanka.jpg"
                    alt="Ms. Priyanka Sharma"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Ms. Priyanka Sharma
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      Nominee of Mobius Foundation.
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advisor Modal */}
        {isAdvisorModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsAdvisorModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsAdvisorModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/Premal.jpg"
                      alt="Premal Shah"
                      fill
                      className="object-cover rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Mr. Premal Shah</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">Co-founder & President, Kiva</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Premal Shah co-founded Kiva.org — a global online non-profit that's raised over $2 billion for low income communities in more than 70 countries. Shah started Kiva after volunteering at the Gandhi Ashram in India, where he developed a deeper appreciation of Gandhian philosophy. Since 2005, over $2 billion in philanthropic loans has been crowdfunded to millions of under-served entrepreneurs in 90 countries — with a 96% repayment rate. The site has been named as one of Oprah's Favourite Things and a Top 50 Website by TIME Magazine.
                      </p>
                      <p>
                        Shah has now launched Renewables.org — a 'Kiva for climate change' non-profit which aims to accelerate clean energy across India and Africa, where grids are dirtiest and one's dollar has greatest CO2 reduction potential. He also serves on the boards of Change.org and the Center For Humane Technology (the non-profit behind Netflix's most watched documentary "The Social Dilemma").
                      </p>
                      <p>
                        Shah began his career as one of PayPal's first product managers and graduated from Stanford University.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPriyankaModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPriyankaModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPriyankaModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/priyanka.jpg"
                       alt="Ms. Priyanka Sharma"
                      fill
                      className="object-cover rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                      <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Ms. Priyanka Sharma</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">Nominee of Mobius Foundation.</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Ms. Priyanka Sharma is Head of Programs and Partnerships at Mobius Foundation. She also leads Mobius Foundation’s biogas based circular economy interventions. Founded by Mr. Pradip Burman in 2015, the Mobius Foundation promotes environmental sustainability through its thematic focus areas and interventions in education, population stabilization, recycling, renewable energy and biodiversity conservation.
                      </p>
                      <p>
                        Prior to her role at Mobius Foundation, Ms. Sharma served as Managing Director for a global investment banking platform leading growth strategy, finance and M&A transactions for corporate, non-profit, private equity and venture capital clients. Ms. Sharma holds an MBA from the University of Oxford and a Diploma in Environmental Law from WWF-India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Technical Braintrust Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] mb-3 sm:mb-4 leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                Technical Braintrust
              </h2>
            </div>

            {/* Braintrust Members - Centered */}
            <div className="flex flex-wrap justify-center gap-6">
              {/* Varun Sridharan Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsBraintrustModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px] bg-white">
                  <Image
                    src="/advisors/varun.png"
                    alt="Mr. Varun Sridharan"
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 300px"
                    className="object-contain"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Mr. Varun Sridharan
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      CEO of Greenvironment Innovation & Marketing India (P) Ltd
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>

              {/* Shobha Raghavan Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsShobhaModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px] bg-white">
                  <Image
                    src="/Shobha_Raghavan.png"
                    alt="Ms. Shobha Raghavan"
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 300px"
                    className="object-cover object-top"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Ms. Shobha Raghavan
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      Chief Operating Officer, Saahas Zero Waste
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>

              {/* Dr. Indumathi M. Nambi Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsIndumathiModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px] bg-white">
                  <Image
                    src="/advisors/indumathi.jpg"
                    alt="Dr. Indumathi M. Nambi"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Dr. Indumathi M. Nambi
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      Professor, Department of Civil Engineering, IIT Madras
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>

              {/* Mr. Nitin Bassi Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsNitinModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px] bg-white">
                  <Image
                    src="/advisors/NB_-_Pic.jpg"
                    alt="Mr. Nitin Bassi"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Mr. Nitin Bassi
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      Fellow and Team Lead, Sustainable Water, CEEW
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>

              {/* Prof. S.N. Mishra Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsMishraModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px] bg-white">
                  <Image
                    src="/advisors/Photo_SN_Mishra.jpg"
                    alt="Prof. (Dr.) S.N. Mishra"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 20%" }}
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Prof. (Dr.) S.N. Mishra
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      International Climate Consultant &amp; Visiting Professor at TERI
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>

              {/* Dr. Bhaskar Natarajan Card */}
              <div
                className="bg-[#F2EEEE] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 w-full max-w-[300px]"
                onClick={() => setIsBhaskarModalOpen(true)}
              >
                <div className="relative w-full h-[280px] sm:h-[240px] md:h-[280px] bg-white">
                  <Image
                    src="/advisors/BN_Pic.jpg"
                    alt="Dr. Bhaskar Natarajan"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
                <div className="p-5 sm:p-5 md:p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg sm:text-lg md:text-[20px] font-normal text-[#030303] mb-2 sm:mb-2">
                      Dr. Bhaskar Natarajan
                    </h3>
                    <p className="text-sm sm:text-sm md:text-[14px] text-[#1A5F52] font-normal">
                      Advisor to CSOs; Formerly Senior Advisor at AEEE
                    </p>
                  </div>
                  <div className="text-[#1A5F52] text-2xl">→</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Varun Braintrust Modal */}
        {isBraintrustModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsBraintrustModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsBraintrustModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/varun.png"
                      alt="Mr. Varun Sridharan"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 256px"
                      className="object-contain rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Mr. Varun Sridharan</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">CEO of Greenvironment Innovation & Marketing India (P) Ltd</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Varun is the Founder of Greenvironment Innovation & Marketing India (P) Ltd, a start up environmental engineering company based in Chennai. He is a civil engineer specialized in water, environment & sustainability with work experience in business development & consulting of various water & environmental projects in India, Middle East & Africa. He holds expertise in wastewater process design & treatment technologies, waste to energy technologies, sustainable construction, green building concepts, energy & water audits, design & integration of renewable energy systems. A proactive leader and a resourceful communicator, his strengths include ability to nurture good relationships and influencing people by providing quick and clear cut solutions. He believes -'What you learn is what you get from experience and to gain experience, you don't need to reinvent the wheel', find your MENTOR & be a SMART listener.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shobha Raghavan Modal */}
        {isShobhaModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsShobhaModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsShobhaModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/Shobha_Raghavan.png"
                      alt="Ms. Shobha Raghavan"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 256px"
                      className="object-contain rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Ms. Shobha Raghavan</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">Chief Operating Officer, Saahas Zero Waste</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Shobha Raghavan is the Chief Operating Officer at Saahas Zero Waste, a social enterprise focused on sustainable waste management solutions. With extensive experience in environmental sustainability and social entrepreneurship, she has been instrumental in driving innovative approaches to waste management in India.
                      </p>
                      <p>
                        Under her leadership, Saahas Zero Waste has developed comprehensive waste management systems that combine technology, community engagement, and sustainable practices. Her work focuses on creating circular economy solutions that benefit both the environment and local communities.
                      </p>
                      <p>
                        Shobha is recognized as a thought leader in the sustainability sector and has been featured in various forums for her innovative approaches to environmental challenges. She brings valuable expertise in scaling social enterprises and implementing sustainable solutions at scale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dr. Indumathi M. Nambi Modal */}
        {isIndumathiModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsIndumathiModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsIndumathiModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/indumathi.jpg"
                      alt="Dr. Indumathi M. Nambi"
                      fill
                      className="object-cover rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Dr. Indumathi M. Nambi</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">Professor, Department of Civil Engineering, IIT Madras</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Dr. Indumathi M. Nambi is a Professor in the Department of Civil Engineering at IIT Madras, with over two decades of experience in environmental engineering. Her work focuses on groundwater quality, industrial wastewater treatment, and restoration of water bodies. She has published over 85 peer-reviewed papers and guided numerous PhD and Master&apos;s students.
                      </p>
                      <p>
                        Dr. Indumathi serves on several national and state expert committees, including Jal Jeevan Mission and Unnat Bharat Abhiyan. She has also led key institutional initiatives such as the Centre for Urbanization Buildings and Environment and has contributed to advancing sustainable infrastructure education.
                      </p>
                      <p>
                        A strong advocate for translating research into practice, she has driven problem-oriented innovation and entrepreneurship. She conceptualized the Carbon Zero Challenge, a national platform supporting cleantech innovation among students and startups. She is also associated with ventures like Samudyoga Waste Chakra and Water Chakra, focusing on sustainable waste and water solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mr. Nitin Bassi Modal */}
        {isNitinModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsNitinModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsNitinModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/NB_-_Pic.jpg"
                      alt="Mr. Nitin Bassi"
                      fill
                      className="object-cover rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Mr. Nitin Bassi</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">Fellow and Team Lead, Sustainable Water, Council on Energy, Environment and Water</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Mr. Nitin Bassi is a Fellow at the Council on Energy, Environment and Water (CEEW), where he leads the Sustainable Water Programme. With over two decades of experience, his work focuses on water security, including the circular economy of used water, hydrological accounting, water risk assessments, and the intersection of climate change, water governance, and energy systems.
                      </p>
                      <p>
                        He has contributed to key national and international policy processes, including representing the Ministry of Jal Shakti at the G20 Environment and Climate Sustainability Working Group and co-authoring the Urban 20 White Paper on water security. He also played a key role in shaping the India-EU Water Partnership.
                      </p>
                      <p>
                        A leading public policy researcher in natural resource management, Mr. Bassi has contributed to over 150 publications, bridging technical research with actionable policy insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prof. S.N. Mishra Modal */}
        {isMishraModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsMishraModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsMishraModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/Photo_SN_Mishra.jpg"
                      alt="Prof. (Dr.) S.N. Mishra"
                      fill
                      className="object-cover rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Prof. (Dr.) S.N. Mishra</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">International Climate Consultant and Visiting Professor at TERI</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Prof. (Dr.) S.N. Mishra is a distinguished climate scientist and air quality expert with over 35 years of experience across the Indian Air Force, national institutions, and international advisory roles. With a PhD in Physics and specialization in meteorology, his work focuses on the interplay between weather systems and air quality, particularly in understanding pollution dynamics during critical winter episodes in North-West India.
                      </p>
                      <p>
                        He has contributed to major multi-institutional initiatives such as the STORM Project, advancing predictive frameworks for extreme weather and air quality forecasting. Dr. Mishra has collaborated with leading institutions including DST, IMD, IITM, and international agencies, and has worked on climate and air quality assessments across diverse geographies.
                      </p>
                      <p>
                        His work bridges atmospheric science with policy and national security, including contributions to climate risk assessments. Currently a Visiting Professor at TERI School of Advanced Studies and an international climate consultant, he advises on climate resilience, net-zero strategies, and environmental governance across global projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dr. Bhaskar Natarajan Modal */}
        {isBhaskarModalOpen && (
          <div
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsBhaskarModalOpen(false)}
          >
            <div
              className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsBhaskarModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none z-10"
              >
                ×
              </button>

              <div className="p-6 pt-12">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="relative w-full md:w-64 h-80 flex-shrink-0">
                    <Image
                      src="/advisors/BN_Pic.jpg"
                      alt="Dr. Bhaskar Natarajan"
                      fill
                      className="object-cover rounded-lg"
                      quality={100}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#222E00] mb-2">Dr. Bhaskar Natarajan</h3>
                    <h4 className="text-xl font-bold text-[#1A5F52] mb-4">Advisor to CSOs; Formerly Senior Advisor at AEEE</h4>
                    <div className="space-y-4 text-[#030303] text-base leading-relaxed">
                      <p>
                        Dr. Bhaskar Natarajan is a climate change and sustainable development expert with over three decades of experience working across the public and private sectors, civil society, and international development agencies. His work has focused on advancing renewable energy and energy efficiency initiatives, including grassroots implementation across India.
                      </p>
                      <p>
                        He has contributed to projects supported by global institutions such as the World Bank, USAID, ADB, UNDP, and DFID, and has been part of several government and industry committees on energy and environment. His experience spans leadership roles including Deputy Chief of Party (Energy Efficiency) for the USAID PACE-D project, Managing Director at C-Quest Capital Green Ventures, and Senior Advisor at the Alliance for an Energy Efficient Economy (AEEE).
                      </p>
                      <p>
                        A published author and contributor to international policy discussions, including the UNFCCC, Dr. Natarajan currently serves as an advisor to organizations working in the climate and sustainability space.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Governance & Integrity Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center text-[#030303] mb-3 sm:mb-4 max-w-4xl mx-auto">
              Governance & Integrity
            </h2>
            <p className="text-base sm:text-lg text-center text-[#030303] mb-10 sm:mb-12 md:mb-16 font-normal">
              Every number verified. Every result validated.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {/* Card 1 */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-end h-[80px] sm:h-[90px] md:h-[100px] items-start mb-12 sm:mb-16 md:mb-20">
                  <Image
                    src="/SPG/board.png"
                    alt="Board of Advisors"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Board
                    <br />
                    of Advisors
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Leading voices in policy, business, sustainability, and
                    science chaired by Saket Burman.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-end h-[80px] sm:h-[90px] md:h-[100px] items-start mb-12 sm:mb-16 md:mb-20">
                  <Image
                    src="/SPG/technical.png"
                    alt="Technical Braintrust"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Technical
                    <br />
                    Braintrust
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Scientists and engineers designing measurement frameworks
                    and evaluation protocols
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-end h-[80px] sm:h-[90px] md:h-[100px] items-start mb-12 sm:mb-16 md:mb-20">
                  <Image
                    src="/SPG/zero.png"
                    alt="Zero Watch"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Zero
                    <br />
                    Watch
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Independent verification by IITs, NEERI, CPCB & IISc with
                    transparent public dashboards.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-end h-[80px] sm:h-[90px] md:h-[100px] items-start mb-12 sm:mb-16 md:mb-20">
                  <Image
                    src="/SPG/command.png"
                    alt="Zero Command"
                    width={60}
                    height={60}
                    className="object-contain sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Zero
                    <br />
                    Command
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    SPG Secretariat ensuring standards, execution, operations
                    and stakeholder coordination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
