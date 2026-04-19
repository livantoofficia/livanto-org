import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => (
  <a
    href="https://wa.me/919999999999?text=Hi%20LIVANTO%2C%20I%20need%20help"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-30 bg-trust text-trust-foreground rounded-full p-3.5 shadow-luxe hover:scale-110 transition-transform"
  >
    <MessageCircle className="h-5 w-5" />
  </a>
);
