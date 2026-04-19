import { useEffect, useState } from "react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const ids = useWishlistStore((s) => s.ids);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    fetchProducts({ first: 50 })
      .then((all) => setProducts(all.filter((p) => ids.includes(p.node.id))))
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <section className="container-luxe py-10 lg:py-16">
      <h1 className="font-display text-4xl lg:text-5xl mb-3">Wishlist</h1>
      <p className="text-muted-foreground text-sm mb-10">
        Your favourite picks, saved for later.
      </p>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-secondary animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-5" />
          <p className="font-display text-2xl mb-3">No saved items yet</p>
          <p className="text-sm text-muted-foreground mb-6">
            Tap the heart on any product to save it here.
          </p>
          <Button asChild className="bg-primary">
            <Link to="/shop">Discover Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
