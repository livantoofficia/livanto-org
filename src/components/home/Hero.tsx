import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-livanto.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden bg-secondary">
    <div className="container-luxe grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-24">
      <div className="space-y-7 animate-fade-up order-2 lg:order-1">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium">
          ✦ New Season · India Edit
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
          Premium essentials,{" "}
          <em className="text-accent not-italic font-semibold">elegantly</em>{" "}
          curated.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
          Discover modern lifestyle products designed for the way you live —
          smart, beautiful, and built to last. Free shipping across India on
          orders ₹499+.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 h-12 text-sm uppercase tracking-wider hover:bg-primary/90 transition"
          >
            Shop Now
          </Link>
          <Link
            to="/shop?cat=trending"
            className="inline-flex items-center justify-center border border-foreground/20 px-8 h-12 text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition"
          >
            Trending →
          </Link>
        </div>
        <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
          <span>★ 4.8 Verified ratings</span>
          <span className="hidden sm:inline">· 50,000+ Happy customers</span>
        </div>
      </div>
      <div className="relative order-1 lg:order-2">
        <div className="relative aspect-[4/3] lg:aspect-[5/6] overflow-hidden">
          <img
            src={heroImg}
            alt="LIVANTO premium lifestyle products"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-background border border-border px-5 py-3 shadow-elegant hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Best Seller
          </p>
          <p className="font-display text-lg">Smart Kitchen Edit</p>
        </div>
      </div>
    </div>
  </section>
);
