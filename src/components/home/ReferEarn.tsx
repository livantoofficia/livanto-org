import { Gift, Sparkles, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export const ReferEarn = () => (
  <section className="container-luxe py-12 lg:py-16">
    <div className="relative overflow-hidden bg-gradient-to-br from-gold-light to-secondary border border-accent/20 rounded-sm p-8 lg:p-14 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-accent">
          <Sparkles className="h-3 w-3" /> Refer & Earn
        </div>
        <h3 className="font-display text-3xl lg:text-4xl leading-tight max-w-xl">
          Invite friends. Get <span className="text-accent">₹100</span> in your wallet.
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Your friend gets ₹100 off their first order. You get ₹100 in LIVANTO
          credit when they order — instantly.
        </p>
        <div className="flex items-center gap-6 pt-2 text-xs text-foreground/70">
          <span className="inline-flex items-center gap-1.5"><Gift className="h-3.5 w-3.5" /> ₹100 for them</span>
          <span className="inline-flex items-center gap-1.5"><Wallet className="h-3.5 w-3.5" /> ₹100 for you</span>
        </div>
      </div>
      <Link
        to="/account"
        className="bg-primary text-primary-foreground px-7 h-12 inline-flex items-center justify-center text-xs uppercase tracking-wider hover:bg-primary/90 transition"
      >
        Get your link
      </Link>
    </div>
  </section>
);
