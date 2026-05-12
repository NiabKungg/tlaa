import ImageSlider from "@/components/home/ImageSlider";
import TextSlider from "@/components/home/TextSlider";
import ContentCards from "@/components/home/ContentCards";
import VideoSlider from "@/components/home/VideoSlider";
import StatsAndLogos from "@/components/home/StatsAndLogos";
import CardCarousel from "@/components/home/CardCarousel";
import FeatureCards from "@/components/home/FeatureCards";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero Image Slider (CMS: อัตราส่วน 20:7 / 7929×2779) */}
      <ImageSlider />

      {/* 2. Text Slider */}
      <TextSlider />

      {/* 3. Content Cards / Grid */}
      <ContentCards />

      {/* 4. Video Player Slider (YouTube) */}
      <VideoSlider />

      {/* 5. Stats / Info + 6. Logo Grid */}
      <StatsAndLogos />

      {/* 7. Card Carousel (เอกสาร) */}
      <CardCarousel />

      {/* 8. Feature Cards (4 ทางลัด) */}
      <FeatureCards />

      {/* 9. Footer (CMS) */}
      <Footer />
    </main>
  );
}
