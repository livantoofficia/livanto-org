import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchProducts,
  fetchProductsByCollection,
  type ShopifyProduct,
} from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

const SORTS: Record<
  string,
  { label: string; sortKey: any; collectionSortKey: any; reverse?: boolean }
> = {
  trending: { label: "Trending", sortKey: "BEST_SELLING", collectionSortKey: "BEST_SELLING" },
  latest: { label: "Latest", sortKey: "CREATED_AT", collectionSortKey: "CREATED", reverse: true },
  "price-asc": { label: "Price: Low → High", sortKey: "PRICE", collectionSortKey: "PRICE" },
  "price-desc": { label: "Price: High → Low", sortKey: "PRICE", collectionSortKey: "PRICE", reverse: true },
  title: { label: "Alphabetical", sortKey: "TITLE", collectionSortKey: "TITLE" },
};

/**
 * URL `?cat=` slug → Shopify Collection handle + display title.
 * Adding/editing products in these collections in Shopify Admin
 * automatically updates these pages — no code change needed.
 */
const COLLECTIONS: Record<string, { handle: string; title: string }> = {
  "shop-all": { handle: "shop-all", title: "Shop All" },
  "new-arrivals": { handle: "new-arrivals", title: "New Arrivals" },
  "best-sellers": { handle: "best-sellers", title: "Best Sellers" },
  "under-499": { handle: "under-499", title: "Under ₹499" },
  "trending-now": { handle: "trending-now", title: "Trending Now" },
  "kitchen-dining": { handle: "kitchen-dining", title: "Kitchen & Dining" },
  "home-essentials": { handle: "home-essentials", title: "Home Essentials" },
  "personal-care": { handle: "personal-care", title: "Personal Care" },
  "fitness-wellness": { handle: "fitness-wellness", title: "Fitness & Wellness" },
  "car-bike": { handle: "car-bike", title: "Car & Bike" },
  "garden-balcony": { handle: "garden-balcony", title: "Garden & Balcony" },
  electronics: { handle: "electronics", title: "Electronics" },
  "trending-deals": { handle: "trending-deals", title: "Trending Deals" },
  "watch-shop": { handle: "watch-shop", title: "Watch & Shop" },
  "flash-sale": { handle: "up-to-50-off-flash-sale", title: "Flash Sale — Up to 50% Off" },
  "bundle-save": { handle: "bundle-save", title: "Bundle & Save" },
  gifts: { handle: "gifts", title: "Gifts" },
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get("cat") ?? "";
  const q = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "trending";

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const collection = COLLECTIONS[cat];

  useEffect(() => {
    setLoading(true);
    const cfg = SORTS[sort] ?? SORTS.trending;
    const fetcher = collection
      ? fetchProductsByCollection(collection.handle, {
          first: 48,
          sortKey: cfg.collectionSortKey,
          reverse: cfg.reverse,
        })
      : fetchProducts({
          first: 48,
          query: q || undefined,
          sortKey: cfg.sortKey,
          reverse: cfg.reverse,
        });
    fetcher
      .then(setProducts)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [cat, q, sort, collection]);

  const filtered = useMemo(() => {
    if (!maxPrice) return products;
    return products.filter(
      (p) => parseFloat(p.node.priceRange.minVariantPrice.amount) <= maxPrice
    );
  }, [products, maxPrice]);

  const updateParam = (k: string, v: string) => {
    const next = new URLSearchParams(searchParams);
    v ? next.set(k, v) : next.delete(k);
    setSearchParams(next);
  };

  const title = q
    ? `Search: "${q}"`
    : collection
    ? collection.title
    : "All Products";

  return (
    <>
      <SEO
        title={`${title} — Shop ${cat ? title : "Premium Essentials"}`}
        description={`Shop ${title.toLowerCase()} at LIVANTO — premium quality, free shipping ₹499+, COD available, easy 7-day returns across India.`}
        canonical={`/shop${cat ? `?cat=${cat}` : ""}`}
      />
      {/* Page header */}
      <section className="bg-secondary py-12 lg:py-16">
        <div className="container-luxe">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            ✦ Curated Collection
          </p>
          <h1 className="font-display text-4xl lg:text-5xl">{title}</h1>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl">
            Premium pieces, handpicked for modern Indian living. Free shipping
            ₹499+, COD available.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[57px] sm:top-[65px] z-20 bg-background/95 backdrop-blur border-b border-border">
        <div className="container-luxe flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{filtered.length} products</span>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={maxPrice?.toString() ?? "any"}
              onValueChange={(v) => setMaxPrice(v === "any" ? null : Number(v))}
            >
              <SelectTrigger className="h-9 w-[130px] text-xs">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any price</SelectItem>
                <SelectItem value="500">Under ₹500</SelectItem>
                <SelectItem value="1000">Under ₹1,000</SelectItem>
                <SelectItem value="2500">Under ₹2,500</SelectItem>
                <SelectItem value="5000">Under ₹5,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => updateParam("sort", v)}>
              <SelectTrigger className="h-9 w-[160px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SORTS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <section className="container-luxe py-10 lg:py-14">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/5] bg-secondary animate-pulse" />
                <div className="h-3 bg-secondary animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-dashed border-border py-20 px-6 text-center bg-secondary/40">
            <p className="font-display text-3xl mb-3">No products found</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {q || cat
                ? "Try a different search or browse all products."
                : "Your store doesn't have any products yet. Tell the chat what to add — for example: \"Create a smart kitchen scale at ₹1,499.\""}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Shop;
