import { useEffect, useState } from "react";
import { X, Gift } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "livanto-exit-intent-shown";

export const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    // Mobile fallback: after 25s of activity
    const t = setTimeout(trigger, 25000);

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(t);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("LIVANTO10");
      toast.success("Code LIVANTO10 copied to clipboard");
    } catch {
      toast.success("Use code LIVANTO10 at checkout");
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-foreground/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-background max-w-md w-full p-8 sm:p-10 relative shadow-luxe text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 hover:text-accent"
        >
          <X className="h-4 w-4" />
        </button>

        <Gift className="h-10 w-10 text-accent mx-auto mb-4" strokeWidth={1.4} />
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">Wait — a gift for you</p>
        <h3 className="font-display text-3xl sm:text-4xl leading-tight mb-3">
          Enjoy 10% off your first order
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Use the code below at checkout. Valid sitewide on your first order with LIVANTO.
        </p>

        <div className="border border-dashed border-accent bg-accent/5 py-4 mb-6">
          <p className="font-display text-2xl tracking-[0.3em] text-accent">LIVANTO10</p>
        </div>

        <button
          onClick={copy}
          className="w-full bg-primary text-primary-foreground h-12 text-xs uppercase tracking-wider hover:bg-primary/90 transition mb-3"
        >
          Copy Code & Continue Shopping
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground hover:text-foreground underline"
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
};
