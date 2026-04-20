import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
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
  { label: string; sortKey: any; reverse?: boolean }
> = {
  trending: { label: "Trending", sortKey: "BEST_SELLING" },
  latest: { label: "Latest", sortKey: "CREATED_AT", reverse: true },
  "price-asc": { label: "Price: Low → High", sortKey: "PRICE" },
  "price-desc": { label: "Price: High → Low", sortKey: "PRICE", reverse: true },
  title: { label: "Alphabetical", sortKey: "TITLE" },
};

// Map URL "cat" slugs to Shopify product_type values for accurate filtering.
const CAT_TO_TYPE: Record<string, string> = {
  kitchen: "Kitchen & Dining",
  home: "Home Essentials",
  personal: "Personal Care",
  fitness: "Fitness & Wellness",
  car: "Car & Bike",
  garden: "Garden & Balcony",
  electronics: "Electronics Accessories",
};

const TAG_LABELS: Record<string, string> = {
  "best-seller": "Best Sellers",
  trending: "Trending Deals",
  "flash-sale": "Flash Sale",
  "under-499": "Under ₹499",
  "new-arrival": "New Arrivals",
  bundle: "Bundle & Save",
  gift: "Gifts",
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get("cat") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const q = searchParams.get("q") ?? "";
  const sort = searchParams.get("sort") ?? "trending";

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const queryStr = useMemo(() => {
    const parts: string[] = [];
    if (q) parts.push(q);
    if (tag) parts.push(`tag:${tag}`);
    if (cat) {
      const type = CAT_TO_TYPE[cat];
      parts.push(type ? `product_type:"${type}"` : cat);
    }
    return parts.join(" ") || undefined;
  }, [q, cat, tag]);

  useEffect(() => {
    setLoading(true);
    const cfg = SORTS[sort] ?? SORTS.trending;
    fetchProducts({
      first: 48,
      query: queryStr,
      sortKey: cfg.sortKey,
      reverse: cfg.reverse,
    })
      .then(setProducts)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [queryStr, sort]);

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
    : tag
    ? TAG_LABELS[tag] ?? tag
    : cat
    ? CAT_TO_TYPE[cat] ?? cat[0].toUpperCase() + cat.slice(1)
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
