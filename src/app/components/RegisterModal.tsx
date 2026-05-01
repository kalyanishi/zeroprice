'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const data = {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      category: formData.category,
      interest: formData.message,
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
      setFormData({
        name: '',
        email: '',
        organization: '',
        category: '',
        message: ''
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus({ type: null, message: "" });
      }, 2000);
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#030303]">
              Register Your Interest
            </h2>
            <p className="text-sm text-[#666666] mt-1">
              Join India's environmental revolution
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          {/* Full Name */}
          <div>
            <label className="block text-sm text-[#030303] mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-sm"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-[#030303] mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-sm"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Organization */}
          <div>
            <label className="block text-sm text-[#030303] mb-2">
              Organization (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏢</span>
              <input
                type="text"
                placeholder="Your organization"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-sm"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-[#030303] mb-2">
              I'm interested in <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🎯</span>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-sm appearance-none bg-white text-[#030303]"
                required
                disabled={isSubmitting}
              >
                <option value="" className="text-gray-500">Select a category</option>
                <option value="applying" className="text-[#030303]">Apply for the Zero Prize</option>
                <option value="sponsoring" className="text-[#030303]">Sponsorships & Collaborations</option>
                <option value="partnership" className="text-[#030303]">Partnerships with Zero Prize</option>
                <option value="media" className="text-[#030303]">Media Enquiry</option>
                <option value="volunteering" className="text-[#030303]">Volunteering</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-[#030303] mb-2">
              Tell us about your solution (Optional)
            </label>
            <textarea
              placeholder="Briefly describe your innovation or approach..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D9770] text-sm resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1D9770] text-white py-4 text-base font-semibold hover:bg-[#178563] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
