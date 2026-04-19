import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export const CartButton = () => {
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const setOpen = useCartStore((s) => s.setOpen);

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={`Cart with ${totalItems} items`}
      className="p-2 hover:text-accent transition-colors relative"
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
};
