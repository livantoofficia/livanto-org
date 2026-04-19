import { Truck, ShieldCheck, Banknote, RotateCcw } from "lucide-react";

const items = [
  { Icon: Banknote, title: "Cash on Delivery", sub: "Pay at your door" },
  { Icon: Truck, title: "Free Shipping", sub: "On orders ₹499+" },
  { Icon: RotateCcw, title: "Easy Returns", sub: "7-day no-question" },
  { Icon: ShieldCheck, title: "Secure Checkout", sub: "100% safe payments" },
];

export const TrustStrip = () => (
  <section className="border-y border-border bg-background">
    <div className="container-luxe grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      {items.map(({ Icon, title, sub }) => (
        <div
          key={title}
          className="bg-background flex items-center gap-3 px-5 py-5 lg:py-6"
        >
          <Icon className="h-5 w-5 text-accent flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-sm font-medium leading-tight">{title}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
