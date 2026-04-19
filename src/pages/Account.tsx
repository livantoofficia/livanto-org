import { Link } from "react-router-dom";
import { User, Package, Heart, MapPin, Wallet, Gift, Headphones, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { Icon: Package, label: "Orders", to: "/track-order" },
  { Icon: Heart, label: "Wishlist", to: "/wishlist" },
  { Icon: MapPin, label: "Addresses", to: "#" },
  { Icon: Wallet, label: "Wallet Credits", to: "#" },
  { Icon: Gift, label: "Refer & Earn", to: "#" },
  { Icon: History, label: "Recently Viewed", to: "/shop" },
  { Icon: Headphones, label: "Support", to: "/contact" },
];

const Account = () => (
  <section className="container-luxe py-10 lg:py-16">
    <div className="max-w-4xl mx-auto">
      <div className="bg-secondary/50 p-8 lg:p-10 mb-8 flex items-center gap-5">
        <div className="h-16 w-16 rounded-full bg-foreground text-background flex items-center justify-center">
          <User className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h1 className="font-display text-3xl">Welcome to LIVANTO</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to view your orders, save addresses, and earn rewards.
          </p>
        </div>
        <Button className="bg-primary hidden sm:inline-flex">Sign In</Button>
      </div>
      <Button className="bg-primary w-full sm:hidden mb-6">Sign In / Create Account</Button>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
        {sections.map(({ Icon, label, to }) => (
          <Link
            key={label}
            to={to}
            className="bg-background p-6 hover:bg-secondary/50 transition flex items-center gap-4"
          >
            <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Account;
