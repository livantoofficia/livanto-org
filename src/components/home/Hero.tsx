import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import heroImg from "@/assets/hero-livanto.jpg";
import bestsellersImg from "@/assets/hero-bestsellers.jpg";
import offerImg from "@/assets/hero-offer.jpg";

type Slide = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
  ctas: { label: string; to: string; variant: "primary" | "outline" }[];
};

const SLIDES: Slide[] = [
  {
    eyebrow: "✦ New Season · India Edit",
    title: (
      <>
        Upgrade your lifestyle,{" "}
        <em className="text-accent not-italic font-semibold">beautifully.</em>
      </>
    ),
    subtitle: "Premium essentials for the modern Indian home.",
    image: heroImg,
    ctas: [
      { label: "Shop Now", to: "/shop", variant: "primary" },
      { label: "Trending Products →", to: "/shop?tag=trending", variant: "outline" },
    ],
  },
  {
    eyebrow: "✦ Most Loved",
    title: (
      <>
        Best Sellers{" "}
        <em className="text-accent not-italic font-semibold">loved by shoppers.</em>
      </>
    ),
    subtitle: "Handpicked favorites trusted by 50,000+ customers.",
    image: bestsellersImg,
    ctas: [{ label: "Shop Best Sellers", to: "/shop", variant: "primary" }],
  },
  {
    eyebrow: "✦ Welcome Offer",
    title: (
      <>
        Get <em className="text-accent not-italic font-semibold">10% off</em> your first order.
      </>
    ),
    subtitle: "Join the Livanto circle and unlock exclusive offers.",
    image: offerImg,
    ctas: [{ label: "Claim Offer", to: "/shop", variant: "primary" }],
  },
];

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

export const Hero = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((i: number) => {
    setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > SWIPE_THRESHOLD) {
      goTo(active + (touchDeltaX.current < 0 ? 1 : -1));
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    window.setTimeout(() => setPaused(false), 300);
  };

  return (
    <section
      className="relative overflow-hidden bg-secondary"
      aria-roledescription="carousel"
      aria-label="Livanto featured promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              className={`${i === 0 ? "relative" : "absolute inset-0"} transition-opacity duration-700 ease-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
            >
              <div className="container-luxe grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 sm:py-12 lg:py-24">
                <div
                  className={`space-y-5 sm:space-y-6 order-2 lg:order-1 ${
                    isActive ? "animate-fade-up" : ""
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium">
                    {slide.eyebrow}
                  </p>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {slide.ctas.map((cta) =>
                      cta.variant === "primary" ? (
                        <Link
                          key={cta.label}
                          to={cta.to}
                          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-7 sm:px-8 h-12 text-sm uppercase tracking-wider hover:bg-primary/90 transition"
                        >
                          {cta.label}
                        </Link>
                      ) : (
                        <Link
                          key={cta.label}
                          to={cta.to}
                          className="inline-flex items-center justify-center border border-foreground/20 px-7 sm:px-8 h-12 text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition"
                        >
                          {cta.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
                <div className="relative order-1 lg:order-2">
                  <div className="relative aspect-[4/3] lg:aspect-[5/6] overflow-hidden">
                    <img
                      src={slide.image}
                      alt=""
                      width={1600}
                      height={1200}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isActive ? "w-8 bg-accent" : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};
