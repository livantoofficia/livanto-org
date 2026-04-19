import { useEffect, useState } from "react";

export const BrandLoader = ({ duration = 1500 }: { duration?: number }) => {
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), duration - 350);
    const t2 = setTimeout(() => setHidden(true), duration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration]);

  if (hidden) return null;

  const letters = "LIVANTO".split("");

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-foreground transition-opacity duration-[350ms] ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-[0.18em] font-display text-background text-4xl sm:text-5xl tracking-[0.32em] pl-[0.32em]">
          {letters.map((l, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-[letter-in_0.6s_var(--ease-luxe)_forwards]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="relative mt-5 h-px w-40 overflow-hidden bg-background/10">
          <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-transparent via-accent to-transparent animate-[gold-reveal_1.1s_var(--ease-luxe)_forwards]" />
        </div>
        <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-background/45 opacity-0 animate-[fade-in-soft_0.6s_ease-out_0.6s_forwards]">
          Modern essentials, curated.
        </p>
      </div>
    </div>
  );
};
