import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
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
    // Try flash-sale tagged first, then fall back to any best-selling products
    fetchProducts({ first: 8, query: "tag:flash-sale" })
      .then(async (res) => {
        if (res.length > 0) return res;
        return fetchProducts({ first: 8, sortKey: "BEST_SELLING" });
      })
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
    <section className="py-14 lg:py-20 bg-foreground text-background">
      <div className="container-luxe">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 lg:mb-12">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2 flex items-center gap-2">
              <Flame className="h-3.5 w-3.5" /> Flash Sale
            </p>
            <h2 className="font-display text-3xl lg:text-4xl">Today only — premium picks at up to 50% off</h2>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 [&_.product-card-hover]:bg-background [&_.product-card-hover]:text-foreground">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/shop?tag=flash-sale"
                className="inline-block border border-accent text-accent px-8 h-12 leading-[3rem] text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition"
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
