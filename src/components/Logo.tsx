import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link
    to="/"
    aria-label="LIVANTO — home"
    className={`font-brand text-foreground text-xl sm:text-2xl ${className}`}
  >
    LIVANTO
  </Link>
);
