import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Categories } from "@/components/home/Categories";
import { ProductRail } from "@/components/home/ProductRail";
import { FlashSale } from "@/components/home/FlashSale";
import { BundleDeals } from "@/components/home/BundleDeals";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ReferEarn } from "@/components/home/ReferEarn";
import { Newsletter } from "@/components/home/Newsletter";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { WatchAndShop } from "@/components/home/WatchAndShop";

const Index = () => (
  <>
    <Hero />
    <TrustStrip />
    <Categories />
    {/* Best Sellers — mobile horizontal swipe carousel */}
    <ProductRail
      eyebrow="Most Loved"
      title="Best Sellers"
      sortKey="BEST_SELLING"
      ctaTo="/shop"
      first={8}
      layout="carousel"
    />
    {/* Trending Now — 2-col grid, max 6 */}
    <ProductRail
      eyebrow="Viral Right Now"
      title="Trending Now"
      sortKey="BEST_SELLING"
      reverse
      ctaTo="/shop"
      first={6}
      layout="grid"
    />
    <WatchAndShop />
    {/* Flash Sale — mobile carousel */}
    <FlashSale />
    {/* New Arrivals — 2-col grid */}
    <ProductRail
      eyebrow="Just In"
      title="New Arrivals"
      sortKey="CREATED_AT"
      reverse
      ctaTo="/shop"
      first={6}
      layout="grid"
    />
    {/* Bundle Offers — featured full-width card */}
    <BundleDeals />
    <WhyChoose />
    <ReviewsSection />
    <ReferEarn />
    <Newsletter />
  </>
);

export default Index;
