import { useEffect, useState } from "react";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { fetchProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  excludeHandle?: string;
  title?: string;
  className?: string;
}

export const RecentlyViewed = ({
  excludeHandle,
  title = "Recently Viewed",
  className = "",
}: Props) => {
  const handles = useRecentlyViewedStore((s) => s.handles);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  const filtered = handles.filter((h) => h !== excludeHandle);

  useEffect(() => {
    if (filtered.length === 0) {
      setProducts([]);
      return;
    }
    let cancelled = false;
    Promise.all(filtered.slice(0, 4).map((h) => fetchProductByHandle(h))).then((nodes) => {
      if (cancelled) return;
      setProducts(
        nodes.filter((n): n is ShopifyProduct["node"] => !!n).map((node) => ({ node }))
      );
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.join(",")]);

  if (products.length === 0) return null;

  return (
    <section className={`py-12 lg:py-16 border-t border-border ${className}`}>
      <div className="container-luxe">
        <div className="flex items-end justify-between mb-6 lg:mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2">✦ For You</p>
            <h2 className="font-display text-2xl lg:text-3xl">{title}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
