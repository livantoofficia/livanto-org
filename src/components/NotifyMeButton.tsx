import { useState } from "react";
import { BellRing, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

interface Props {
  productTitle: string;
  productId: string;
  variantId?: string;
  /** 'card' = inline narrow CTA, 'pdp' = full-size button */
  variant?: "card" | "pdp";
}

const STORAGE_KEY = "livanto-notify-me";
const schema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }).max(255),
});

function readSubs(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export const NotifyMeButton = ({
  productTitle,
  productId,
  variantId,
  variant = "card",
}: Props) => {
  const key = variantId || productId;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState<boolean>(() => Boolean(readSubs()[key]));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    // Persist locally — when backend exists, we'll POST here.
    const subs = readSubs();
    subs[key] = parsed.data.email;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setSubscribed(true);
    setOpen(false);
    toast.success("You're on the list", {
      description: `We'll email ${parsed.data.email} when ${productTitle} is back.`,
    });
  };

  if (variant === "card") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute bottom-0 inset-x-0 bg-foreground text-background text-xs uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2"
          >
            {subscribed ? (
              <>
                <Check className="h-3.5 w-3.5" /> On Waitlist
              </>
            ) : (
              <>
                <BellRing className="h-3.5 w-3.5" /> Notify Me
              </>
            )}
          </button>
        </DialogTrigger>
        <NotifyDialogBody
          productTitle={productTitle}
          email={email}
          setEmail={setEmail}
          submitting={submitting}
          onSubmit={onSubmit}
        />
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 gap-2"
        >
          {subscribed ? (
            <>
              <Check className="h-4 w-4" /> You're on the waitlist
            </>
          ) : (
            <>
              <BellRing className="h-4 w-4" /> Notify Me When Available
            </>
          )}
        </Button>
      </DialogTrigger>
      <NotifyDialogBody
        productTitle={productTitle}
        email={email}
        setEmail={setEmail}
        submitting={submitting}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

const NotifyDialogBody = ({
  productTitle,
  email,
  setEmail,
  submitting,
  onSubmit,
}: {
  productTitle: string;
  email: string;
  setEmail: (v: string) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) => (
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center mb-2">
        <BellRing className="h-5 w-5 text-accent" />
      </div>
      <DialogTitle className="font-display text-2xl">Restocking Soon</DialogTitle>
      <DialogDescription className="text-sm">
        Leave your email and we'll be the first to let you know when{" "}
        <span className="text-foreground font-medium">{productTitle}</span> is back in stock.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={onSubmit} className="space-y-3 pt-2">
      <Input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={255}
        className="h-11"
      />
      <DialogFooter>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full h-11 bg-primary"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
        </Button>
      </DialogFooter>
      <p className="text-[11px] text-muted-foreground text-center">
        No spam. One email when it's restocked.
      </p>
    </form>
  </DialogContent>
);
