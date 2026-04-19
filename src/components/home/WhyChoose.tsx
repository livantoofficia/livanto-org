import { Sparkles, BadgeCheck, Leaf, Heart } from "lucide-react";

const points = [
  {
    Icon: Sparkles,
    title: "Premium quality",
    text: "Every product is hand-picked and tested for daily Indian living.",
  },
  {
    Icon: BadgeCheck,
    title: "Verified by 50K+ buyers",
    text: "Real reviews, real ratings — never paid testimonials.",
  },
  {
    Icon: Leaf,
    title: "Thoughtfully sourced",
    text: "Working with Indian craftsmen and ethical factories.",
  },
  {
    Icon: Heart,
    title: "Truly customer-first",
    text: "WhatsApp support, COD on most orders, and easy returns.",
  },
];

export const WhyChoose = () => (
  <section className="bg-secondary py-16 lg:py-24">
    <div className="container-luxe">
      <div className="text-center mb-12 lg:mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
          ✦ The LIVANTO Promise
        </p>
        <h2 className="font-display text-4xl lg:text-5xl max-w-2xl mx-auto leading-tight">
          Built on trust. Delivered with care.
        </h2>
        <div className="gold-divider mx-auto mt-5" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {points.map(({ Icon, title, text }) => (
          <div key={title} className="bg-background p-7 lg:p-10">
            <Icon className="h-7 w-7 text-accent mb-5" strokeWidth={1.4} />
            <h3 className="font-display text-xl mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
