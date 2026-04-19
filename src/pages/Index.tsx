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

const Index = () => (
  <>
    <Hero />
    <TrustStrip />
    <Categories />
    <ProductRail
      eyebrow="Most Loved"
      title="Best Sellers"
      sortKey="BEST_SELLING"
      ctaTo="/shop"
    />
    <ProductRail
      eyebrow="Viral Right Now"
      title="Trending Now"
      sortKey="BEST_SELLING"
      reverse
      ctaTo="/shop"
    />
    <ProductRail
      eyebrow="Smart Buys"
      title="Premium Picks Under ₹499"
      query="variants.price:<=499"
      ctaTo="/shop"
    />
    <FlashSale />
    <ProductRail
      eyebrow="Just In"
      title="New Arrivals"
      sortKey="CREATED_AT"
      reverse
      ctaTo="/shop"
    />
    <BundleDeals />
    <WhyChoose />
    <ReviewsSection />
    <ReferEarn />
    <Newsletter />
  </>
);

export default Index;
