"use client";

import { useState, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import Image from "next/image";
import Link from "next/link";
import meru from "../../../public/impactPartners/meru.png";
import mobius from "../../../public/mobius.png";
export default function PartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      partnershipType: formData.get("partnershipType") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit partnership inquiry");
      }

      setSubmitStatus({
        type: "success",
        message:
          "Partnership inquiry submitted successfully! We'll be in touch soon.",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit inquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-8 sm:py-12 md:py-16 overflow-visible">
          {/* Background decorative images */}
          <div className="absolute left-0 top-0 w-[300px] sm:w-[500px] md:w-[800px] h-[190px] sm:h-[270px] md:h-[320px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/support/support-hero-left.png"
              alt=""
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="absolute right-0 top-0 w-[300px] sm:w-[500px] md:w-[800px] h-[200px] sm:h-[280px] md:h-[380px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/support/support-hero-right.png"
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
            <div className="ml-12 sm:ml-28 md:ml-30 lg:ml-24 max-w-3xl pt-20 sm:pt-28 md:pt-[180px]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-[#222E00] mb-2 leading-tight">
                OUR PARTNERS
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-normal text-[#030303] mb-6 sm:mb-8">
                Support the Zero Prize
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#030303] font-normal leading-relaxed sm:leading-[28px] tracking-[0.02em]">
                  Join India's premier results-based environmental challenge and
                  be part of measurable, verified impact at a national scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left - Illustration */}
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] order-2 lg:order-1">
                <Image
                  src="/support/why partner.png"
                  alt="Why Partner with the Zero Prize"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right - Content */}
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                  Why Partner with the
                  <br />
                  Zero Prize?
                </h2>

                <div className="space-y-6 sm:space-y-8">
                  {/* National Leadership */}
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src="/support/national.png"
                        alt="National Leadership"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                        National Leadership
                      </h3>
                      <p className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal leading-relaxed">
                        Join India's premier results-based environmental prize.
                      </p>
                    </div>
                  </div>

                  {/* Measurable, Verified Impact */}
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src="/support/verified.png"
                        alt="Measurable, Verified Impact"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                        Measurable, Verified Impact
                      </h3>
                      <p className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal leading-relaxed">
                        Support clean-up outcomes validated by India's top
                        scientific institutions.
                      </p>
                    </div>
                  </div>

                  {/* Brand Alignment */}
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src="/support/brand.png"
                        alt="Brand Alignment"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                        Brand Alignment
                      </h3>
                      <p className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal leading-relaxed">
                        Associate with sustainability, youth empowerment, and
                        positive national action.
                      </p>
                    </div>
                  </div>

                  {/* ESG & Mission Alignment */}
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                      <Image
                        src="/support/ESG.png"
                        alt="ESG & Mission Alignment"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-1 sm:mb-2">
                        ESG & Mission Alignment
                      </h3>
                      <p className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal leading-relaxed">
                        A powerful initiative supporting SDGs & national
                        missions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsorship Framework Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center text-[#030303] mb-3 sm:mb-4 max-w-4xl mx-auto">
              Sponsorship Framework
            </h2>
            <p className="text-base sm:text-lg text-center text-[#030303] mb-8 sm:mb-12 md:mb-16 font-normal px-4">
              Multiple partnership tiers designed to match your commitment and
              impact goals
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
              {/* Card 1 - Title Sponsor */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="mb-3 sm:mb-4 h-[24px] sm:h-[28px]">
                  <span className="inline-block border border-[#030303] px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[12px] font-normal text-[#030303]">
                    Premium
                  </span>
                </div>
                <div className="flex justify-end h-[60px] sm:h-[70px] md:h-[80px] items-start mb-8 sm:mb-10 md:mb-12">
                  <Image
                    src="/support/title.png"
                    alt="Title Sponsor"
                    width={80}
                    height={80}
                    className="object-contain w-[60px] sm:w-[70px] md:w-[80px] h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Title
                    <br />
                    Sponsor
                  </h3>
                  <p className="text-xs sm:text-[14px] font-bold text-[#1A5F52] mb-3 sm:mb-4">
                    1 - Position Available
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Exclusive naming rights, top-tier branding, national
                    visibility and premium event presence.
                  </p>
                </div>
              </div>

              {/* Card 2 - Category Sponsors */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="mb-3 sm:mb-4 h-[24px] sm:h-[28px]">
                  <span className="inline-block border border-[#030303] px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[12px] font-normal text-[#030303]">
                    Featured
                  </span>
                </div>
                <div className="flex justify-end h-[60px] sm:h-[70px] md:h-[80px] items-start mb-8 sm:mb-10 md:mb-12">
                  <Image
                    src="/support/sponsors.png"
                    alt="Category Sponsors"
                    width={80}
                    height={80}
                    className="object-contain w-[60px] sm:w-[70px] md:w-[80px] h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Category
                    <br />
                    Sponsors
                  </h3>
                  <p className="text-xs sm:text-[14px] font-bold text-[#1A5F52] mb-3 sm:mb-4">
                    3 - Position Available
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Lead a vertical - Air, Water, or Land with national
                    visibility and co-branded outreach.
                  </p>
                </div>
              </div>

              {/* Card 3 - Impact Partners */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="mb-3 sm:mb-4 h-[24px] sm:h-[28px]"></div>
                <div className="flex justify-end h-[60px] sm:h-[70px] md:h-[80px] items-start mb-8 sm:mb-10 md:mb-12">
                  <Image
                    src="/support/partners.png"
                    alt="Impact Partners"
                    width={80}
                    height={80}
                    className="object-contain w-[60px] sm:w-[70px] md:w-[80px] h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Impact
                    <br />
                    Partners
                  </h3>
                  <p className="text-xs sm:text-[14px] font-bold text-[#1A5F52] mb-3 sm:mb-4">
                    10 - Position Available
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Adopt a pilot city or innovation hub; co-brand outreach and
                    reports.
                  </p>
                </div>
              </div>

              {/* Card 4 - Supporting Partners */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div className="mb-3 sm:mb-4 h-[24px] sm:h-[28px]"></div>
                <div className="flex justify-end h-[60px] sm:h-[70px] md:h-[80px] items-start mb-8 sm:mb-10 md:mb-12">
                  <Image
                    src="/support/supporting.png"
                    alt="Supporting Partners"
                    width={80}
                    height={80}
                    className="object-contain w-[60px] sm:w-[70px] md:w-[80px] h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-[#030303] mb-2 sm:mb-3">
                    Supporting
                    <br />
                    Partners
                  </h3>
                  <p className="text-xs sm:text-[14px] font-bold text-[#1A5F52] mb-3 sm:mb-4">
                    Multiple Positions Available
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                    Provide expert support, technology, media reach, or in-kind
                    resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits and Go Beyond Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
              {/* Left - Benefits of Sponsorship */}
              <div className="bg-[#1D9770] p-6 sm:p-10 md:p-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#7AD1C3] mb-3 sm:mb-4">
                  Benefits of
                  <br />
                  Sponsorship
                </h2>
                <p className="text-base sm:text-lg md:text-[18px] text-white mb-8 sm:mb-10 md:mb-12 font-light">
                  Strategic advantages for your
                  <br />
                  organization's brand and mission
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Maximum Visibility */}
                  <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                    <div className="mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                        <Image
                          src="/support/visibility.png"
                          alt="Maximum Visibility"
                          width={20}
                          height={20}
                          className="object-contain w-4 sm:w-5"
                        />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-[15px] md:text-[16px] font-semibold text-[#030303] mb-1 sm:mb-1.5 leading-tight">
                      Maximum
                      <br />
                      Visibility
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-[#030303] font-light leading-snug">
                      Brand presence, speaking roles, co-branded campaigns, and
                      national recognition.
                    </p>
                  </div>

                  {/* Credibility */}
                  <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                    <div className="mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                        <Image
                          src="/support/credibility.png"
                          alt="Credibility"
                          width={20}
                          height={20}
                          className="object-contain w-4 sm:w-5"
                        />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-[15px] md:text-[16px] font-semibold text-[#030303] mb-1 sm:mb-1.5 leading-tight">
                      Credibility
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-[#030303] font-light leading-snug">
                      Association with leading scientific institutions and
                      independent validation agencies.
                    </p>
                  </div>

                  {/* Lasting Legacy */}
                  <div className="bg-[#E7F2EE] p-4 sm:p-5 md:p-6">
                    <div className="mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                        <Image
                          src="/support/legacy.png"
                          alt="Lasting Legacy"
                          width={20}
                          height={20}
                          className="object-contain w-4 sm:w-5"
                        />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-[15px] md:text-[16px] font-semibold text-[#030303] mb-1 sm:mb-1.5 leading-tight">
                      Lasting
                      <br />
                      Legacy
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-[#030303] font-light leading-snug">
                      Link your brand to real environmental transformation and
                      community impact.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right - Go Beyond Sponsorship */}
              <div className="bg-[#F2EEEE] p-6 sm:p-10 md:p-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1D9770] mb-3 sm:mb-4">
                  Go Beyond
                  <br />
                  Sponsorship
                </h2>
                <p className="text-base sm:text-lg md:text-[18px] text-[#030303] mb-8 sm:mb-10 md:mb-12 font-light">
                  Transform from sponsor to active participant
                  <br />
                  in India's environmental future
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Enter the Competition */}
                  <div className="bg-white p-6">
                    <div className="mb-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <Image
                          src="/support/competition.png"
                          alt="Enter the Competition"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#030303] mb-1.5 leading-tight">
                      Enter the
                      <br />
                      Competition
                    </h3>
                    <p className="text-[12px] text-[#030303] font-light leading-snug">
                      Sponsors commit to submitting at least one innovative
                      solution.
                    </p>
                  </div>

                  {/* Procurement Commitment */}
                  <div className="bg-white p-6">
                    <div className="mb-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <Image
                          src="/support/commitment.png"
                          alt="Procurement Commitment"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#030303] mb-1.5 leading-tight">
                      Procurement
                      <br />
                      Commitment
                    </h3>
                    <p className="text-[12px] text-[#030303] font-light leading-snug">
                      Explore adoption of winning solutions.
                    </p>
                  </div>

                  {/* Ecosystem Support */}
                  <div className="bg-white p-6">
                    <div className="mb-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        <Image
                          src="/support/ecosystem.png"
                          alt="Ecosystem Support"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#030303] mb-1.5 leading-tight">
                      Ecosystem
                      <br />
                      Support
                    </h3>
                    <p className="text-[12px] text-[#030303] font-light leading-snug">
                      Mentorship, partnerships, or investment to help winners
                      scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Partners Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12 sm:space-y-16">
              {/* Impact Partners */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] mb-3 sm:mb-4 leading-tight lg:leading-[50px] font-[var(--font-dm-sans)]">
                  Impact Partners
                </h2>

                <div className="mt-8 sm:mt-12 flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
                  <Link
                    href="https://mountmerugroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src={meru}
                      alt="Mount Meru Group"
                      width={108}
                      height={54}
                      className="object-contain"
                    />
                  </Link>
                  <Link
                    href="https://www.mobiusf.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src={mobius}
                      alt="Mobius Foundation"
                      width={148}
                      height={74}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>

              {/* Supporting Partners */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] mb-3 sm:mb-4 leading-tight lg:leading-[50px] font-[var(--font-dm-sans)]">
                  Supporting Partners
                </h2>

                <div className="mt-8 sm:mt-12 flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
                  <Link
                    href="https://de.energy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/de_logo.png"
                      alt="Distributed Energy"
                      width={108}
                      height={54}
                      className="object-contain"
                    />
                  </Link>
                  <Link
                    href="https://saahaszerowaste.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/support/partners/sahaas-zero-waste.jpg"
                      alt="Sahaas Zero Waste"
                      width={170}
                      height={80}
                      className="object-contain"
                    />
                  </Link>
                  <Link
                    href="https://www.greenvironmentindia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src="/support/partners/greenvironment.jpg"
                      alt="Greenvironment"
                      width={170}
                      height={80}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Alignment with ESG & National Missions Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left - Illustration */}
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] order-2 lg:order-1">
                <Image
                  src="/support/alginment.png"
                  alt="Alignment with ESG & National Missions"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Right - Content */}
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-semibold text-[#222E00] leading-tight lg:leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
                  Alignment with ESG &<br />
                  National Missions
                </h2>

                <p className="text-base sm:text-lg md:text-[18px] text-[#030303] font-normal leading-relaxed">
                  A powerful way for companies to demonstrate verified
                  sustainability outcomes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Supports Column */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-3 sm:mb-4">
                      Supports
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>SDG 6</span>
                      </li>
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>SDG 11</span>
                      </li>
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>SDG 12</span>
                      </li>
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>SDG 13</span>
                      </li>
                    </ul>
                  </div>

                  {/* Aligned to Column */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-3 sm:mb-4">
                      Aligned to
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>NCAP</span>
                      </li>
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>NMCG</span>
                      </li>
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>Mission LiFE</span>
                      </li>
                      <li className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal flex items-start">
                        <span className="mr-2">•</span>
                        <span>Swachh Bharat Mission</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4">
                  <h3 className="text-base sm:text-lg md:text-[20px] font-bold text-[#1A5F52] mb-2 sm:mb-3">
                    Influence, Inspiration & Public
                    <br />
                    Engagement
                  </h3>
                  <p className="text-sm sm:text-base md:text-[16px] text-[#030303] font-normal leading-relaxed">
                    National icons, business leaders, and cultural ambassadors
                    will champion the prize — inspiring millions nationwide to
                    participate and take action.
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
