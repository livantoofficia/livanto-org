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
            <SheetContent side="left" className="w-[88vw] sm:w-[380px] p-0">
              <div className="flex items-center justify-between p-5 border-b">
                <Logo />
              </div>
              <nav className="flex flex-col py-2">
                <Link
                  to="/shop"
                  className="px-5 py-3 text-sm font-medium hover:bg-secondary"
                >
                  Shop All
                </Link>
                <div className="px-5 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Categories
                </div>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.q}
                    to={`/shop?cat=${c.q}`}
                    className="px-5 py-2.5 text-sm hover:bg-secondary"
                  >
                    {c.label}
                  </Link>
                ))}
                <div className="border-t mt-3 pt-3 flex flex-col">
                  <Link to="/track-order" className="px-5 py-2.5 text-sm hover:bg-secondary">
                    Track Order
                  </Link>
                  <Link to="/contact" className="px-5 py-2.5 text-sm hover:bg-secondary">
                    Contact
                  </Link>
                  <Link to="/about" className="px-5 py-2.5 text-sm hover:bg-secondary">
                    About
                  </Link>
                </div>
              </nav>
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
