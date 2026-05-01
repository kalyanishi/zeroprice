'use client';

import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";

interface SpecialCategory {
  name: string;
  description: string[];
}

interface FAQ {
  question: string;
  answer: string;
  timelineItems?: string[];
  note?: string;
  specialCategories?: SpecialCategory[];
}

const faqCategories: Array<{ category: string; faqs: FAQ[] }> = [
  {
    category: "Eligibility & Participation",
    faqs: [
      {
        question: "Who can apply for the Zero Prize?",
        answer: "The Prize is open to: Innovators, startups, entrepreneurs, Research labs, universities, technical institutions, Government bodies, ULBs, and civic agencies, NGOs, community-based organisations, Youth groups and school/college teams, Industry innovators and CSR-backed pilots. Essentially, any India-based team capable of delivering measurable environmental impact may apply."
      },
      {
        question: "Is there an age limit?",
        answer: "No age limit for the main prize. School teams (Under-18) and college teams may also apply for Special Commendation Awards."
      },
      {
        question: "Can individuals apply?",
        answer: "Yes. Individuals may apply as long as they demonstrate technical feasibility, implementation capability, and verifiable impact."
      },
      {
        question: "Can international organisations apply?",
        answer: "Yes, if the pilot is executed in India and impact is measurable within Indian cities/zones."
      }
    ]
  },
  {
    category: "Solution & Readiness Criteria",
    faqs: [
      {
        question: "What kind of solutions are eligible?",
        answer: "Solutions must directly address Air Quality, Water Pollution, or Land Pollution, including: Technologies, Systems/Processes, Community-driven innovations, Nature-based solutions, Waste management or recycling models, Digital/AI-enabled monitoring and reduction systems, Behaviour-change and decentralised solutions with measurable outcomes. Verifiability and impact at scale are important considerations that'll be taken into account."
      },
      {
        question: "Does my solution need to be fully developed?",
        answer: "Not necessarily. Pilot-ready innovations and early-stage solutions that can demonstrate measurable and verifiable pollution reduction during the pilot period and can scale up are eligible."
      },
      {
        question: "Can I apply with a prototype?",
        answer: "Yes, if it can be demonstrated at scale within the chosen pilot zone and meet verification requirements. We are seeking solutions and entries that are beyond theory."
      },
      {
        question: "Do I need to have a partner Urban Local Body (ULB)/city before applying?",
        answer: "No. SPG will support shortlisted teams to identify and formalise pilot zones through partner Urban Local Bodies (ULBs), pollution boards, and verification agencies."
      }
    ]
  },
  {
    category: "Categories & Prize Structure",
    faqs: [
      {
        question: "What are the categories?",
        answer: "Air Quality, Water Pollution, Land Pollution (Plastic & Solid Waste), and Special Categories:",
        specialCategories: [
          {
            name: "Youth Innovations",
            description: [
              "For innovators below 18 years of age",
              "Focus on early-stage ideas with creativity and potential impact (Schools and Colleges)"
            ]
          },
          {
            name: "Civic Innovations",
            description: [
              "For Government led organisations and departments",
              "Recognizes on-ground solutions delivering measurable environmental impact"
            ]
          },
          {
            name: "Popular Vote",
            description: [
              "Voting on Zero Prize Website, to open post September 2026",
              "For highly popular, promising ideas that are yet to scale but show strong potential"
            ]
          }
        ]
      },
      {
        question: "What are the prize amounts?",
        answer: "Each category has a ₹1 crore prize fund. In addition, three commendation awards of ₹10 lakh each will be announced for Youth Innovation (Young innovators below 18 years), Civic Innovation (Government-led environmental solutions) and a Popular Vote category. Total prize purse: ₹5 crores."
      },
      {
        question: "Is the prize money disbursed upfront?",
        answer: "No. Disbursement follows a pay-for-results model. Teams receive funds after verified impact. Winners will be announced in March 2027. It is possible that we do not award a prize if target impact is not achieved."
      }
    ]
  },
  {
    category: "Impact Measurement & Verification",
    faqs: [
      {
        question: "What does 'results-based' mean?",
        answer: "You must demonstrate actual, measurable, verified improvement in pollution levels—not just a proposal."
      },
      {
        question: "How will the impact be verified?",
        answer: "By independent, accredited scientific institutions, like: Central Pollution Control Board (CPCB) & State Pollution Control Boards, National Environmental Engineering Research Institute (NEERI), IITs, Indian Institute of Science (IISC), National Mission for Clean Ganga (NMCG) empanelled labs, Council for Energy Environment and Water (CEEW) (data & modelling support). The final list of confirmed verifiers will be provided by mid 2026."
      },
      {
        question: "What pollution indicators are measured?",
        answer: "Air: Population-weighted PM₂.₅ exposure reduction within defined pilot zones, measured through fixed-location monitoring and baseline–endline comparison. Water: Reduction in wastewater pollution load (BOD, COD, TSS and/or nutrients) at defined source points or discharge clusters. Land: Weight-based reduction, diversion, or recovery of waste, including plastics and other pollutants prevented from entering landfills or natural ecosystems."
      },
      {
        question: "Will control sites be used?",
        answer: "Yes. Each pilot zone will have a comparable control site to distinguish actual impact from meteorological or seasonal variations. You are welcome to check with us OR propose your own control sites."
      },
      {
        question: "Who sets the baselines?",
        answer: "Baselines are established using: Historical Central Pollution Control Boards (CPCB) data, 3–4 week pre-intervention monitoring, Real-time sensors (CPCB-grade, equivalent or higher)"
      },
      {
        question: "Do I need my own monitoring equipment?",
        answer: "Not necessarily. Verification will use CPCB-grade or accredited third-party systems installed by the Prize teams."
      }
    ]
  },
  {
    category: "Pilots & Execution",
    faqs: [
      {
        question: "Where will the pilots be conducted?",
        answer: "Shortlisted teams may propose their own sites, subject to approval."
      },
      {
        question: "Do I need permission from government authorities?",
        answer: "Not at the application stage. SPG and Zero Prize partners will assist shortlisted teams with: Urban Local Body coordination, Memorandum of Understanding (MoU), Ground permissions, Regulatory approvals (as needed)"
      }
    ]
  },
  {
    category: "Application & Timeline",
    faqs: [
      {
        question: "What is the application timeline?",
        answer: "timeline-list", // Special marker for timeline rendering
        timelineItems: [
          "February 2026 - Prize Launched",
          "March 2026 - Applications Portal Opens - 15 March 2026",
          "August 2026 - Application Submission Closes - 31 August 2026",
          "September & October 2026 - Baseline Establishment & Pilot Approvals for Shortlisted Applications",
          "November & December 2026 - Pilot Implementation, Monitoring & Data Submission",
          "January & February 2027 - Evaluation & Finalist Selection",
          "March 2027 - Finalist's Pitch Day & Awards Ceremony"
        ],
        note: "(Timelines indicative; final dates will be published on the website.)"
      },
      {
        question: "Is there an application fee?",
        answer: "No. Application is free."
      },
      {
        question: "Can teams submit multiple entries?",
        answer: "Yes, but each solution must be a separate application."
      },
      {
        question: "Will my application be made public?",
        answer: "Only shortlisted and finalist teams will be publicly announced. Proprietary data will remain confidential."
      }
    ]
  },
  {
    category: "Intellectual Property (IP)",
    faqs: [
      {
        question: "Who owns the IP?",
        answer: "You retain 100% ownership of your IP. The Zero Prize does not take equity, IP rights, or royalties."
      },
      {
        question: "Do we need to disclose sensitive technical details?",
        answer: "You may submit summary descriptions initially. Detailed technical documents will be shared only with the evaluation committee under strict confidentiality."
      }
    ]
  },
  {
    category: "Evaluation & Selection",
    faqs: [
      {
        question: "What are the main evaluation criteria?",
        answer: "Measurable environmental impact, Scientific credibility & verification readiness, Economic viability, Scalability & replicability across India, Social/community acceptance, Implementation feasibility, Innovation & uniqueness, Policy alignment (National Clean Air Program, National Mission for Clean Ganga, Plastic Waste Management Rules, SDGs). Final evaluation criteria will be provided by the first half of 2026 in consultation with the Zero Prize Brains Trust."
      },
      {
        question: "Who will judge the entries?",
        answer: "Independent panel comprising: Scientists & environmental researchers, IITs, IISc, NEERI experts, Business & industry leaders, Policy and governance experts, Venture capital representatives. The final panel will be announced by early 2026."
      },
      {
        question: "How many teams will be shortlisted?",
        answer: "Typically 5 to 10 per category, depending on application volume, readiness and ability to scale."
      }
    ]
  },
  {
    category: "Support, Partnerships & Visibility",
    faqs: [
      {
        question: "What support do winners receive beyond prize money?",
        answer: "National visibility, Access to government adoption pathways, Corporate partnerships & CSR funding, Investor exposure, Acceleration support via SPG and partner institutions, Technical guidance from expert panels, Possible policy pilots in cities and states. Besides the prize we want winners to be able to scale their solution. Our team will provide that support after the prizes are announced. For those who don't win, we will still provide pre and post prize support to help you where we can."
      },
      {
        question: "Will SPG help with scaling after the Prize?",
        answer: "Yes, SPG will facilitate: Government linkages, Market pathways, Commercialisation support, Further pilot expansion, Policy incorporation"
      }
    ]
  },
  {
    category: "Team Composition & Operations",
    faqs: [
      {
        question: "Do teams need to be registered entities?",
        answer: "No."
      },
      {
        question: "Can a team be formed after application?",
        answer: "Yes, but the core solution/innovation and lead applicant must remain the same. We invite prototype ready entries. That also means submitting an application with a team that can give it the best chance to scale."
      },
      {
        question: "Can we collaborate with local governments or companies?",
        answer: "Yes, collaboration is encouraged and will strengthen your application."
      }
    ]
  },
  {
    category: "Costs & Funding",
    faqs: [
      {
        question: "Do applicants need to bear pilot costs?",
        answer: "Applicants must plan for basic operational capacity, but SPG will support: Permissions, Verification infrastructure, Technical oversight, Media visibility, Impact measurement. Shortlisted teams may receive small milestone grants if needed."
      }
    ]
  },
  {
    category: "Miscellaneous",
    faqs: [
      {
        question: "Can a rejected application be resubmitted?",
        answer: "Yes, in future cycles, with shortcomings adequately addressed (Zero Prize is planned as a multi-edition challenge). We will try to provide feedback as much as possible for most of the serious entries."
      },
      {
        question: "Is the Zero Prize affiliated with the government?",
        answer: "The Zero Prize is led by SPG with partnerships across: Government agencies, Research institutions, Pollution control boards, Philanthropy and industry partners"
      },
      {
        question: "Where can I ask further questions?",
        answer: "Email: zeroprize@policyandgovernance.in, Website: https://www.zeroprize.org/contact"
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: number }>({});

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: prev[key] === faqIndex ? -1 : faqIndex
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 bg-[#F2EEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-[#222E00] mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#030303] max-w-3xl mx-auto">
              Everything you need to know about India's first results-based environmental innovation challenge
            </p>
          </div>
        </section>

        {/* FAQ Categories Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                {/* Category Title */}
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-semibold text-[#1A5F52] mb-6">
                  {category.category}
                </h2>

                {/* FAQs in this category */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const key = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openItems[key] === faqIndex;
                    
                    return (
                      <div key={faqIndex} className="border-b border-gray-300 pb-4">
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full flex items-start justify-between cursor-pointer py-3 text-left group"
                        >
                          <span className="text-[18px] font-semibold text-[#030303] leading-[26px] pr-8 group-hover:text-[#1A5F52] transition-colors">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-6 h-6 text-[#1A5F52] transition-transform flex-shrink-0 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="mt-4 text-[16px] text-[#666666] leading-[24px] pr-8">
                            {faq.answer === "timeline-list" && faq.timelineItems ? (
                              <>
                                <ul className="space-y-2 mb-4">
                                  {faq.timelineItems.map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="text-[#1A5F52] mr-2 flex-shrink-0">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                {faq.note && <p className="text-sm italic">{faq.note}</p>}
                              </>
                            ) : faq.specialCategories ? (
                              <>
                                <p className="mb-4">{faq.answer}</p>
                                <div className="space-y-4">
                                  {faq.specialCategories.map((cat, idx) => (
                                    <div key={idx}>
                                      <p className="font-semibold text-[#1A5F52] mb-1">{cat.name}</p>
                                      <ul className="space-y-1">
                                        {cat.description.map((desc, dIdx) => (
                                          <li key={dIdx} className="flex items-start">
                                            <span className="text-[#1A5F52] mr-2 flex-shrink-0">•</span>
                                            <span>{desc}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </>
                            ) : (
                              faq.answer
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 bg-[#F2EEEE]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-semibold text-[#222E00] mb-4">
              Still have questions?
            </h2>
            <p className="text-[18px] text-[#666666] mb-8">
              Can't find the answer you're looking for? Please reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:zeroprize@policyandgovernance.in"
                className="inline-block bg-[#1D9770] text-white px-8 py-3 text-[16px] font-bold hover:bg-[#178760] transition-colors"
              >
                Email Us
              </a>
              <a
                href="/contact"
                className="inline-block bg-white text-[#1D9770] border-2 border-[#1D9770] px-8 py-3 text-[16px] font-bold hover:bg-[#F2EEEE] transition-colors"
              >
                Contact Page
              </a>
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
