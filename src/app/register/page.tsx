"use client";

import { useState, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import Image from "next/image";

export default function RegisterPage() {
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
      category: formData.get("category") as string,
      interest: formData.get("solution") as string,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration");
      }

      setSubmitStatus({
        type: "success",
        message: "Registration submitted successfully! Check your email for confirmation.",
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
        message: error instanceof Error ? error.message : "Failed to submit registration. Please try again.",
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
          <div className="absolute left-0 top-0 w-[600px] sm:w-[900px] md:w-[1200px] h-[200px] sm:h-[280px] md:h-[380px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/prize/prize-hero-left.png"
              alt=""
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="absolute right-0 top-0 w-[800px] sm:w-[1600px] md:w-[3200px] h-[200px] sm:h-[280px] md:h-[380px] z-0 opacity-50 sm:opacity-75 md:opacity-100">
            <Image
              src="/prize/prize-hero-right.png"
              alt=""
              fill
              className="object-contain object-right"
              priority
            />
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
            <div className="ml-0 sm:ml-8 md:ml-16 lg:ml-0 max-w-3xl pt-24 sm:pt-32 md:pt-[200px]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-[#222E00] mb-2 leading-tight">
                REGISTER NOW
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-normal text-[#030303] mb-6 sm:mb-8">
                Join India's Environmental Revolution
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#030303] font-normal leading-relaxed sm:leading-[28px] tracking-[0.02em]">
                  Register your interest to participate in the Zero Prize and be part of measurable, verified impact at a national scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 md:p-10 border border-gray-200 rounded-lg">
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-[#030303] mb-2">
                Register Your Interest
              </h2>
              <p className="text-xs sm:text-sm md:text-[14px] text-[#666666] mb-4 sm:mb-6">
                Fill out the form below to register for the Zero Prize
              </p>

              {submitStatus.type && (
                <div
                  className={`mb-4 p-4 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
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
                      name="category"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-[14px] appearance-none bg-white text-[#030303]"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="" className="text-gray-500">Select a category</option>
                      <option value="participating" className="text-[#030303]">Participating in the Prize</option>
                      <option value="partnership" className="text-[#030303]">Partnership with Zero Prize</option>
                      <option value="media" className="text-[#030303]">Media Enquiry</option>
                      <option value="volunteering" className="text-[#030303]">Volunteering</option>
                      <option value="other" className="text-[#030303]">Other</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Solution Description */}
                <div>
                  <label className="block text-[14px] text-[#030303] mb-2">
                    Tell us about your solution (Optional)
                  </label>
                  <textarea
                    name="solution"
                    placeholder="Briefly describe your innovation or approach..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-[14px] resize-none text-[#030303] placeholder:text-gray-400"
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#1D9770] text-white py-4 text-[16px] font-semibold hover:bg-[#178563] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </form>
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
