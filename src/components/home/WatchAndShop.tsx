import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles, Flame } from "lucide-react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";

const formatINR = (amount: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));

const AUTOPLAY_MS = 4000;

export const WatchAndShop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isUserInteracting = useRef(false);
  const interactionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchProducts({ first: 6, sortKey: "BEST_SELLING" })
      .then(setProducts)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // Track active slide via scroll position (snap-aware)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.clientWidth * 0.78; // ~1.2 cards visible
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [products.length]);

  // Auto-advance every 4s, pause on user interaction
  useEffect(() => {
    if (products.length === 0) return;
    const id = window.setInterval(() => {
      if (isUserInteracting.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const cardWidth = el.clientWidth * 0.78;
      const next = (active + 1) % products.length;
      el.scrollTo({ left: next * cardWidth, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, products.length]);

  const flagInteraction = () => {
    isUserInteracting.current = true;
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 6000);
  };

  return (
    <section className="py-14 lg:py-20 bg-secondary/30">
      <div className="container-luxe">
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2">
            ✦ Watch & Shop
          </p>
          <h2 className="font-display text-3xl lg:text-4xl">Watch & Shop</h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            See how modern homes use Livanto essentials.
          </p>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden px-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[78%] sm:w-[55%] lg:w-[32%] aspect-[3/4] rounded-3xl bg-secondary animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="border border-dashed border-border py-14 px-6 text-center bg-background rounded-2xl max-w-xl mx-auto">
            <p className="font-display text-xl mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">
              Add products to your Shopify store to see them appear here.
            </p>
          </div>
        ) : (
          <>
            <div
              ref={scrollerRef}
              onTouchStart={flagInteraction}
              onMouseDown={flagInteraction}
              onWheel={flagInteraction}
              className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-4 lg:px-0 scrollbar-hide -mx-4 lg:mx-0"
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((p, i) => (
                <ReelCard
                  key={p.node.id}
                  product={p}
                  isActive={i === active}
                  index={i}
                />
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    flagInteraction();
                    const el = scrollerRef.current;
                    if (!el) return;
                    el.scrollTo({
                      left: i * (el.clientWidth * 0.78),
                      behavior: "smooth",
                    });
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active
                      ? "w-6 bg-accent"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

interface ReelCardProps {
  product: ShopifyProduct;
  isActive: boolean;
  index: number;
}

const ReelCard = ({ product, isActive, index }: ReelCardProps) => {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice.amount;
  const tags = p.tags?.map((t) => t.toLowerCase()) ?? [];

  // Deterministic badge: alternate Trending / Best Seller, prefer real tags
  let badge: { label: string; Icon: typeof Flame } | null = null;
  if (tags.some((t) => t.includes("best"))) {
    badge = { label: "Best Seller", Icon: Flame };
  } else if (tags.some((t) => t.includes("trend") || t.includes("new"))) {
    badge = { label: "Trending", Icon: Sparkles };
  } else {
    badge = index % 2 === 0
      ? { label: "Trending", Icon: Sparkles }
      : { label: "Best Seller", Icon: Flame };
  }
  const BadgeIcon = badge.Icon;

  return (
    <article
      className={`group shrink-0 w-[78%] sm:w-[55%] lg:w-[32%] snap-center transition-all duration-500 ${
        isActive ? "scale-100" : "scale-[0.96] opacity-90"
      }`}
    >
      <div
        className={`relative aspect-[3/4] rounded-3xl overflow-hidden bg-foreground/5 transition-all duration-500 ${
          isActive
            ? "shadow-[0_20px_60px_-20px_hsl(43_55%_42%/0.45)] ring-1 ring-accent/40"
            : "shadow-[0_10px_30px_-15px_hsl(0_0%_0%/0.25)]"
        }`}
      >
        {img && (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              isActive ? "scale-110" : "scale-100"
            }`}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium">
            <BadgeIcon className="h-3 w-3 text-accent" strokeWidth={2} />
            {badge.label}
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-background">
          <h3 className="font-display text-lg sm:text-xl leading-tight line-clamp-2 mb-1">
            {p.title}
          </h3>
          <p className="text-sm font-medium text-background/90 mb-4">
            {formatINR(price)}
          </p>
          <Link
            to={`/product/${p.handle}`}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium hover:bg-accent/90 transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
            Shop Now
          </Link>
        </div>
      </div>
    </article>
  );
};
