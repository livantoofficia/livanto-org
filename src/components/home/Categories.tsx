import { Link } from "react-router-dom";
import kitchen from "@/assets/cat-kitchen.jpg";
import home from "@/assets/cat-home.jpg";
import personal from "@/assets/cat-personal.jpg";
import fitness from "@/assets/cat-fitness.jpg";
import car from "@/assets/cat-car.jpg";
import garden from "@/assets/cat-garden.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import trending from "@/assets/cat-trending.jpg";

// `q` values are Shopify Collection handles — products auto-sync from Admin.
const cats = [
  { label: "Kitchen & Dining", q: "kitchen-dining", img: kitchen },
  { label: "Home Essentials", q: "home-essentials", img: home },
  { label: "Personal Care", q: "personal-care", img: personal },
  { label: "Fitness & Wellness", q: "fitness-wellness", img: fitness },
  { label: "Car & Bike", q: "car-bike", img: car },
  { label: "Garden & Balcony", q: "garden-balcony", img: garden },
  { label: "Electronics", q: "electronics", img: electronics },
  { label: "Trending Deals", q: "trending-deals", img: trending },
];

export const Categories = () => (
  <section className="py-10 lg:py-24">
    <div className="container-luxe">
      <div className="text-center mb-6 lg:mb-14">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">✦ Explore</p>
        <h2 className="font-display text-3xl lg:text-5xl">Shop by Category</h2>
        <div className="gold-divider mx-auto mt-4 lg:mt-5" />
      </div>

      {/* Mobile: horizontal swipe carousel */}
      <div className="lg:hidden -mx-4 sm:-mx-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 pb-2">
          {cats.map((c) => (
            <Link
              key={c.q}
              to={`/shop?cat=${c.q}`}
              className="group relative shrink-0 snap-start w-[38%] sm:w-[28%] aspect-[3/4] overflow-hidden rounded-xl bg-secondary shadow-sm"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                width={300}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-background text-[13px] font-medium leading-tight">
                  {c.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: full grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {cats.map((c) => (
          <Link
            key={c.q}
            to={`/shop?cat=${c.q}`}
            className="group relative aspect-[4/5] overflow-hidden bg-secondary"
          >
            <img
              src={c.img}
              alt={c.label}
              loading="lazy"
              width={400}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-background text-base font-medium leading-tight">
                {c.label}
              </p>
              <p className="text-background/70 text-[10px] uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
