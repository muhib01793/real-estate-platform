import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedSection from '../components/home/FeaturedSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaBanner from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <CategoryGrid />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  );
}
