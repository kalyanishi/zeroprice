'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer?: string;
  timelineItems?: string[];
}

const faqs: FAQItem[] = [
  {
    question: "Who can apply for the Zero Prize?",
    answer: "The Prize is open to innovators, startups, entrepreneurs, research labs, universities, technical institutions, government bodies, ULBs, civic agencies, NGOs, community-based organisations, youth groups, school/college teams, and industry innovators. Essentially, any India-based team capable of delivering measurable environmental impact may apply."
  },
  {
    question: "What does 'results-based' mean?",
    answer: "You must demonstrate actual, measurable, verified improvement in pollution levels—not just a proposal. Winners receive funds after verified impact is demonstrated through independent scientific validation."
  },
  {
    question: "How will the impact be verified?",
    answer: "By independent, accredited scientific institutions like Central Pollution Control Board (CPCB), State Pollution Control Boards, National Environmental Engineering Research Institute (NEERI), IITs, Indian Institute of Science (IISc), National Mission for Clean Ganga (NMCG) empanelled labs, and Council for Energy Environment and Water (CEEW). The final list of confirmed verifiers will be provided by mid 2026."
  },
  {
    question: "What are the prize amounts?",
    answer: "Each category has a ₹1 crore prize fund. In addition, three commendation awards of ₹10 lakh each will be announced for Youth Innovation (Young innovators below 18 years), Civic Innovation (Government-led environmental solutions) and a Popular Vote category. Total prize purse: ₹5 crores."
  },
  {
    question: "What is the application timeline?",
    timelineItems: [
      "February 2026 - Prize Launched",
      "March 2026 - Applications Portal Opens - 15 March 2026",
      "August 2026 - Application Submission Closes - 31 August 2026",
      "September & October 2026 - Baseline Establishment & Pilot Approvals for Shortlisted Applications",
      "November & December 2026 - Pilot Implementation, Monitoring & Data Submission",
      "January & February 2027 - Evaluation & Finalist Selection",
      "March 2027 - Finalist's Pitch Day & Awards Ceremony"
    ]
  },
  {
    question: "Who owns the intellectual property?",
    answer: "You retain 100% ownership of your IP. The Zero Prize does not take equity, IP rights, or royalties."
  },
  {
    question: "What support do winners receive beyond prize money?",
    answer: "Winners gain national visibility, access to government adoption pathways, corporate partnerships & CSR funding, investor exposure, acceleration support via SPG and partner institutions, technical guidance from expert panels, and possible policy pilots in cities and states. SPG will provide scaling support after prizes are announced."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - FAQ Header */}
          <div className="bg-[#F2EEEE] p-16 flex flex-col justify-start">
            <h2 className="text-[46px] font-semibold text-[#222E00] mb-6 leading-[50px] tracking-[0] font-[var(--font-dm-sans)]">
              Frequently<br />Asked<br />Questions
            </h2>
            <p className="text-[20px] text-[#666666] font-light leading-[24px] tracking-[0.02em] font-['Inter']">
              Get answers to the most frequently asked questions about the Zero Prize
            </p>
          </div>

          {/* Right - FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between cursor-pointer py-2 text-left"
                >
                  <span className="text-[18px] font-semibold text-[#1A5F52] leading-[24px]">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-[#1A5F52] transition-transform flex-shrink-0 ml-4 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="mt-3 text-[16px] text-[#666666] leading-[22px]">
                    {faq.timelineItems ? (
                      <ul className="space-y-1">
                        {faq.timelineItems.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#1A5F52] mr-2 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      faq.answer
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {/* View All FAQs Button */}
            <div className="pt-6">
              <Link
                href="/faq"
                className="inline-block bg-[#1D9770] text-white px-8 py-3 text-[16px] font-bold hover:bg-[#178760] transition-colors"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
