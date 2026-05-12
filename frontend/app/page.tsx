import Header from "@/components/layout/Header";
import ImageSlider from "@/components/home/ImageSlider";
import TextSlider from "@/components/home/TextSlider";
import ContentCards from "@/components/home/ContentCards";
import VideoSlider from "@/components/home/VideoSlider";
import StatsAndLogos from "@/components/home/StatsAndLogos";
import CardCarousel from "@/components/home/CardCarousel";
import FeatureCards from "@/components/home/FeatureCards";
import Footer from "@/components/layout/Footer";

const API = process.env.INTERNAL_API_URL || "http://localhost:8000";

async function fetchSection<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API}/api/public/home${path}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  // Fetch all sections in parallel from the CMS API
  const [heroSlides, textSlides, contentCards, videos, stats, logos, carouselCards, featureCards, footerItems] =
    await Promise.all([
      fetchSection("/hero-slides"),
      fetchSection("/text-slides"),
      fetchSection("/content-cards"),
      fetchSection("/videos"),
      fetchSection("/stats"),
      fetchSection("/logos"),
      fetchSection("/carousel-cards"),
      fetchSection("/feature-cards"),
      fetchSection("/footer"),
    ]);

  return (
    <main>
      {/* Header / Navbar */}
      <Header />

      {/* 1. Hero Image Slider (CMS: อัตราส่วน 20:7 / 7929×2779) */}
      <ImageSlider slides={heroSlides as any} />

      {/* 2. Text Slider */}
      <TextSlider slides={textSlides as any} />

      {/* 3. Content Cards / Grid */}
      <ContentCards cards={contentCards as any} />

      {/* 4. Video Player Slider (YouTube) */}
      <VideoSlider videos={videos as any} />

      {/* 5. Stats / Info + 6. Logo Grid */}
      <StatsAndLogos stats={stats as any} logos={logos as any} />

      {/* 7. Card Carousel (เอกสาร) */}
      <CardCarousel cards={carouselCards as any} />

      {/* 8. Feature Cards (4 ทางลัด) */}
      <FeatureCards features={featureCards as any} />

      {/* 9. Footer (CMS) */}
      <Footer content={footerItems as any} />
    </main>
  );
}
