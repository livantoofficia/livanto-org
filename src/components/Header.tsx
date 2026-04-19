import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  ShoppingBag,
  Sparkles,
  Flame,
  Tag,
  TrendingUp,
  UtensilsCrossed,
  Home,
  Sparkle,
  Dumbbell,
  Car,
  Leaf,
  Plug,
  Truck,
  MessageCircle,
  HelpCircle,
  Info,
  Wallet,
  ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { CartButton } from "@/components/CartButton";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const CATEGORIES = [
  { label: "Kitchen & Dining", q: "kitchen", Icon: UtensilsCrossed },
  { label: "Home Essentials", q: "home", Icon: Home },
  { label: "Personal Care", q: "personal", Icon: Sparkle },
  { label: "Fitness & Wellness", q: "fitness", Icon: Dumbbell },
  { label: "Car & Bike", q: "car", Icon: Car },
  { label: "Garden & Balcony", q: "garden", Icon: Leaf },
  { label: "Electronics", q: "electronics", Icon: Plug },
  { label: "Trending Deals", q: "trending", Icon: Flame },
];

const SHOP_LINKS = [
  { label: "Shop All", to: "/shop", Icon: ShoppingBag },
  { label: "New Arrivals", to: "/shop?tag=new", Icon: Sparkles },
  { label: "Best Sellers", to: "/shop?tag=best-seller", Icon: Flame },
  { label: "Under ₹499", to: "/shop?tag=under-499", Icon: Tag },
  { label: "Trending Now", to: "/shop?tag=trending", Icon: TrendingUp },
];

const HELP_LINKS = [
  { label: "Track Order", to: "/track-order", Icon: Truck },
  { label: "Contact Us", to: "/contact", Icon: MessageCircle },
  { label: "FAQ", to: "/faq", Icon: HelpCircle },
  { label: "About Us", to: "/about", Icon: Info },
];

const ACCOUNT_LINKS = [
  { label: "My Account", to: "/account", Icon: User },
  { label: "Wishlist", to: "/wishlist", Icon: Heart },
  { label: "Wallet", to: "/account", Icon: Wallet },
];

export const Header = () => {
  const wishCount = useWishlistStore((s) => s.ids.length);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md transition-all ${
          scrolled ? "border-b border-border" : ""
        }`}
      >
        <div className="container-luxe flex items-center justify-between gap-4 py-3 sm:py-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[88vw] sm:w-[400px] p-0 border-r-0 bg-[hsl(40_30%_97%)] text-foreground [&>button]:hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-5 flex items-start justify-between border-b border-foreground/10">
                <div>
                  <SheetClose asChild>
                    <Link to="/" className="block">
                      <span className="font-display text-2xl tracking-[0.18em] text-foreground">
                        LIVANTO
                      </span>
                    </Link>
                  </SheetClose>
                  <p className="mt-1.5 text-[11px] tracking-[0.15em] uppercase text-foreground/55 font-light">
                    Modern essentials, curated.
                  </p>
                </div>
                <SheetClose
                  aria-label="Close menu"
                  className="h-9 w-9 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors shrink-0"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </SheetClose>
              </div>

              {/* Body */}
              <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
                <MenuSection title="Shop" items={SHOP_LINKS} />
                <div className="h-px bg-foreground/10" />
                <MenuSection
                  title="Categories"
                  items={CATEGORIES.map((c) => ({
                    label: c.label,
                    to: `/shop?cat=${c.q}`,
                    Icon: c.Icon,
                  }))}
                />
                <div className="h-px bg-foreground/10" />
                <MenuSection title="Help" items={HELP_LINKS} />
                <div className="h-px bg-foreground/10" />
                <MenuSection title="Account" items={ACCOUNT_LINKS} />
              </nav>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-foreground/10 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                  Crafted in India
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            <Link to="/shop" className="hover:text-accent transition-colors">
              Shop All
            </Link>
            {CATEGORIES.slice(0, 5).map((c) => (
              <Link
                key={c.q}
                to={`/shop?cat=${c.q}`}
                className="hover:text-accent transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 hover:text-accent transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="p-2 hover:text-accent transition-colors relative hidden sm:block"
            >
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full h-4 min-w-4 px-1 flex items-center justify-center font-medium">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="p-2 hover:text-accent transition-colors hidden sm:block"
            >
              <User className="h-5 w-5" />
            </Link>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-background border-b shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={submitSearch}
              className="container-luxe flex items-center gap-3 py-5"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search premium products…"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close"
                className="p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
