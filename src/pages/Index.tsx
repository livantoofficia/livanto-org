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
    {/* Best Sellers — synced from Shopify Collection: best-sellers */}
    <ProductRail
      eyebrow="Most Loved"
      title="Best Sellers"
      collection="best-sellers"
      ctaTo="/shop?cat=best-sellers"
      first={8}
      layout="carousel"
    />
    {/* Trending Now — synced from Shopify Collection: trending-now */}
    <ProductRail
      eyebrow="Viral Right Now"
      title="Trending Now"
      collection="trending-now"
      ctaTo="/shop?cat=trending-now"
      first={6}
      layout="grid"
    />
    {/* Flash Sale — synced from Shopify Collection: flash-sale */}
    <FlashSale />
    {/* Bundle Offers — synced from Shopify Collection: bundle-save */}
    <BundleDeals />
    {/* Watch & Shop — video-based product reels from Shopify Collection: watch-shop */}
    <WatchAndShop />
    {/* New Arrivals — synced from Shopify Collection: new-arrivals */}
    <ProductRail
      eyebrow="Just In"
      title="New Arrivals"
      collection="new-arrivals"
      ctaTo="/shop?cat=new-arrivals"
      first={6}
      layout="grid"
    />
    {/* Under ₹499 — synced from Shopify Collection: under-499 (price-filtered safety net) */}
    <ProductRail
      eyebrow="Budget Picks"
      title="Under ₹499"
      collection="under-499"
      ctaTo="/shop?cat=under-499"
      first={8}
      layout="carousel"
      maxPrice={499}
    />
    <WhyChoose />
    <ReviewsSection />
    <ReferEarn />
    <Newsletter />
  </>
);

export default Index;
