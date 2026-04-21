import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, fetchProductsByCollection, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  title: string;
  eyebrow?: string;
  query?: string;
  sortKey?: "BEST_SELLING" | "CREATED_AT";
  reverse?: boolean;
  ctaTo?: string;
  first?: number;
  /** Filter by Shopify tag (legacy fallback). */
  tag?: string;
  /**
   * Shopify Collection handle — preferred. When provided, products come
   * directly from that Collection in Shopify Admin (auto-syncs).
   */
  collection?: string;
  /**
   * Mobile layout: 'carousel' = horizontal swipe, 'grid' = 2-col grid.
   */
  layout?: "carousel" | "grid";
  /** Optional client-side price ceiling (INR). Filters out variants above this price. */
  maxPrice?: number;
}

export const ProductRail = ({
  title,
  eyebrow,
  query,
  sortKey,
  reverse,
  ctaTo = "/shop",
  first = 8,
  tag,
  collection,
  layout = "grid",
}: Props) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const finalQuery = [tag ? `tag:${tag}` : null, query].filter(Boolean).join(" ") || undefined;

  useEffect(() => {
    setLoading(true);
    const fetcher = collection
      ? fetchProductsByCollection(collection, {
          first,
          sortKey:
            sortKey === "CREATED_AT"
              ? "CREATED"
              : sortKey === "BEST_SELLING"
              ? "BEST_SELLING"
              : "COLLECTION_DEFAULT",
          reverse,
        })
      : fetchProducts({ first, query: finalQuery, sortKey, reverse });
    fetcher
      .then(setProducts)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [first, finalQuery, sortKey, reverse, collection]);

  return (
    <section className="py-10 lg:py-20">
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-5 lg:mb-12 gap-4">
          <div>
            {eyebrow && (
              <p className="text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-accent mb-1.5 lg:mb-2">
                ✦ {eyebrow}
              </p>
            )}
            <h2 className="font-display text-2xl lg:text-4xl">{title}</h2>
          </div>
          <Link
            to={ctaTo}
            className="text-[11px] lg:text-xs uppercase tracking-wider hover:text-accent border-b border-foreground hover:border-accent pb-0.5 transition whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] bg-secondary animate-pulse" />
                <div className="h-3 bg-secondary animate-pulse w-3/4" />
                <div className="h-3 bg-secondary animate-pulse w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState />
        ) : layout === "carousel" ? (
          <>
            {/* Mobile: horizontal swipe carousel */}
            <div className="lg:hidden -mx-4 sm:-mx-6">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 pb-2">
                {products.map((p) => (
                  <div
                    key={p.node.id}
                    className="snap-start shrink-0 w-[44%] sm:w-[32%]"
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
                <div className="shrink-0 w-1" aria-hidden />
              </div>
            </div>
            {/* Desktop: regular grid */}
            <div className="hidden lg:grid grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const EmptyState = () => (
  <div className="border border-dashed border-border py-16 px-6 text-center bg-secondary/40">
    <p className="font-display text-2xl mb-2">No products found</p>
    <p className="text-sm text-muted-foreground max-w-md mx-auto">
      Your store doesn't have any products yet. Tell the chat what to add — for
      example: "Create a smart kitchen scale at ₹1,499."
    </p>
  </div>
);
