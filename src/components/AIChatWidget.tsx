import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "bot" | "user"; content: string; link?: { to: string; label: string } };

const QUICK_OPTIONS: { label: string; reply: string; link?: { to: string; label: string } }[] = [
  {
    label: "Track Order",
    reply: "You can track your order anytime using your Order ID and email.",
    link: { to: "/track-order", label: "Open Order Tracker" },
  },
  {
    label: "Shipping Info",
    reply:
      "We ship pan-India. Free shipping on orders above ₹499. Standard delivery: 3–7 business days.",
    link: { to: "/shipping-policy", label: "Read Shipping Policy" },
  },
  {
    label: "COD Available",
    reply:
      "Yes — Cash on Delivery is available across most pincodes in India for orders up to ₹5,000.",
  },
  {
    label: "Return Policy",
    reply:
      "Easy 7-day returns on eligible items. Products must be unused and in original packaging.",
    link: { to: "/refund-policy", label: "Read Return Policy" },
  },
  {
    label: "Best Sellers",
    reply: "Discover our most loved essentials — handpicked by thousands of happy customers.",
    link: { to: "/shop?tag=best-seller", label: "Shop Best Sellers" },
  },
  {
    label: "Contact Support",
    reply: "Our team is here for you. Reach us via the contact page or email livantoofficial@gmail.com.",
    link: { to: "/contact", label: "Contact Us" },
  },
];

const WELCOME: Msg = {
  role: "bot",
  content: "Welcome to Livanto ✨\nHow may we assist you today?",
};

export const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleQuick = (opt: (typeof QUICK_OPTIONS)[number]) => {
    setMessages((m) => [
      ...m,
      { role: "user", content: opt.label },
      { role: "bot", content: opt.reply, link: opt.link },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      {
        role: "bot",
        content:
          "Thanks for reaching out! For a quick answer, please pick an option below or contact our support team.",
        link: { to: "/contact", label: "Contact Support" },
      },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 group transition-all duration-500 ${
          open ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-accent/30 blur-xl group-hover:bg-accent/50 transition-all" />
        <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-foreground text-background shadow-luxe border border-accent/40 hover:scale-105 transition-transform">
          <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background animate-pulse" />
        </span>
      </button>

      {/* Backdrop on mobile */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Livanto AI assistant"
        className={`fixed z-50 right-0 lg:right-6 bottom-0 lg:bottom-6 w-full lg:w-[380px] max-w-full transition-all duration-500 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="mx-2 lg:mx-0 mb-2 lg:mb-0 rounded-t-2xl lg:rounded-2xl overflow-hidden bg-[hsl(40_30%_97%)] border border-foreground/10 shadow-luxe flex flex-col h-[78vh] lg:h-[560px]">
          {/* Header */}
          <div className="relative bg-foreground text-background px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-accent to-[hsl(42_70%_65%)] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-foreground" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-display text-lg leading-none tracking-[0.18em]">LIVANTO</p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-background/60 mt-1">
                  AI Concierge
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="h-8 w-8 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-line rounded-2xl ${
                    m.role === "user"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-background border border-foreground/10 text-foreground rounded-bl-sm shadow-soft"
                  }`}
                >
                  {m.content}
                  {m.link && (
                    <Link
                      to={m.link.to}
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex items-center gap-1.5 text-[12px] tracking-[0.15em] uppercase font-medium text-[hsl(43_55%_42%)] hover:text-foreground transition-colors"
                    >
                      {m.link.label}
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Quick options shown only after welcome */}
            {messages.length <= 1 && (
              <div className="pt-2">
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2.5 px-1">
                  Quick Help
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleQuick(opt)}
                      className="text-left text-[13px] px-3 py-2.5 rounded-xl bg-background border border-foreground/10 hover:border-[hsl(43_55%_42%)] hover:text-[hsl(43_55%_42%)] transition-colors font-light tracking-wide"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="border-t border-foreground/10 bg-background px-3 py-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-transparent outline-none text-[14px] px-2 placeholder:text-foreground/40"
            />
            <button
              type="submit"
              aria-label="Send"
              className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-[hsl(43_55%_42%)] transition-colors disabled:opacity-40"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </form>
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35 text-center pb-2 bg-background">
            Curated by Livanto
          </p>
        </div>
      </div>
    </>
  );
};
