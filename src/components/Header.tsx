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
  Instagram,
  Facebook,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { CartButton } from "@/components/CartButton";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

// Slugs match Shopify Collection handles → products auto-sync from Shopify Admin.
const CATEGORIES = [
  { label: "Kitchen & Dining", q: "kitchen-dining", Icon: UtensilsCrossed },
  { label: "Home Essentials", q: "home-essentials", Icon: Home },
  { label: "Personal Care", q: "personal-care", Icon: Sparkle },
  { label: "Fitness & Wellness", q: "fitness-wellness", Icon: Dumbbell },
  { label: "Car & Bike", q: "car-bike", Icon: Car },
  { label: "Garden & Balcony", q: "garden-balcony", Icon: Leaf },
  { label: "Electronics", q: "electronics", Icon: Plug },
  { label: "Trending Deals", q: "trending-deals", Icon: Flame },
];

const SHOP_LINKS = [
  { label: "Shop All", to: "/shop", Icon: ShoppingBag },
  { label: "New Arrivals", to: "/shop?cat=new-arrivals", Icon: Sparkles },
  { label: "Best Sellers", to: "/shop?cat=best-sellers", Icon: Flame },
  { label: "Under ₹499", to: "/shop?cat=under-499", Icon: Tag },
  { label: "Trending Now", to: "/shop?cat=trending-now", Icon: TrendingUp },
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

type MenuItem = {
  label: string;
  to: string;
  Icon: LucideIcon;
};

const MenuSection = ({ title, items }: { title: string; items: MenuItem[] }) => (
  <div>
    <div className="text-[10px] tracking-[0.32em] uppercase text-[hsl(43_55%_42%)] font-medium mb-3">
      {title}
    </div>
    <ul className="space-y-0.5">
      {items.map(({ label, to, Icon }) => (
        <li key={label}>
          <SheetClose asChild>
            <Link
              to={to}
              className="group flex items-center gap-3.5 py-2.5 text-[15px] text-foreground/85 hover:text-foreground transition-colors"
            >
              <Icon
                className="h-[18px] w-[18px] text-foreground/60 group-hover:text-[hsl(43_55%_42%)] transition-colors"
                strokeWidth={1.5}
              />
              <span className="flex-1 font-light tracking-wide">{label}</span>
              <ChevronRight
                className="h-3.5 w-3.5 text-foreground/25 group-hover:text-[hsl(43_55%_42%)] group-hover:translate-x-0.5 transition-all"
                strokeWidth={1.5}
              />
            </Link>
          </SheetClose>
        </li>
      ))}
    </ul>
  </div>
);

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
              <div className="px-6 py-5 border-t border-foreground/10 space-y-4">
                <div>
                  <p className="text-[10px] tracking-[0.32em] uppercase text-[hsl(43_55%_42%)] font-medium mb-3 text-center">
                    Follow Us
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a aria-label="Instagram" href="https://www.instagram.com/shoplivanto?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-[hsl(43_55%_42%)] hover:border-[hsl(43_55%_42%)] hover:text-background transition-colors">
                      <Instagram className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                    <a aria-label="Facebook" href="https://www.facebook.com/shoplivanto" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-[hsl(43_55%_42%)] hover:border-[hsl(43_55%_42%)] hover:text-background transition-colors">
                      <Facebook className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                    <a aria-label="Pinterest" href="https://pin.it/ifDiRH2EL" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full border border-foreground/15 flex items-center justify-center hover:bg-[hsl(43_55%_42%)] hover:border-[hsl(43_55%_42%)] hover:text-background transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <a href="mailto:livantoofficial@gmail.com" className="flex items-center justify-center gap-2 text-[12px] text-foreground/60 hover:text-[hsl(43_55%_42%)] transition-colors">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                  livantoofficial@gmail.com
                </a>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 text-center">
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
