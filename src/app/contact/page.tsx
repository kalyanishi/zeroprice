"use client";

import { useState, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
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
      interestedIn: formData.get("interestedIn") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
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
          <div className="absolute left-0 top-0 w-[600px] sm:w-[900px] md:w-[1200px] h-[170px] sm:h-[260px] md:h-[320px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/contact/contact-hero-left.png"
              alt=""
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="absolute right-0 top-0 w-[350px] sm:w-[550px] md:w-[800px] h-[200px] sm:h-[280px] md:h-[380px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/contact/contact-hero-right.png"
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
            <div className="ml-12 sm:ml-28 md:ml-32 lg:ml-24 max-w-3xl pt-20 sm:pt-28 md:pt-[180px]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-[#222E00] mb-2 leading-tight">
                CONTACT US
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-normal text-[#030303] mb-6 sm:mb-8">
                Let's Start the Conversation
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#030303] font-normal leading-relaxed sm:leading-[28px] tracking-[0.02em]">
                  Join the Zero Prize movement and help create a cleaner,
                  healthier India that future generations can breathe in, drink
                  from and live within.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column - Get in Touch */}
              <div className="bg-[#F2EEEE] p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-[40px] font-normal text-[#030303] mb-6 sm:mb-8">
                    Get in Touch
                  </h2>

                  {/* SPG Logo and Info */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <Link
                        href="https://policyandgovernance.in"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/footer_logo.png"
                          alt="School of Policy and Governance"
                          width={50}
                          height={50}
                          className="object-contain flex-shrink-0 sm:w-[60px] sm:h-[60px] hover:opacity-80 transition-opacity"
                        />
                      </Link>
                      <div className="text-xs sm:text-sm md:text-[14px] text-[#030303] leading-tight">
                        <div>School of Policy and Governance (SPG)</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm sm:text-base md:text-[16px] text-[#030303]">
                      <div className="leading-relaxed">
                        Foundation of Policy and Governance
                        <br />
                        Bangalore, Karnataka, India - 560052
                      </div>
                      <div className="break-all">
                        <span className="font-semibold">Email:</span>{" "}
                        zeroprize@policyandgovernance.in
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heart Icon and Message */}
                <div className="mt-auto pt-6">
                  <div className="flex justify-start mb-3 sm:mb-4">
                    <Image
                      src="/contact/heart.png"
                      alt=""
                      width={50}
                      height={50}
                      className="object-contain sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
                    />
                  </div>
                  <p className="text-lg sm:text-xl md:text-[24px] text-[#030303] font-normal leading-snug">
                    Let's create the future our
                    <br />
                    nation deserves, together.
                  </p>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white p-6 sm:p-8 md:p-10">
                <h2 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-[#030303] mb-2">
                  Send us a Message
                </h2>
                <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] mb-4 sm:mb-6">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>

                {submitStatus.type && (
                  <div
                    className={`mb-4 p-4 rounded-md ${submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form
                  className="space-y-3 sm:space-y-4"
                  onSubmit={handleSubmit}
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm md:text-[14px] text-[#030303] mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        👤
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Your name"
                        className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-xs sm:text-sm md:text-[14px] text-[#030303] placeholder:text-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[14px] text-[#030303] mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ✉️
                      </span>
                      <input
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-[14px] text-[#030303] placeholder:text-gray-400"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-[14px] text-[#030303] mb-2">
                      Organization (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🏢
                      </span>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Your organization"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-[14px] text-[#030303] placeholder:text-gray-400"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* I'm interested in */}
                  <div>
                    <label className="block text-[14px] text-[#030303] mb-2">
                      I'm interested in <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🎯
                      </span>
                      <select
                        name="interestedIn"
                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-[14px] appearance-none bg-white text-[#030303]"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="" className="text-gray-500">
                          Select an option
                        </option>
                        <option value="apply" className="text-[#030303]">
                          Apply for the Zero Prize
                        </option>
                        <option value="sponsorships" className="text-[#030303]">
                          Sponsorships &amp; Collaborations
                        </option>
                        <option value="partnerships" className="text-[#030303]">
                          Partnerships with Zero Prize
                        </option>
                        <option value="media" className="text-[#030303]">
                          Media Enquiry
                        </option>
                        <option value="volunteering" className="text-[#030303]">
                          Volunteering
                        </option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[14px] text-[#030303] mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your inquiry..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-[14px] resize-none text-[#030303] placeholder:text-gray-400"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#1D9770] text-white py-4 text-[16px] font-semibold hover:bg-[#178563] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
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
