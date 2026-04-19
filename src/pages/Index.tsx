import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Categories } from "@/components/home/Categories";
import { ProductRail } from "@/components/home/ProductRail";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ReferEarn } from "@/components/home/ReferEarn";
import { Newsletter } from "@/components/home/Newsletter";

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
    <ReferEarn />
    <ProductRail
      eyebrow="Just In"
      title="New Arrivals"
      sortKey="CREATED_AT"
      reverse
      ctaTo="/shop"
    />
    <WhyChoose />
    <Newsletter />
  </>
);

export default Index;
