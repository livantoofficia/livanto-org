import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { Plus, Trash2, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const addressSchema = z.object({
  label: z.string().trim().max(40).optional(),
  full_name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Invalid phone"),
  line1: z.string().trim().min(2).max(120),
  line2: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pincode: z.string().trim().regex(/^\d{4,8}$/, "Invalid pincode"),
});

type Addr = {
  id: string;
  label: string | null;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
};

const Addresses = () => {
  const { user, isReady } = useAuth();
  const [list, setList] = useState<Addr[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isReady || !user) return;
    supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        else setList((data as Addr[]) ?? []);
        setLoading(false);
      });
  }, [isReady, user]);

  if (isReady && !user) return <Navigate to="/account" replace />;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const parsed = addressSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("addresses")
      .insert({ ...parsed.data, user_id: user.id, country: "India", is_default: list.length === 0 })
      .select()
      .single();
    setSaving(false);
    if (error) return toast.error(error.message);
    setList([data as Addr, ...list]);
    setShowForm(false);
    toast.success("Address saved");
  };

  const onDelete = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setList(list.filter((a) => a.id !== id));
    toast.success("Address removed");
  };

  return (
    <section className="container-luxe py-8 lg:py-14 max-w-3xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">✦ Saved</p>
          <h1 className="font-display text-2xl sm:text-3xl">Addresses</h1>
        </div>
        <Button onClick={() => setShowForm((s) => !s)} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1.5" /> Add new
        </Button>
      </div>

      {showForm && (
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-5 mb-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input name="label" placeholder="Label (Home / Office)" />
            <Input name="full_name" placeholder="Full name *" required />
            <Input name="phone" placeholder="Phone *" required />
            <Input name="pincode" placeholder="Pincode *" required />
          </div>
          <Input name="line1" placeholder="Address line 1 *" required />
          <Input name="line2" placeholder="Address line 2" />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input name="city" placeholder="City *" required />
            <Input name="state" placeholder="State *" required />
          </div>
          <Button type="submit" disabled={saving} className="w-full">
            {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Save address
          </Button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : list.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No saved addresses yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex justify-between gap-3">
              <div className="text-sm">
                <p className="font-medium">
                  {a.full_name} {a.label && <span className="text-xs text-muted-foreground">· {a.label}</span>}
                  {a.is_default && <span className="ml-2 text-[10px] uppercase text-accent tracking-wider">Default</span>}
                </p>
                <p className="text-muted-foreground mt-0.5">
                  {a.line1}{a.line2 ? `, ${a.line2}` : ""}, {a.city}, {a.state} {a.pincode}
                </p>
                <p className="text-muted-foreground text-xs mt-1">📞 {a.phone}</p>
              </div>
              <button onClick={() => onDelete(a.id)} className="text-muted-foreground hover:text-destructive shrink-0">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Addresses;
