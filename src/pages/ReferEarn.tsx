import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Copy, Gift, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ReferEarn = () => {
  const { user, isReady } = useAuth();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady || !user) return;
    supabase
      .from("profiles")
      .select("referral_code")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setCode((data as any)?.referral_code ?? null));
  }, [isReady, user]);

  if (isReady && !user) return <Navigate to="/account" replace />;

  const link = `${window.location.origin}/?ref=${code ?? ""}`;

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "LIVANTO", text: "Get ₹100 off your first LIVANTO order!", url: link });
      } catch {}
    } else copy();
  };

  return (
    <section className="container-luxe py-8 lg:py-14 max-w-2xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">✦ Rewards</p>
      <h1 className="font-display text-2xl sm:text-3xl mb-6">Refer & Earn</h1>

      <div className="bg-gradient-to-br from-secondary via-background to-secondary/40 border border-border rounded-2xl p-6 mb-6 text-center">
        <Gift className="h-10 w-10 text-accent mx-auto mb-3" />
        <h2 className="font-display text-xl">Give ₹100, Earn ₹100</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Friends save ₹100 on their first order. You get ₹100 in your wallet when they shop.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Your referral code</p>
        <p className="font-display text-3xl tracking-[0.2em] my-2">{code ?? "…"}</p>
        <p className="text-xs text-muted-foreground break-all">{link}</p>
        <div className="flex gap-2 mt-4">
          <Button onClick={copy} variant="outline" className="flex-1">
            <Copy className="h-4 w-4 mr-1.5" /> Copy link
          </Button>
          <Button onClick={share} className="flex-1">
            <Share2 className="h-4 w-4 mr-1.5" /> Share
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReferEarn;
