import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, MapPin, CheckCircle2 } from "lucide-react";

const STAGES = [
  { Icon: Package, label: "Order Packed" },
  { Icon: Truck, label: "Shipped" },
  { Icon: MapPin, label: "Out for Delivery" },
  { Icon: CheckCircle2, label: "Delivered" },
];

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStage(1);
  };

  return (
    <section className="container-luxe py-12 lg:py-20 max-w-3xl">
      <div className="text-center mb-10">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">✦ Order Tracking</p>
        <h1 className="font-display text-4xl lg:text-5xl">Track Your Order</h1>
        <p className="text-muted-foreground mt-3">
          Enter your details below to see real-time status.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="bg-secondary/50 p-6 sm:p-8 grid sm:grid-cols-2 gap-4 mb-12"
      >
        <div>
          <label className="text-xs uppercase tracking-wider mb-2 block">
            Order ID
          </label>
          <Input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="LIV-12345"
            required
            className="h-12 bg-background"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider mb-2 block">
            Phone number
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            required
            className="h-12 bg-background"
          />
        </div>
        <Button type="submit" className="sm:col-span-2 h-12 bg-primary">
          Track Order
        </Button>
      </form>

      {activeStage !== null && (
        <div className="border border-border p-6 sm:p-10">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Order #LIV-{orderId || "12345"}
          </p>
          <p className="font-display text-2xl mb-8">In transit</p>
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map(({ Icon, label }, i) => {
              const done = i <= activeStage;
              return (
                <div key={label} className="flex flex-col items-center text-center">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${
                      done
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={`text-[11px] sm:text-xs ${done ? "font-medium" : "text-muted-foreground"}`}>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-xs text-muted-foreground border-t border-border pt-4">
            <p>Estimated delivery: 3-5 business days</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrackOrder;
