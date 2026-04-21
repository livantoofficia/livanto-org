import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCollection, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Flame } from "lucide-react";

// End time: midnight tomorrow (rolling 24-hour window).
function getEndTime() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

const pad = (n: number) => String(n).padStart(2, "0");

export const FlashSale = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [endTime] = useState(getEndTime);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Synced from Shopify Collection: "up to 50% off / Flash Sale"
    fetchProductsByCollection("up-to-50-off-flash-sale", { first: 8 })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, endTime - now);
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-10 lg:py-20 bg-foreground text-background">
      <div className="container-luxe">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-5 mb-6 lg:mb-12">
          <div>
            <p className="text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-accent mb-1.5 lg:mb-2 flex items-center gap-2">
              <Flame className="h-3.5 w-3.5" /> Flash Sale
            </p>
            <h2 className="font-display text-2xl lg:text-4xl">Today only — up to 50% off</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-wider text-background/60">Ends in</span>
            <div className="flex items-center gap-1.5">
              {[
                { v: h, l: "Hr" },
                { v: m, l: "Min" },
                { v: s, l: "Sec" },
              ].map((t, i) => (
                <div key={i} className="bg-background text-foreground px-2.5 py-1.5 min-w-12 text-center">
                  <div className="font-display text-xl leading-none tabular-nums">{pad(t.v)}</div>
                  <div className="text-[8px] uppercase tracking-widest text-muted-foreground mt-0.5">{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-background/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Mobile carousel */}
            <div className="lg:hidden -mx-4 sm:-mx-6">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 pb-2 [&_.product-card-hover]:bg-background [&_.product-card-hover]:text-foreground">
                {products.slice(0, 6).map((p) => (
                  <div key={p.node.id} className="snap-start shrink-0 w-[44%] sm:w-[32%]">
                    <ProductCard product={p} />
                  </div>
                ))}
                <div className="shrink-0 w-1" aria-hidden />
              </div>
            </div>
            {/* Desktop grid */}
            <div className="hidden lg:grid grid-cols-3 lg:grid-cols-4 gap-6 [&_.product-card-hover]:bg-background [&_.product-card-hover]:text-foreground">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-6 lg:mt-8">
              <Link
                to="/shop?cat=flash-sale"
                className="inline-block border border-accent text-accent px-7 lg:px-8 h-11 lg:h-12 leading-[2.75rem] lg:leading-[3rem] text-[11px] lg:text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition"
              >
                Shop the Flash Sale →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
