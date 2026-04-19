import { useEffect, useState } from "react";

const messages = [
  "✦ Free shipping on all orders ₹499+",
  "Cash on Delivery available across India",
  "✦ Easy 7-day no-questions returns",
  "Limited time deals — use code LIVANTO10 for 10% off",
];

export const AnnouncementBar = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground text-[11px] sm:text-xs">
      <div className="container-luxe flex items-center justify-center py-2 h-8 overflow-hidden relative">
        {messages.map((m, idx) => (
          <span
            key={idx}
            className="absolute inset-0 flex items-center justify-center px-4 text-center transition-all duration-700"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "translateY(0)" : "translateY(8px)",
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
};
