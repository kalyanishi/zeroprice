import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogPosts } from "./data";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
        <section className="w-full bg-[#1D9770] mb-10 sm:mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
            <p className="text-sm sm:text-base font-medium text-white/90 mb-2">
              Insights & Updates
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              Zero Prize Updates
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
              Stories, announcements, and verified impact journeys from the Zero Prize movement.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 sm:gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-60 sm:h-64 overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute left-4 bottom-4">
                    <span className="inline-flex items-center bg-white text-[#1D9770] text-xs font-semibold px-3 py-1">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#222E00] leading-snug mb-3 group-hover:text-[#1D9770] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#030303] leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-[#1D9770]">
                    Read update
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}