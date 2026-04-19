import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  title: string;
  eyebrow?: string;
  query?: string;
  sortKey?: "BEST_SELLING" | "CREATED_AT";
  reverse?: boolean;
  ctaTo?: string;
  first?: number;
}

export const ProductRail = ({
  title,
  eyebrow,
  query,
  sortKey,
  reverse,
  ctaTo = "/shop",
  first = 8,
}: Props) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ first, query, sortKey, reverse })
      .then(setProducts)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [first, query, sortKey, reverse]);

  return (
    <section className="py-14 lg:py-20">
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-8 lg:mb-12 gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2">
                ✦ {eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl lg:text-4xl">{title}</h2>
          </div>
          <Link
            to={ctaTo}
            className="text-xs uppercase tracking-wider hover:text-accent border-b border-foreground hover:border-accent pb-0.5 transition"
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
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
