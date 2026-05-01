'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import CTASection from "../components/CTASection";
import RegisterModal from "../components/RegisterModal";
import { useState } from "react";

export default function EvaluationFrameworkPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 bg-[#F2EEEE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-[#222E00] mb-4 sm:mb-6 leading-tight">
                ZERO PRIZE – OFFICIAL EVALUATION & GUIDANCE FRAMEWORK
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#030303] mb-6">
                How your solution will be reviewed, verified and selected
              </p>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                The Zero Prize is India's first results-based environmental innovation challenge, where awards are given only for verified pollution-reduction in Air Quality, Water Pollution, or Land Pollution. This guidance document will inform you exactly how your application will be evaluated, what we look for, and how the judging process works.
              </p>
            </div>
          </div>
        </section>

        {/* Notice Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 bg-[#FFF9E6] border-l-4 border-[#F7C064]">
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-[#030303]">
              <strong>This is a working document.</strong> The document may be updated with feedback from experts or questions we haven't considered. <button onClick={() => setIsRegisterModalOpen(true)} className="text-[#1D9770] underline font-semibold hover:opacity-80 transition-opacity">Register your interest now</button> so we can let you know if this framework is updated or provide you with any other updates.
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <article className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-6">
                1. What Types of Solutions Are Eligible?
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-4">
                Your solution must directly address Air, Water, or Land pollution through:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Technologies, devices, or engineered solutions",
                  "Systems or process improvements",
                  "Community-driven or behaviour-change interventions",
                  "Nature-based solutions",
                  "Waste management, recycling or circularity models",
                  "Digital / AI-enabled monitoring and reduction systems",
                  "Decentralised, low-cost, frugal innovations",
                  "Any solution capable of demonstrating measurable and independently verifiable pollution reduction within a defined monitoring period using a baseline–endline framework."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base sm:text-lg text-[#030303] font-semibold">
                If your solution reduces pollution in a scientifically measurable way, you can apply.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-4">
                2. The Zero Prize Evaluation Journey
              </h2>
              <p className="text-lg sm:text-xl text-[#666666] mb-8">
                A 5-step, transparent and science-led process
              </p>

              {/* Stage 1 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#F2EEEE] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  Stage 1: Eligibility & Technical Screening
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  Your application is checked for:
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Alignment with Air / Water / Land categories",
                    "Technical feasibility",
                    "Ability to deliver measurable impact within a defined pilot period",
                    "Readiness for third-party verification"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-[#030303] font-semibold">
                  Only eligible, ready-to-pilot solutions move ahead.
                </p>
              </div>

              {/* Stage 2 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#E7F2EE] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  Stage 2: Shortlisting by Expert Panel
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  A panel of technical experts, comprising environmental scientists, engineers, policy experts, and practitioners, reviews:
                </p>
                <ul className="space-y-2">
                  {[
                    "Uniqueness of Innovation",
                    "Scientific soundness",
                    "Feasibility in real-world India",
                    "Scalability and replicability potential"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-[#030303] font-semibold mt-4">
                  Shortlisted teams advance to pilot testing.
                </p>
              </div>

              {/* Stage 3 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#F2EEEE] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  Stage 3: Real-World Pilot Implementation
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  This is the heart of the Zero Prize. Shortlisted teams deploy their solutions in real urban or peri-urban conditions. Pilot sites are monitored by independent, accredited agencies, depending on your category:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0 font-semibold">Air:</span>
                    <span>Central Pollution Control Board (CPCB) grade continuous monitors or equivalent</span>
                  </li>
                  <li className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0 font-semibold">Water:</span>
                    <span>National Mission for Clean Ganga / CPCB-accredited laboratories or equivalent</span>
                  </li>
                  <li className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0 font-semibold">Land:</span>
                    <span>CPCB empanelled waste auditors and digital traceability tools or equivalent</span>
                  </li>
                </ul>
                <p className="text-base sm:text-lg text-[#030303] font-semibold mt-4">
                  All pilots follow approved monitoring protocols.
                </p>
              </div>

              {/* Stage 4 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#E7F2EE] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  Stage 4: Verified Environmental Impact
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  Only solutions with scientifically verified pollution reduction are considered for the final award. Verification includes:
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Baseline vs post-intervention comparison",
                    "Control site comparison (where applicable)",
                    "Meteorology-adjusted data for Air",
                    "Third-party laboratory analysis for Water",
                    "Weight-based, traceability-backed audits for Land"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-[#030303] font-semibold">
                  Every verified result is documented transparently.
                </p>
              </div>

              {/* Stage 5 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#F2EEEE] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  Stage 5: Final Jury Review & Awards
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  A high-level jury reviews verified pilots. Jury members will include:
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Environmental scientists",
                    "Monitoring and verification agencies",
                    "Policy experts and Urban Local Body/governance leaders",
                    "Venture capital/business leaders (for economic viability)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-[#030303] font-semibold">
                  Only solutions that show real, attributable, third-party-verified impact become winners.
                </p>
              </div>
            </section>

            {/* Section 3 - Scoring */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-6">
                3. How Your Solution Will Be Scored
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-8">
                Each solution is evaluated on seven criteria, with the following weightages:
              </p>

              {/* Criterion 1 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#F2EEEE] border-l-4 border-[#1D9770]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  (1) Scientifically Verified Environmental Impact (40%)
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  This is the most important criterion. Your solution must show real, measurable, scientifically validated improvement in pollution levels.
                </p>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-[#1A5F52] mb-2">For Air Solutions:</h4>
                  <ul className="space-y-2">
                    {[
                      "Reduction in PM₂.₅ using CPCB-grade monitors",
                      "Meteorology adjusted results (temperature, Relative Humidity (RH), wind, Boundary Layer Height (BLH)",
                      "Baseline + control site comparison",
                      "Clear documentation of the deployment area"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start text-base text-[#666666]">
                        <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-[#1A5F52] mb-2">For Water Solutions:</h4>
                  <ul className="space-y-2">
                    {[
                      "Reduction in Biochemical Oxygen Demand (BOD), Chemical Oxygen Demand (COD), coliform, and Dissolved Oxygen (DO)",
                      "Testing through accredited labs",
                      "Upstream downstream sampling",
                      "Compliance with National Green Tribunal (NGT) /state Pollution Control Board (PCB) norms"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start text-base text-[#666666]">
                        <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-base sm:text-lg text-[#666666] mb-2">
                  We will also assess, across the board:
                </p>
                <ul className="space-y-2">
                  {[
                    "Engineering / scientific robustness",
                    "Clarity of processes and documentation",
                    "Accuracy and calibration of monitoring instruments",
                    "Compliance with required protocols",
                    "Novelty and creativity",
                    "Breakthrough potential"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Criterion 2 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#E7F2EE] border-l-4 border-[#1D9770]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  (2) Implementation Feasibility (20%)
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  Your solution must:
                </p>
                <ul className="space-y-2">
                  {[
                    "Be deployable in shorter timeframes",
                    "Operate reliably in real-world Indian conditions",
                    "Have manageable maintenance requirements",
                    "Meet regulatory and statutory norms"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Criterion 3 */}
              <div className="mb-8 p-6 sm:p-8 bg-[#F2EEEE] border-l-4 border-[#1D9770]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#222E00] mb-4">
                  (3) Economic Viability, Scalability and Replicability (40%)
                </h3>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  We look at:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Cost per unit of pollution reduction",
                    "Total cost of ownership",
                    "Potential for adoption by Urban Local Bodies, states, or the private sector",
                    "Market-readiness and commercial potential"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg text-[#666666] mb-4">
                  We evaluate whether your idea can grow:
                </p>
                <ul className="space-y-2">
                  {[
                    "Across different cities, climates, and geographies",
                    "Without heavy dependence on hyper-local conditions",
                    "National policy alignment - National Clean Air Program, National Mission for Clean Ganga, Swachh Bharat Mission 2.0, Plastic Waste Management Rules 2022"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 4 - Submission Checklists */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-6">
                4. What You Must Submit (Category-Wise Checklists)
              </h2>

              {/* Air Solutions */}
              <div className="mb-8 p-6 sm:p-8 bg-[#E8F4F8] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A5F52] mb-4">
                  AIR SOLUTIONS – Required Submission Materials
                </h3>
                <ul className="space-y-2">
                  {[
                    "Description of technology/process",
                    "Baseline monitoring plan",
                    "Control site proposal Deployment map",
                    "Monitor type & calibration plan",
                    "Safety and regulatory clearances"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Water Solutions */}
              <div className="mb-8 p-6 sm:p-8 bg-[#E3F2FD] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A5F52] mb-4">
                  WATER SOLUTIONS – Required Submission Materials
                </h3>
                <ul className="space-y-2">
                  {[
                    "Description of intervention",
                    "Target pollutant + expected reduction",
                    "Lab testing plan (accredited labs only)",
                    "Upstream-downstream sampling strategy",
                    "Compliance with statutory norms"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Land Solutions */}
              <div className="mb-8 p-6 sm:p-8 bg-[#F1F8E9] rounded-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A5F52] mb-4">
                  LAND SOLUTIONS – Required Submission Materials
                </h3>
                <ul className="space-y-2">
                  {[
                    "Type of waste targeted",
                    "Baseline waste quantity assessment",
                    "Audit methodology (CPCB empanelled)",
                    "Traceability/digital tracking approach",
                    "Recycling/diversion documentation plan"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Requirements */}
              <div className="p-6 sm:p-8 bg-[#FFF9E6] border-l-4 border-[#F7C064]">
                <p className="text-base sm:text-lg text-[#030303] mb-4">
                  <strong>For all 3 categories</strong>, we will also require a mini-business plan, including but not limited to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Total Cost of Ownership",
                    "Go-to-market approach (including Target audience and Monetisation plan)",
                    "Revenues (if any)",
                    "Details of the pilot (if any)",
                    "Details of the team"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-base text-[#666666]">
                      <span className="text-[#F7C064] mr-3 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 5 - Transparency */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-6">
                5. Transparency & Data Integrity
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-4">
                All winning solutions must share:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Verified datasets",
                  "Monitoring protocols",
                  "Traceability and audit documentation"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                A public dashboard will display verified impact from finalist teams. We can support you with feedback on what would constitute verified data or audit documentation.
              </p>
            </section>

            {/* Section 6 - Special Awards */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-6">
                6. Special Commendation Awards
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-4">
                In addition to the main Air, Water, and Land prizes, the Zero Prize will also recognise:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Youth Innovation Award",
                  "Civic Innovation Award",
                  "Popular Vote Award"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                These awards celebrate innovation, youth engagement, and institutional leadership.
              </p>
            </section>

            {/* Revised Outcome Target Document */}
            <section>
              <a
                href="/docs/ZP_Outcome_Targets_revised_April_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] hover:underline"
              >
                Revised Outcome Target Document
              </a>
            </section>

            {/* Advice Section */}
            <section className="p-6 sm:p-8 bg-[#E7F2EE] rounded-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#222E00] mb-6">
                Advice for Applicants
              </h2>
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed mb-4">
                To strengthen your application:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Be specific about how your solution reduces pollution",
                  "Show clear, measurable outputs",
                  "Provide simple visuals or deployment maps",
                  "Explain the feasibility in real-world Indian conditions",
                  "If your solution is low-tech or community-based, highlight behavioural impact and measurable outcomes",
                  "Outline economic viability and scalability"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-base sm:text-lg text-[#666666]">
                    <span className="text-[#1D9770] mr-3 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xl sm:text-2xl text-[#1A5F52] font-bold text-center">
                The Zero Prize rewards impact, not complexity.
              </p>
            </section>

            {/* Glossary */}
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A5F52] mb-6">
                APPENDIX 1: GLOSSARY OF TERMS
              </h2>
              <div className="space-y-4">
                {[
                  {
                    term: "Baseline Data",
                    definition: "Pollution levels measured before the intervention. Baselines can be historic datasets or a 2–4 week pre-intervention monitoring period. All impact is compared against this baseline."
                  },
                  {
                    term: "Boundary Layer Height (BLH)",
                    definition: "The height of the lowest part of the atmosphere. It affects air pollution dispersion. Used to adjust PM₂.₅ data for weather influences."
                  },
                  {
                    term: "BOD: Biochemical Oxygen Demand",
                    definition: "A key indicator of water pollution. High BOD = poor water quality."
                  },
                  {
                    term: "CPCB",
                    definition: "Central Pollution Control Board"
                  },
                  {
                    term: "COD",
                    definition: "Chemical Oxygen Demand"
                  },
                  {
                    term: "Control Site",
                    definition: "A nearby location not receiving the intervention, used to compare whether improvements are due to your solution. Essential for Air and Land projects."
                  },
                  {
                    term: "Difference-in-Difference Method (DiD)",
                    definition: "A statistical method comparing changes in the intervention site against a control site. Used to prove that improvements are due to your solution."
                  },
                  {
                    term: "NMCG",
                    definition: "National Mission for Clean Ganga"
                  },
                  {
                    term: "NGT",
                    definition: "National Green Tribunal"
                  },
                  {
                    term: "Pilot Implementation",
                    definition: "Real-world deployment of the solution for 2–6 months, monitored independently."
                  },
                  {
                    term: "PM₂.₅",
                    definition: "Fine particulate matter (2.5 microns) that affects air quality and health. The primary metric for the Zero Prize Air category."
                  },
                  {
                    term: "ULB",
                    definition: "Urban Local Body"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-[#1D9770] pl-4 py-2">
                    <dt className="text-lg font-bold text-[#222E00] mb-1">{item.term}</dt>
                    <dd className="text-base text-[#666666]">{item.definition}</dd>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </article>

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
      
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </div>
  );
}
