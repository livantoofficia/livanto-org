import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchProductByHandle,
  formatPrice,
  type ShopifyProduct,
} from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { RelatedProducts } from "@/components/RelatedProducts";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import {
  Heart,
  Truck,
  RotateCcw,
  Banknote,
  ShieldCheck,
  Loader2,
  Minus,
  Plus,
  ChevronRight,
  Flame,
} from "lucide-react";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const setOpen = useCartStore((s) => s.setOpen);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const trackRecent = useRecentlyViewedStore((s) => s.add);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    setActiveImg(0);
    window.scrollTo({ top: 0 });
    fetchProductByHandle(handle)
      .then((p) => {
        setProduct(p);
        if (p) {
          const initial: Record<string, string> = {};
          p.options.forEach((o) => (initial[o.name] = o.values[0]));
          setSelectedOptions(initial);
          trackRecent(p.handle);
        }
      })
      .finally(() => setLoading(false));
  }, [handle, trackRecent]);

  if (loading) {
    return (
      <div className="container-luxe py-20 grid lg:grid-cols-2 gap-10">
        <div className="aspect-square bg-secondary animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-secondary animate-pulse w-3/4" />
          <div className="h-6 bg-secondary animate-pulse w-1/4" />
          <div className="h-32 bg-secondary animate-pulse" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-luxe py-32 text-center">
        <p className="font-display text-3xl mb-3">Product not found</p>
        <Link to="/shop" className="text-accent underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const variant =
    product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(
        (o) => selectedOptions[o.name] === o.value
      )
    )?.node ?? product.variants.edges[0]?.node;

  const compare = variant?.compareAtPrice;
  const hasDiscount =
    compare && parseFloat(compare.amount) > parseFloat(variant.price.amount);
  const discountPct = hasDiscount
    ? Math.round(
        ((parseFloat(compare.amount) - parseFloat(variant.price.amount)) /
          parseFloat(compare.amount)) *
          100
      )
    : 0;

  const lowStock =
    variant?.quantityAvailable != null &&
    variant.quantityAvailable > 0 &&
    variant.quantityAvailable <= 5;

  const handleAdd = async (buyNow = false) => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions || [],
    });
    if (buyNow) {
      const url = useCartStore.getState().getCheckoutUrl();
      if (url) window.open(url, "_blank");
    } else {
      setOpen(true);
    }
  };

  const eta = new Date(Date.now() + 4 * 86400000).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-luxe pt-6 text-xs text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-accent">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/shop" className="hover:text-accent">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate">{product.title}</span>
      </div>

      <section className="container-luxe py-8 lg:py-12 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="aspect-square bg-secondary overflow-hidden">
            {product.images.edges[activeImg]?.node && (
              <img
                src={product.images.edges[activeImg].node.url}
                alt={product.images.edges[activeImg].node.altText ?? product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.edges.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-secondary border ${
                    activeImg === i ? "border-accent" : "border-transparent"
                  }`}
                >
                  <img
                    src={img.node.url}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>★★★★★</span>
              <span>·</span>
              <span>No reviews yet</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold">
              {formatPrice(variant?.price.amount ?? "0", variant?.price.currencyCode)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(compare.amount, compare.currencyCode)}
                </span>
                <span className="text-xs bg-accent/15 text-accent-foreground border border-accent px-2 py-0.5 font-medium">
                  Save {discountPct}%
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-trust font-medium">
            Inclusive of all taxes · Free shipping ₹499+
          </p>

          {(product.tags ?? []).map((t) => t.toLowerCase()).includes("flash-sale") && (
            <div className="flex items-center gap-2 text-xs bg-accent/10 border border-accent/30 px-3 py-2">
              <Flame className="h-3.5 w-3.5 text-accent" />
              <span className="font-medium">Selling fast — flash sale ends tonight</span>
            </div>
          )}

          {/* Options */}
          {product.options.map((opt) =>
            opt.values.length <= 1 && opt.values[0] === "Default Title" ? null : (
              <div key={opt.name}>
                <p className="text-xs uppercase tracking-wider mb-2">
                  {opt.name}: <span className="text-muted-foreground">{selectedOptions[opt.name]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((v) => (
                    <button
                      key={v}
                      onClick={() =>
                        setSelectedOptions((prev) => ({ ...prev, [opt.name]: v }))
                      }
                      className={`px-4 py-2 text-xs border transition ${
                        selectedOptions[opt.name] === v
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider">Qty</span>
            <div className="inline-flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-secondary">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="px-4 text-sm font-medium min-w-10 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2.5 hover:bg-secondary">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            {lowStock && (
              <span className="text-xs text-destructive font-medium">
                Only {variant?.quantityAvailable} left
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="space-y-2.5">
            <Button
              onClick={() => handleAdd(false)}
              disabled={!variant?.availableForSale || isLoading}
              size="lg"
              variant="outline"
              className="w-full h-12 border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Bag"}
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => handleAdd(true)}
                disabled={!variant?.availableForSale || isLoading}
                size="lg"
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                Buy Now
              </Button>
              <button
                onClick={() => toggleWish(product.id)}
                aria-label="Wishlist"
                className="border border-border h-12 w-12 flex items-center justify-center hover:border-accent transition"
              >
                <Heart
                  className={`h-5 w-5 ${isWished ? "fill-accent text-accent" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs">
              <Banknote className="h-4 w-4 text-accent" />
              <span>COD Available</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Truck className="h-4 w-4 text-accent" />
              <span>Delivery by {eta}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <RotateCcw className="h-4 w-4 text-accent" />
              <span>7-day easy returns</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>100% secure checkout</span>
            </div>
          </div>

          {/* Description */}
          <Accordion type="multiple" defaultValue={["desc"]} className="border-t border-border">
            <AccordionItem value="desc">
              <AccordionTrigger className="text-sm uppercase tracking-wider">
                Description
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description || "Premium quality product, thoughtfully crafted."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ship">
              <AccordionTrigger className="text-sm uppercase tracking-wider">
                Shipping & Returns
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>Free shipping on orders ₹499 and above. Standard delivery in 3-5 business days.</p>
                <p>Easy 7-day returns from date of delivery on most items.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq">
              <AccordionTrigger className="text-sm uppercase tracking-wider">FAQ</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-3">
                <div>
                  <p className="font-medium text-foreground">Is COD available?</p>
                  <p>Yes, available on most pin codes across India.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">How long does delivery take?</p>
                  <p>3-5 business days for most pin codes.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-[60px] inset-x-0 z-20 bg-background border-t border-border p-3 safe-bottom">
        <div className="flex gap-2">
          <Button
            onClick={() => handleAdd(false)}
            disabled={!variant?.availableForSale || isLoading}
            variant="outline"
            className="flex-1 h-11"
          >
            Add to Bag
          </Button>
          <Button
            onClick={() => handleAdd(true)}
            disabled={!variant?.availableForSale || isLoading}
            className="flex-1 h-11 bg-primary"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
