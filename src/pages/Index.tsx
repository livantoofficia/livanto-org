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
import { SEO } from "@/components/SEO";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "LIVANTO",
      url: "https://livanto.in",
      logo: "https://livanto.in/og-livanto.jpg",
      sameAs: [
        "https://www.facebook.com/shoplivanto",
        "https://www.instagram.com/shoplivanto",
        "https://pin.it/ifDiRH2EL",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "livantoofficial@gmail.com",
        contactType: "customer support",
        areaServed: "IN",
      },
    },
    {
      "@type": "WebSite",
      url: "https://livanto.in",
      name: "LIVANTO",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://livanto.in/shop?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const Index = () => (
  <>
    <SEO
      title="LIVANTO — Premium Lifestyle & Smart Home Essentials in India"
      description="Shop premium kitchen, home, wellness & lifestyle essentials at LIVANTO. Free shipping on orders ₹499+, COD available, easy 7-day returns across India."
      canonical="/"
      jsonLd={homeJsonLd}
    />
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
