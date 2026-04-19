import { NavLink } from "react-router-dom";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/shop", label: "Shop", icon: Search },
  { to: "/cart", label: "Bag", icon: ShoppingBag, badge: "cart" as const },
  { to: "/wishlist", label: "Wish", icon: Heart, badge: "wish" as const },
  { to: "/account", label: "Me", icon: User },
];

export const MobileBottomNav = () => {
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishCount = useWishlistStore((s) => s.ids.length);

  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-md border-t border-border safe-bottom"
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          const count =
            it.badge === "cart" ? cartCount : it.badge === "wish" ? wishCount : 0;
          return (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.end}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] uppercase tracking-wider relative ${
                    isActive ? "text-accent" : "text-muted-foreground"
                  }`
                }
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {count > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-accent text-accent-foreground text-[9px] rounded-full h-3.5 min-w-3.5 px-1 flex items-center justify-center font-medium">
                      {count}
                    </span>
                  )}
                </div>
                <span>{it.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
