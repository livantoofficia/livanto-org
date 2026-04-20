import { Link } from "react-router-dom";
import {
  Package,
  Heart,
  MapPin,
  Wallet,
  Gift,
  History,
  MessageCircle,
  Truck,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  { Icon: Package, label: "Orders", to: "/track-order", hint: "View your purchases" },
  { Icon: Heart, label: "Wishlist", to: "/wishlist", hint: "Saved favorites" },
  { Icon: MapPin, label: "Addresses", to: "#", hint: "Delivery locations" },
  { Icon: Wallet, label: "Wallet", to: "#", hint: "Credits & refunds" },
  { Icon: History, label: "Recently Viewed", to: "/shop", hint: "Pick up where you left" },
  { Icon: Gift, label: "Refer & Earn", to: "#", hint: "Invite friends, earn ₹100" },
  { Icon: MessageCircle, label: "Support Chat", to: "/contact", hint: "We're here for you" },
  { Icon: Truck, label: "Track Order", to: "/track-order", hint: "Real-time updates" },
];

const benefits = [
  { Icon: Sparkles, label: "Faster checkout" },
  { Icon: Gift, label: "Exclusive rewards" },
  { Icon: ShieldCheck, label: "Order protection" },
];

const Account = () => (
  <section className="container-luxe py-8 lg:py-16">
    <div className="max-w-3xl mx-auto">
      {/* Hero / Sign-in card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/40 border border-border rounded-2xl p-6 sm:p-10 mb-6">
        {/* gold accent */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.32em] text-accent mb-3">
            ✦ Member Access
          </p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight">
            Welcome to <span className="italic">LIVANTO</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Sign in for rewards, track orders, save addresses, and enjoy faster checkout.
          </p>

          {/* Benefits chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {benefits.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-[11px] bg-background/70 backdrop-blur border border-border rounded-full px-3 py-1.5"
              >
                <Icon className="h-3 w-3 text-accent" />
                {label}
              </span>
            ))}
          </div>

          {/* Login options */}
          <div className="mt-6 space-y-2.5 max-w-sm">
            <Button
              size="lg"
              variant="outline"
              className="w-full h-12 bg-background border-border hover:bg-secondary justify-center gap-3 font-medium"
            >
              <GoogleIcon className="h-4 w-4" />
              Continue with Google
            </Button>
            <Button
              size="lg"
              className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
            >
              <Phone className="h-4 w-4" />
              Login with Phone (OTP)
            </Button>
            <button className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition pt-1 inline-flex items-center justify-center gap-1.5">
              <Mail className="h-3 w-3" /> Use email instead
            </button>
          </div>

          <p className="text-[10px] text-muted-foreground mt-4 max-w-sm">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-foreground">
              Terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy-policy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">
            ✦ Your Account
          </p>
          <h2 className="font-display text-xl sm:text-2xl">Quick Actions</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {quickActions.map(({ Icon, label, to, hint }) => (
          <Link
            key={label}
            to={to}
            className="group relative bg-card border border-border rounded-xl p-4 hover:border-accent hover:shadow-[0_2px_12px_hsl(20_14%_8%/0.06)] transition-all"
          >
            <div className="h-9 w-9 rounded-lg bg-secondary group-hover:bg-accent/10 flex items-center justify-center mb-3 transition-colors">
              <Icon className="h-4 w-4 text-foreground group-hover:text-accent transition-colors" strokeWidth={1.6} />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                  {hint}
                </p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer trust line */}
      <div className="mt-8 text-center">
        <p className="text-[11px] text-muted-foreground">
          Trusted by thousands of premium homes across India.
        </p>
      </div>
    </div>
  </section>
);

const GoogleIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.45c-.28 1.45-1.13 2.68-2.4 3.5v2.91h3.87c2.27-2.09 3.57-5.17 3.57-8.65z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-2.91c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09C3.25 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.38a7.21 7.21 0 0 1 0-4.76V6.53H1.27a12 12 0 0 0 0 10.94l4-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.53l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

export default Account;
