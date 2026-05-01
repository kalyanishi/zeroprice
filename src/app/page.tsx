import Header from "./components/Header";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import NotificationBanner from "./components/NotificationBanner";
import ContentSection from "./components/ContentSection";
import FeaturesSection from "./components/FeaturesSection";
import WhyIndiaNeedsSection from "./components/WhyIndiaNeedsSection";
import WhyZeroPrizeSection from "./components/WhyZeroPrizeSection";
import OurVisionSection from "./components/OurVisionSection";
import PartnersSection from "./components/PartnersSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <ContentSection />
        <FeaturesSection />
        <WhyIndiaNeedsSection />
        <NotificationBanner />
        <WhyZeroPrizeSection />
        <OurVisionSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}
