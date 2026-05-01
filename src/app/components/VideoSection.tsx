export default function VideoSection() {
  return (
    <section className="min-h-[calc(100vh-450px)] flex items-center px-4 sm:px-6 py-12 sm:py-16 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

        {/* Left side - Quote */}
        <div className="space-y-6">
          <p className="text-[#030303] text-base sm:text-lg md:text-[22px] leading-6 sm:leading-7 md:leading-[28px] tracking-[0.02em] font-normal">
            Find out more about the Zero Prize from{' '}
            <span className="font-bold">Dia Mirza</span> at the launch event in New Delhi.
          </p>
          <p className="text-[#555] text-sm sm:text-base tracking-wide uppercase font-medium">
            Launch Event &mdash; New Delhi
          </p>
        </div>

        {/* Right side - Video */}
        <div className="relative w-full aspect-video overflow-hidden shadow-md">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/SmSKHNmXXss?si=rKfoQjuk_-7xbibw&rel=0&modestbranding=1&autoplay=1&mute=1"
            title="Find out more about the Zero Prize from Dia Mirza at the launch event in New Delhi"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

      </div>
    </section>
  );
}
