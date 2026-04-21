import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, ShoppingBag, Volume2, VolumeX } from "lucide-react";
import { fetchProductsByCollection, type ShopifyProduct } from "@/lib/shopify";

const formatINR = (amount: string) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount));

interface ReelProduct {
  product: ShopifyProduct;
  videoUrl: string;
  posterUrl?: string;
}

/** Pick the best MP4 source from a Shopify Video media node. */
const pickVideoSource = (
  sources?: Array<{ url: string; mimeType: string; format: string }>
) => {
  if (!sources || sources.length === 0) return undefined;
  return (
    sources.find((s) => s.mimeType === "video/mp4" && s.format === "mp4") ??
    sources.find((s) => s.mimeType === "video/mp4") ??
    sources[0]
  );
};

const extractReels = (products: ShopifyProduct[]): ReelProduct[] => {
  const reels: ReelProduct[] = [];
  for (const product of products) {
    const mediaEdges = product.node.media?.edges ?? [];
    const videoNode = mediaEdges.find(
      (e) => e.node.mediaContentType === "VIDEO" && e.node.sources?.length
    );
    if (!videoNode) continue;
    const src = pickVideoSource(videoNode.node.sources);
    if (!src) continue;
    reels.push({
      product,
      videoUrl: src.url,
      posterUrl:
        videoNode.node.previewImage?.url ??
        product.node.images.edges[0]?.node.url,
    });
  }
  return reels;
};

export const WatchAndShop = () => {
  const [reels, setReels] = useState<ReelProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProductsByCollection("watch-shop", { first: 12 })
      .then((res) => setReels(extractReels(res)))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // Track active slide via scroll snap
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reels.length === 0) return;
    const onScroll = () => {
      const cardWidth = el.clientWidth * 0.78;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(Math.max(idx, 0), reels.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [reels.length]);

  return (
    <section className="py-14 lg:py-20 bg-secondary/30">
      <div className="container-luxe">
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2 inline-flex items-center gap-2">
            <Play className="h-3 w-3 fill-current" /> Watch & Shop
          </p>
          <h2 className="font-display text-3xl lg:text-4xl">See it in motion</h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Tap a reel to shop the product instantly.
          </p>
          <div className="gold-divider mx-auto mt-4" />
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden px-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-[78%] sm:w-[55%] lg:w-[32%] aspect-[9/16] rounded-3xl bg-secondary animate-pulse"
              />
            ))}
          </div>
        ) : reels.length === 0 ? (
          <div className="border border-dashed border-border py-14 px-6 text-center bg-background rounded-2xl max-w-xl mx-auto">
            <p className="font-display text-xl mb-2">No video products yet</p>
            <p className="text-sm text-muted-foreground">
              Add a video to any product in your Shopify <span className="font-medium">watch-shop</span> collection — it'll appear here automatically.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-3 lg:mb-4 px-4 lg:px-0">
              <button
                onClick={() => setMuted((m) => !m)}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground/70 hover:text-accent transition"
                aria-label={muted ? "Unmute videos" : "Mute videos"}
              >
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-4 lg:px-0 scrollbar-hide -mx-4 lg:mx-0"
              style={{ scrollbarWidth: "none" }}
            >
              {reels.map((reel, i) => (
                <ReelCard
                  key={reel.product.node.id}
                  reel={reel}
                  isActive={i === active}
                  muted={muted}
                />
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {reels.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to reel ${i + 1}`}
                  onClick={() => {
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
  reel: ReelProduct;
  isActive: boolean;
  muted: boolean;
}

const ReelCard = ({ reel, isActive, muted }: ReelCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const p = reel.product.node;
  const price = p.priceRange.minVariantPrice.amount;

  // Autoplay only the active reel — saves bandwidth & battery on mobile.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {
        /* ignore autoplay rejection */
      });
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isActive]);

  return (
    <article
      className={`group shrink-0 w-[78%] sm:w-[55%] lg:w-[32%] snap-center transition-all duration-500 ${
        isActive ? "scale-100" : "scale-[0.96] opacity-90"
      }`}
    >
      <Link
        to={`/product/${p.handle}`}
        className={`block relative aspect-[9/16] rounded-3xl overflow-hidden bg-foreground transition-all duration-500 ${
          isActive
            ? "shadow-[0_20px_60px_-20px_hsl(43_55%_42%/0.45)] ring-1 ring-accent/40"
            : "shadow-[0_10px_30px_-15px_hsl(0_0%_0%/0.25)]"
        }`}
        aria-label={`Shop ${p.title}`}
      >
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.posterUrl}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent pointer-events-none" />

        {/* Play indicator (only on inactive cards) */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-14 w-14 rounded-full bg-background/90 backdrop-blur flex items-center justify-center">
              <Play className="h-5 w-5 fill-foreground text-foreground ml-0.5" />
            </div>
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
          <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium group-hover:bg-accent/90 transition-colors">
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
            Shop Now
          </span>
        </div>
      </Link>
    </article>
  );
};
