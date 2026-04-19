import { Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

interface ProductCardProps {
  product: ShopifyProduct;
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
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">
            -{discountPct}%
          </span>
        )}
        {!variant?.availableForSale && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider">
            Sold out
          </span>
        )}
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
        <button
          onClick={handleAdd}
          disabled={!variant?.availableForSale || isLoading}
          className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground text-xs uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>Quick Add</>
          )}
        </button>
      </div>
      <div className="pt-3 pb-1 px-1">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {p.title}
        </h3>
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
      </div>
    </Link>
  );
};
