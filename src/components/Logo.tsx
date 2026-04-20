import { Link } from "react-router-dom";

/**
 * LIVANTO wordmark — refined luxury serif with optical letter-spacing.
 * Uses Cormorant Garamond at light weight + small accent gold dot
 * for a couture, premium feel.
 */
export const Logo = ({ className = "" }: { className?: string }) => (
  <Link
    to="/"
    aria-label="LIVANTO — home"
    className={`inline-flex items-baseline gap-[3px] text-foreground ${className}`}
  >
    <span
      className="font-display text-[22px] sm:text-[26px] leading-none font-light tracking-[0.28em] uppercase"
      style={{ fontFeatureSettings: "'liga', 'dlig', 'kern'" }}
    >
      Livanto
    </span>
    <span
      aria-hidden
      className="h-[5px] w-[5px] rounded-full bg-accent translate-y-[-1px]"
    />
  </Link>
);
