import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Wallet as WalletIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

type Tx = { id: string; amount: number; type: "credit" | "debit"; reason: string | null; created_at: string };

const Wallet = () => {
  const { user, isReady } = useAuth();
  const [tx, setTx] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady || !user) return;
    supabase
      .from("wallet_transactions")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setTx((data as Tx[]) ?? []);
        setLoading(false);
      });
  }, [isReady, user]);

  if (isReady && !user) return <Navigate to="/account" replace />;

  const balance = tx.reduce((s, t) => s + (t.type === "credit" ? Number(t.amount) : -Number(t.amount)), 0);

  return (
    <section className="container-luxe py-8 lg:py-14 max-w-2xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">✦ LIVANTO Credits</p>
      <h1 className="font-display text-2xl sm:text-3xl mb-6">Wallet</h1>

      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 mb-6">
        <p className="text-xs opacity-80 uppercase tracking-wider">Balance</p>
        <p className="font-display text-4xl mt-2">₹{balance.toFixed(2)}</p>
        <p className="text-xs opacity-70 mt-2">Use credits at checkout for instant discount</p>
      </div>

      <h2 className="font-display text-lg mb-3">Recent activity</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : tx.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <WalletIcon className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No transactions yet</p>
          <p className="text-xs text-muted-foreground mt-1">Refer friends or shop to earn credits</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tx.map((t) => (
            <div key={t.id} className="flex justify-between items-center bg-card border border-border rounded-lg p-3">
              <div>
                <p className="text-sm font-medium">{t.reason ?? (t.type === "credit" ? "Credit" : "Debit")}</p>
                <p className="text-[11px] text-muted-foreground">{new Date(t.created_at).toLocaleDateString()}</p>
              </div>
              <p className={`text-sm font-semibold ${t.type === "credit" ? "text-green-600" : "text-destructive"}`}>
                {t.type === "credit" ? "+" : "-"}₹{Number(t.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wallet;
