import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Welcome to LIVANTO ✦", {
      description: "Use code WELCOME10 for 10% off your first order.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="container-luxe relative text-center max-w-2xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-4">
          ✦ Join the LIVANTO Circle
        </p>
        <h2 className="font-display text-4xl lg:text-5xl leading-tight">
          Get 10% off your first order
        </h2>
        <p className="text-primary-foreground/70 mt-4 mb-8">
          Be the first to know about new drops, private sales, and exclusive
          member-only offers.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent border border-primary-foreground/30 px-4 h-12 placeholder:text-primary-foreground/40 focus:border-accent outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-accent text-accent-foreground px-7 h-12 text-xs uppercase tracking-wider hover:bg-accent/90 transition"
          >
            Subscribe
          </button>
        </form>
        <p className="text-[10px] uppercase tracking-wider text-primary-foreground/40 mt-5">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
