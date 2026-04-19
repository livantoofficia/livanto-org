import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ExternalLink } from "lucide-react";

const FREE_SHIPPING = 499;

const Cart = () => {
  const { items, updateQuantity, removeItem, getCheckoutUrl } = useCartStore();
  const subtotal = items.reduce(
    (s, i) => s + parseFloat(i.price.amount) * i.quantity,
    0
  );
  const currency = items[0]?.price.currencyCode ?? "INR";
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-5" />
        <h1 className="font-display text-4xl mb-3">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">
          Discover premium essentials curated for you.
        </p>
        <Button asChild size="lg" className="bg-primary">
          <Link to="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="container-luxe py-10 lg:py-16">
      <h1 className="font-display text-4xl lg:text-5xl mb-8">Your Bag</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-10">
        <div className="space-y-6 divide-y divide-border">
          {items.map((item) => {
            const img = item.product.node.images?.edges?.[0]?.node;
            return (
              <div key={item.variantId} className="flex gap-4 pt-6 first:pt-0">
                <Link
                  to={`/product/${item.product.node.handle}`}
                  className="w-24 h-32 sm:w-28 sm:h-36 bg-secondary overflow-hidden flex-shrink-0"
                >
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText ?? item.product.node.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.node.handle}`}
                    className="font-medium hover:text-accent line-clamp-2"
                  >
                    {item.product.node.title}
                  </Link>
                  {item.selectedOptions.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.selectedOptions
                        .map((o) => o.value)
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                  <p className="text-sm font-semibold mt-2">
                    {formatPrice(
                      parseFloat(item.price.amount) * item.quantity,
                      item.price.currencyCode
                    )}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-2 hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-sm min-w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="p-2 hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-muted-foreground hover:text-destructive p-2"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="bg-secondary/50 p-6 lg:p-7 h-fit lg:sticky lg:top-32 space-y-4">
          <h2 className="font-display text-2xl">Order Summary</h2>
          {remaining > 0 ? (
            <p className="text-xs">
              Add{" "}
              <span className="font-semibold text-accent">
                {formatPrice(remaining, currency)}
              </span>{" "}
              more for free shipping.
            </p>
          ) : (
            <p className="text-xs text-trust font-medium">✓ Free shipping unlocked</p>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{remaining > 0 ? "Calculated at checkout" : "Free"}</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          <Button onClick={checkout} className="w-full h-12 bg-primary" size="lg">
            Secure Checkout <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground text-center">
            UPI · Cards · COD · Wallets · Net Banking
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Cart;
