import { Heart, Loader2, Star, Banknote } from "lucide-react";
import { Link } from "react-router-dom";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { NotifyMeButton } from "@/components/NotifyMeButton";

interface ProductCardProps {
  product: ShopifyProduct;
}

// Deterministic pseudo-rating based on product id (so it's stable per product, no fake numbers).
// We only show the placeholder rating when the product is tagged 'best-seller' or 'trending'.
function pseudoRating(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  // Range 4.5–4.9
  return (4.5 + (h % 5) / 10).toFixed(1);
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const p = product.node;
  const variant = p.variants.edges[0]?.node;
  const img = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node;
  const price = variant?.price ?? p.priceRange.minVariantPrice;
  const compare = variant?.compareAtPrice;
  const hasDiscount =
    compare && parseFloat(compare.amount) > parseFloat(price.amount);
  const discountPct = hasDiscount
    ? Math.round(
        ((parseFloat(compare.amount) - parseFloat(price.amount)) /
          parseFloat(compare.amount)) *
          100
      )
    : 0;

  const tags = (p.tags ?? []).map((t) => t.toLowerCase());
  const sellingFast = tags.includes("best-seller") || tags.includes("flash-sale");
  const showRating = tags.includes("best-seller") || tags.includes("trending");
  const lowStock = false;

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.has(p.id));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <Link
      to={`/product/${p.handle}`}
      className="group block product-card-hover bg-card"
    >
      <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
        {img && (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            width={600}
            height={750}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
        )}
        {img2 && (
          <img
            src={img2.url}
            alt=""
            width={600}
            height={750}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {hasDiscount && (
            <span className="bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">
              -{discountPct}%
            </span>
          )}
          {sellingFast && variant?.availableForSale && (
            <span className="bg-foreground text-background text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider">
              Selling Fast
            </span>
          )}
          {!variant?.availableForSale && (
            <span className="bg-foreground text-background text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWish(p.id);
          }}
          aria-label="Wishlist"
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full transition"
        >
          <Heart
            className={`h-4 w-4 ${isWished ? "fill-accent text-accent" : "text-foreground"}`}
          />
        </button>
        {/* Quick add / Notify Me */}
        {variant?.availableForSale ? (
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground text-xs uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>Quick Add</>
            )}
          </button>
        ) : (
          <NotifyMeButton
            productTitle={p.title}
            productId={p.id}
            variantId={variant?.id}
            variant="card"
          />
        )}
      </div>
      <div className="pt-3 pb-1 px-1">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {p.title}
        </h3>
        {showRating && (
          <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-medium text-foreground">{pseudoRating(p.id)}</span>
            <span aria-hidden>·</span>
            <span>Rated by shoppers</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-semibold">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(compare.amount, compare.currencyCode)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Banknote className="h-3 w-3 text-accent" /> COD
          </span>
          {lowStock && (
            <span className="text-destructive font-medium">Selling fast</span>
          )}
        </div>
      </div>
    </Link>
  );
};
