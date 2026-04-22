import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { Link } from "react-router-dom";

const FREE_SHIPPING_THRESHOLD = 499;

export const CartDrawer = () => {
  const {
    items,
    isOpen,
    setOpen,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce(
    (s, i) => s + parseFloat(i.price.amount) * i.quantity,
    0
  );
  const currency = items[0]?.price.currencyCode ?? "INR";
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-5 pt-6 pb-4 border-b">
          <SheetTitle className="font-display text-2xl">Your Bag</SheetTitle>
          <SheetDescription className="text-xs">
            {totalItems === 0
              ? "Your bag is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">
              Discover premium essentials curated for modern Indian homes.
            </p>
            <Button
              onClick={() => setOpen(false)}
              asChild
              variant="default"
              className="bg-primary"
            >
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping bar */}
            <div className="px-5 py-3 bg-secondary/50">
              {remaining > 0 ? (
                <p className="text-xs text-foreground/80 mb-2">
                  Add{" "}
                  <span className="font-semibold text-accent">
                    {formatPrice(remaining, currency)}
                  </span>{" "}
                  more for <span className="font-medium">free shipping</span>
                </p>
              ) : (
                <p className="text-xs text-trust font-medium mb-2">
                  ✓ You've unlocked free shipping
                </p>
              )}
              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {items.map((item) => {
                const img = item.product.node.images?.edges?.[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                      {img && (
                        <img
                          src={img.url}
                          alt={img.altText ?? item.product.node.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight line-clamp-2">
                        {item.product.node.title}
                      </h4>
                      {item.selectedOptions.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.selectedOptions
                            .map((o) => o.value)
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}
                      <p className="text-sm font-semibold mt-1.5">
                        {formatPrice(
                          parseFloat(item.price.amount) * item.quantity,
                          item.price.currencyCode
                        )}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-secondary"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-medium min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-secondary"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          aria-label="Remove"
                          className="text-muted-foreground hover:text-destructive p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t px-5 py-4 space-y-4 bg-background">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground -mt-2">
                Shipping calculated at checkout · No additional taxes
              </p>
              <Button
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Secure Checkout <ExternalLink className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground uppercase tracking-wider">
                <span>UPI</span>·<span>Cards</span>·<span>COD</span>·<span>Wallets</span>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
