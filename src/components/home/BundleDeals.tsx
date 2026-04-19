import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { Sparkles } from "lucide-react";

export const BundleDeals = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ first: 6, query: "tag:bundle" })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && products.length < 2) return null;

  const featured = products.slice(0, 3);
  const totalCompare = featured.reduce((sum, p) => {
    const v = p.node.variants.edges[0]?.node;
    const cmp = v?.compareAtPrice?.amount ?? v?.price.amount ?? "0";
    return sum + parseFloat(cmp);
  }, 0);
  const totalNow = featured.reduce((sum, p) => {
    const v = p.node.variants.edges[0]?.node;
    return sum + parseFloat(v?.price.amount ?? "0");
  }, 0);
  const bundleSave = Math.round(totalCompare - totalNow);

  return (
    <section className="py-14 lg:py-20 bg-secondary/40">
      <div className="container-luxe">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> Save More
          </p>
          <h2 className="font-display text-3xl lg:text-4xl">Bundle & Save</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Buy 2 or more from our hand-picked bundles and save up to 25% extra.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-square bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-background border border-border p-6 sm:p-10 max-w-5xl mx-auto shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="grid grid-cols-3 gap-3">
                {featured.map((p) => {
                  const img = p.node.images.edges[0]?.node;
                  return (
                    <Link
                      key={p.node.id}
                      to={`/product/${p.node.handle}`}
                      className="aspect-square bg-secondary overflow-hidden group"
                    >
                      {img && (
                        <img
                          src={img.url}
                          alt={img.altText ?? p.node.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="hidden lg:flex flex-col items-center text-2xl text-accent">
                +<span>+</span>=
              </div>

              <div className="text-center lg:text-left space-y-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent">The Festive Trio</p>
                <h3 className="font-display text-2xl lg:text-3xl leading-tight">
                  Bestseller bundle, gifted in style
                </h3>
                <div className="flex items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-2xl font-semibold">{formatPrice(totalNow, "INR")}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(totalCompare, "INR")}
                  </span>
                  <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 font-medium">
                    Save ₹{bundleSave}
                  </span>
                </div>
                <Link
                  to="/shop?tag=bundle"
                  className="inline-block bg-primary text-primary-foreground px-7 h-11 leading-[2.75rem] text-xs uppercase tracking-wider hover:bg-primary/90 transition"
                >
                  Shop Bundle →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
