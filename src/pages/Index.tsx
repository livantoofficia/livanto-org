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
      tag="best-seller"
      sortKey="BEST_SELLING"
      ctaTo="/shop?tag=best-seller"
    />
    <ProductRail
      eyebrow="Viral Right Now"
      title="Trending Now"
      tag="trending"
      ctaTo="/shop?tag=trending"
    />
    <ProductRail
      eyebrow="Smart Buys"
      title="Premium Picks Under ₹499"
      tag="under-499"
      ctaTo="/shop?tag=under-499"
    />
    <FlashSale />
    <ProductRail
      eyebrow="Just In"
      title="New Arrivals"
      tag="new-arrival"
      sortKey="CREATED_AT"
      reverse
      ctaTo="/shop?tag=new-arrival"
    />
    <BundleDeals />
    <WhyChoose />
    <ReviewsSection />
    <ReferEarn />
    <Newsletter />
  </>
);

export default Index;
