import { useEffect, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

interface Props {
  productType?: string;
  excludeId?: string;
}

export const RelatedProducts = ({ productType, excludeId }: Props) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = productType ? `product_type:"${productType}"` : "";
    fetchProducts({ first: 8, query, sortKey: "BEST_SELLING" })
      .then((items) => setProducts(items.filter((p) => p.node.id !== excludeId).slice(0, 4)))
      .finally(() => setLoading(false));
  }, [productType, excludeId]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 border-t border-border">
      <div className="container-luxe">
        <div className="text-center mb-8 lg:mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2">✦ You may also love</p>
          <h2 className="font-display text-2xl lg:text-3xl">Related Products</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-secondary animate-pulse" />
              ))
            : products.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};
