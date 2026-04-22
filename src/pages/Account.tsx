import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package, Heart, MapPin, Wallet, Gift, History, MessageCircle, Truck,
  ChevronRight, Sparkles, ShieldCheck, Phone, Mail, LogOut, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const quickActions = [
  { Icon: Package, label: "Orders", to: "/track-order", hint: "View your purchases" },
  { Icon: Heart, label: "Wishlist", to: "/wishlist", hint: "Saved favorites" },
  { Icon: MapPin, label: "Addresses", to: "/account/addresses", hint: "Delivery locations" },
  { Icon: Wallet, label: "Wallet", to: "/account/wallet", hint: "Credits & refunds" },
  { Icon: History, label: "Recently Viewed", to: "/shop", hint: "Pick up where you left" },
  { Icon: Gift, label: "Refer & Earn", to: "/account/refer", hint: "Invite friends, earn ₹100" },
  { Icon: MessageCircle, label: "Support Chat", to: "/contact", hint: "We're here for you" },
  { Icon: Truck, label: "Track Order", to: "/track-order", hint: "Real-time updates" },
];

const benefits = [
  { Icon: Sparkles, label: "Faster checkout" },
  { Icon: Gift, label: "Exclusive rewards" },
  { Icon: ShieldCheck, label: "Order protection" },
];

const phoneSchema = z.string().trim().regex(/^\+?[1-9]\d{9,14}$/, "Enter a valid phone with country code (e.g. +919876543210)");
const emailSchema = z.string().trim().email("Enter a valid email");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(72);

const Account = () => {
  const { user, isReady, signOut } = useAuth();
  const navigate = useNavigate();

  // Phone OTP state
  const [phone, setPhone] = useState("+91");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);

  // Email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMode, setEmailMode] = useState<"signin" | "signup">("signin");

  // Profile (when logged in)
  const [profileName, setProfileName] = useState<string | null>(null);
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name").eq("id", user.id).single()
      .then(({ data }) => setProfileName((data as any)?.full_name ?? null));
  }, [user]);

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/account` },
    });
    if (error) {
      toast.error(error.message);
      setBusy(false);
    }
  };

  const sendOtp = async () => {
    const parsed = phoneSchema.safeParse(phone);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ phone: parsed.data });
    setBusy(false);
    if (error) return toast.error(error.message);
    setOtpSent(true);
    toast.success("OTP sent to your phone");
  };

  const verifyOtp = async () => {
    if (otp.length < 6) return toast.error("Enter 6-digit OTP");
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome to LIVANTO ✦");
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const ep = emailSchema.safeParse(email);
    const pp = passwordSchema.safeParse(password);
    if (!ep.success) return toast.error(ep.error.issues[0].message);
    if (!pp.success) return toast.error(pp.error.issues[0].message);
    setBusy(true);
    if (emailMode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: ep.data,
        password: pp.data,
        options: { emailRedirectTo: `${window.location.origin}/account` },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Check your email to confirm your account");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: ep.data, password: pp.data });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back ✦");
    }
  };

  // ============== LOGGED IN VIEW ==============
  if (isReady && user) {
    const greet = profileName || user.email?.split("@")[0] || user.phone || "there";
    return (
      <section className="container-luxe py-8 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/40 border border-border rounded-2xl p-6 sm:p-10 mb-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-accent mb-3">✦ Member</p>
                <h1 className="font-display text-3xl sm:text-4xl leading-tight">
                  Hello, <span className="italic">{greet}</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {user.email || user.phone}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={async () => { await signOut(); toast.success("Signed out"); navigate("/"); }}>
                <LogOut className="h-4 w-4 mr-1.5" /> Sign out
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-1">✦ Your Account</p>
            <h2 className="font-display text-xl sm:text-2xl">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {quickActions.map(({ Icon, label, to, hint }) => (
              <Link key={label} to={to} className="group relative bg-card border border-border rounded-xl p-4 hover:border-accent transition-all">
                <div className="h-9 w-9 rounded-lg bg-secondary group-hover:bg-accent/10 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="h-4 w-4 text-foreground group-hover:text-accent transition-colors" strokeWidth={1.6} />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{hint}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent shrink-0 mt-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============== LOGGED OUT VIEW ==============
  return (
    <section className="container-luxe py-8 lg:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/40 border border-border rounded-2xl p-6 sm:p-10 mb-6">
          <div aria-hidden className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.32em] text-accent mb-3">✦ Member Access</p>
            <h1 className="font-display text-3xl sm:text-4xl leading-tight">
              Welcome to <span className="italic">LIVANTO</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Sign in for rewards, track orders, save addresses, and enjoy faster checkout.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {benefits.map(({ Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-[11px] bg-background/70 backdrop-blur border border-border rounded-full px-3 py-1.5">
                  <Icon className="h-3 w-3 text-accent" />{label}
                </span>
              ))}
            </div>

            <div className="mt-6 max-w-sm">
              <Button
                onClick={handleGoogle}
                disabled={busy}
                size="lg"
                variant="outline"
                className="w-full h-12 bg-background border-border hover:bg-secondary justify-center gap-3 font-medium mb-3"
              >
                <GoogleIcon className="h-4 w-4" />
                Continue with Google
              </Button>

              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="phone"><Phone className="h-3.5 w-3.5 mr-1.5" />Phone</TabsTrigger>
                  <TabsTrigger value="email"><Mail className="h-3.5 w-3.5 mr-1.5" />Email</TabsTrigger>
                </TabsList>

                <TabsContent value="phone" className="space-y-3 mt-4">
                  {!otpSent ? (
                    <>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        type="tel"
                        autoComplete="tel"
                      />
                      <Button onClick={sendOtp} disabled={busy} className="w-full h-11">
                        {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Send OTP
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground">OTP sent to {phone}</p>
                      <div className="flex justify-center">
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            {[0,1,2,3,4,5].map((i) => <InputOTPSlot key={i} index={i} />)}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <Button onClick={verifyOtp} disabled={busy} className="w-full h-11">
                        {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}Verify & Sign in
                      </Button>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp(""); }} className="w-full text-center text-xs text-muted-foreground hover:text-foreground">
                        ← Use a different number
                      </button>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="email" className="space-y-3 mt-4">
                  <form onSubmit={handleEmail} className="space-y-3">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" type="email" autoComplete="email" required />
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" autoComplete={emailMode === "signup" ? "new-password" : "current-password"} required />
                    <Button type="submit" disabled={busy} className="w-full h-11">
                      {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      {emailMode === "signup" ? "Create account" : "Sign in"}
                    </Button>
                    <button type="button" onClick={() => setEmailMode((m) => m === "signin" ? "signup" : "signin")} className="w-full text-center text-xs text-muted-foreground hover:text-foreground">
                      {emailMode === "signin" ? "New to LIVANTO? Create account" : "Already have an account? Sign in"}
                    </button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            <p className="text-[10px] text-muted-foreground mt-4 max-w-sm">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-foreground">Terms</Link>{" "}&{" "}
              <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.45c-.28 1.45-1.13 2.68-2.4 3.5v2.91h3.87c2.27-2.09 3.57-5.17 3.57-8.65z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-2.91c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09C3.25 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.38a7.21 7.21 0 0 1 0-4.76V6.53H1.27a12 12 0 0 0 0 10.94l4-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.53l4 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

export default Account;
