'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import RegisterModal from './RegisterModal';
import { useApplyMode } from '../hooks/useApplyMode';

export default function Header() {
  const pathname = usePathname();
  const isBlogRoute = pathname.startsWith("/blogs");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const isApplyMode = useApplyMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll and horizontal dragging when menu is open
  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    if (isMenuOpen) {
      const scrollY = window.scrollY;
      body.dataset.scrollLock = `${scrollY}`;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      root.style.overflow = 'hidden';
    } else {
      const stored = body.dataset.scrollLock;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      root.style.overflow = '';
      if (stored) {
        window.scrollTo(0, parseInt(stored, 10));
      }
      delete body.dataset.scrollLock;
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      root.style.overflow = '';
      if (body.dataset.scrollLock) {
        window.scrollTo(0, parseInt(body.dataset.scrollLock, 10));
        delete body.dataset.scrollLock;
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20'
          : 'bg-white/60 backdrop-blur-md border-b border-white/10'
          }`}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 flex-shrink-0">
            <Image
              src="/zeroprize_logo.png"
              alt="Zero Prize"
              width={100}
              height={100}
              className="object-contain w-[80px] sm:w-[100px] h-auto"
            />
          </Link>

          {/* Desktop Navigation and Button Container */}
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation */}
            <nav className="flex items-center gap-8 lg:gap-12 h-full">
              <Link
                href="/"
                className={`relative text-sm font-normal hover:text-[#1D9770] transition-colors h-full flex items-center ${pathname === "/" ? "text-[#1D9770]" : "text-black"
                  }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1D9770]"></span>
                )}
              </Link>
              <Link
                href="/about"
                className={`relative text-sm font-normal hover:text-[#1D9770] transition-colors h-full flex items-center ${pathname === "/about" ? "text-[#1D9770]" : "text-black"
                  }`}
              >
                About us
                {pathname === "/about" && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1D9770]"></span>
                )}
              </Link>
              <Link
                href="/prize"
                className={`relative text-sm font-normal hover:text-[#1D9770] transition-colors h-full flex items-center ${pathname === "/prize" ? "text-[#1D9770]" : "text-black"
                  }`}
              >
                The Prize
                {pathname === "/prize" && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1D9770]"></span>
                )}
              </Link>
              <Link
                href="/partner"
                className={`relative text-sm font-normal hover:text-[#1D9770] transition-colors h-full flex items-center ${pathname === "/partner" ? "text-[#1D9770]" : "text-black"
                  }`}
              >
                Our Partners
                {pathname === "/partner" && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1D9770]"></span>
                )}
              </Link>
              <Link
                href="/contact"
                className={`relative text-sm font-normal hover:text-[#1D9770] transition-colors h-full flex items-center ${pathname === "/contact" ? "text-[#1D9770]" : "text-black"
                  }`}
              >
                Contact us
                {pathname === "/contact" && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1D9770]"></span>
                )}
              </Link>
              <Link
                href="/blogs"
                className={`relative text-sm font-normal hover:text-[#1D9770] transition-colors h-full flex items-center ${isBlogRoute ? "text-[#1D9770]" : "text-black"
                  }`}
              >
                Updates
                {isBlogRoute && (
                  <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1D9770]"></span>
                )}
              </Link>
            </nav>

            {/* CTA Button */}
            {isApplyMode ? (
              <Link
                href="/apply"
                className="bg-[#1D9770] text-white px-6 py-2 text-sm font-normal hover:bg-[#178760] transition-colors"
              >
                Apply Now
              </Link>
            ) : (
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="bg-[#1D9770] text-white px-6 py-2 text-sm font-normal hover:bg-[#178760] transition-colors"
              >
                Register now
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2 rounded-md hover:bg-gray-100/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
              />
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''
                  }`}
              />
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Sheet Menu - Outside Header */}
      <div
        className={`md:hidden fixed inset-0 z-[100] flex flex-col justify-end transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
          }`}
        aria-hidden={!isMenuOpen}
        aria-modal="true"
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="relative z-10 w-full">
          <div
            className={`mx-auto max-w-md sm:max-w-lg bg-white rounded-t-3xl shadow-2xl pt-6 pb-10 max-h-[85vh] overflow-hidden transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'
              }`}
          >
            <div className="flex items-center justify-between px-6 mb-4">
              <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <nav className="flex flex-col px-6 space-y-4">
                <Link
                  href="/"
                  className={`text-lg font-normal transition-colors py-2 ${pathname === '/' ? 'text-[#1D9770] font-semibold' : 'text-black'
                    }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`text-lg font-normal transition-colors py-2 ${pathname === '/about' ? 'text-[#1D9770] font-semibold' : 'text-black'
                    }`}
                >
                  About us
                </Link>
                <Link
                  href="/prize"
                  className={`text-lg font-normal transition-colors py-2 ${pathname === '/prize' ? 'text-[#1D9770] font-semibold' : 'text-black'
                    }`}
                >
                  The Prize
                </Link>
                <Link
                  href="/partner"
                  className={`text-lg font-normal transition-colors py-2 ${pathname === '/partner' ? 'text-[#1D9770] font-semibold' : 'text-black'
                    }`}
                >
                  Our Partners
                </Link>
                <Link
                  href="/contact"
                  className={`text-lg font-normal transition-colors py-2 ${pathname === '/contact' ? 'text-[#1D9770] font-semibold' : 'text-black'
                    }`}
                >
                  Contact us
                </Link>
                <Link
                  href="/blogs"
                  className={`text-lg font-normal transition-colors py-2 ${isBlogRoute ? 'text-[#1D9770] font-semibold' : 'text-black'
                    }`}
                >
                  Updates
                </Link>
                {isApplyMode ? (
                  <Link
                    href="/apply"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-[#1D9770] text-white px-6 py-3 text-base font-normal hover:bg-[#178760] transition-colors text-center w-full block"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsRegisterModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-[#1D9770] text-white px-6 py-3 text-base font-normal hover:bg-[#178760] transition-colors text-center w-full"
                  >
                    Register now
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}
