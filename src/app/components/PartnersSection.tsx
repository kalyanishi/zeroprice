import Link from "next/link";

export default function PartnersSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left side - Content */}
          <div className="max-w-md">
            <h2 className="text-5xl font-semibold text-[#030303] mb-8">
              Partners
            </h2>
            <p className="text-lg text-[#030303] font-normal leading-relaxed mb-4">
              A growing coalition of institutions, foundations, and organisations supporting India's first results-based environmental challenge.
            </p>
            <p className="text-sm text-gray-700 font-light leading-relaxed mb-8">
              These partners bring scientific credibility, national reach, and strong ecosystems that help scale proven solutions across India.
            </p>
            <Link
              href="/partner"
              className="inline-block bg-[#1D9770] text-white px-8 py-3 font-normal hover:bg-[#178760] transition-colors"
            >
              Partner with Us
            </Link>
          </div>

          {/* Right side - Brand placeholder */}
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-gray-400 italic text-lg">
              [Your brand here]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
