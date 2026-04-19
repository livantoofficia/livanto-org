import { Link } from "react-router-dom";
import kitchen from "@/assets/cat-kitchen.jpg";
import home from "@/assets/cat-home.jpg";
import personal from "@/assets/cat-personal.jpg";
import fitness from "@/assets/cat-fitness.jpg";
import car from "@/assets/cat-car.jpg";
import garden from "@/assets/cat-garden.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import trending from "@/assets/cat-trending.jpg";
import gifts from "@/assets/cat-gifts.jpg";
import seasonal from "@/assets/cat-seasonal.jpg";

const cats = [
  { label: "Kitchen & Dining", q: "kitchen", img: kitchen },
  { label: "Home Essentials", q: "home", img: home },
  { label: "Personal Care", q: "personal", img: personal },
  { label: "Fitness & Wellness", q: "fitness", img: fitness },
  { label: "Car & Bike", q: "car", img: car },
  { label: "Garden & Balcony", q: "garden", img: garden },
  { label: "Electronics", q: "electronics", img: electronics },
  { label: "Trending Now", q: "trending", img: trending },
  { label: "Gifts & Smart Finds", q: "gifts", img: gifts },
  { label: "Seasonal Deals", q: "sale", img: seasonal },
];

export const Categories = () => (
  <section className="py-16 lg:py-24">
    <div className="container-luxe">
      <div className="text-center mb-10 lg:mb-14">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
          ✦ Explore
        </p>
        <h2 className="font-display text-4xl lg:text-5xl">Shop by Category</h2>
        <div className="gold-divider mx-auto mt-5" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
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
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-background text-sm sm:text-base font-medium leading-tight">
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
