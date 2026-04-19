import { Star, MessageSquare } from "lucide-react";

export const ReviewsSection = () => (
  <section className="py-14 lg:py-20">
    <div className="container-luxe">
      <div className="text-center mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2">✦ Voices</p>
        <h2 className="font-display text-3xl lg:text-4xl">Real Customer Reviews</h2>
        <div className="gold-divider mx-auto mt-4" />
      </div>

      <div className="max-w-2xl mx-auto bg-secondary/40 border border-dashed border-border p-10 sm:p-14 text-center">
        <div className="flex items-center justify-center gap-1 text-border mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5" />
          ))}
        </div>
        <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" strokeWidth={1.3} />
        <p className="font-display text-2xl mb-2">No reviews yet — be the first.</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          We're a brand-new home for premium Indian essentials. Order today and your verified
          review could be featured here.
        </p>
      </div>
    </div>
  </section>
);
