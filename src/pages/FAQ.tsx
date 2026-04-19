import { StaticPage } from "@/components/StaticPage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available on most pin codes across India." },
  { q: "How long does delivery take?", a: "Standard delivery is 3-5 business days. You'll receive tracking via SMS and email." },
  { q: "What is your return policy?", a: "Easy 7-day returns from date of delivery on most products. Some hygiene items are non-returnable." },
  { q: "Is shipping really free?", a: "Yes, free standard shipping on all orders above ₹499. Below that, a small flat ₹49 fee applies." },
  { q: "How do I track my order?", a: "Visit our Track Order page with your order ID and registered phone number." },
  { q: "Can I cancel my order?", a: "Yes, you can cancel any order before it ships. Once shipped, you can return after delivery." },
  { q: "Are products genuine?", a: "Absolutely. Every product is sourced from verified suppliers and quality-tested before dispatch." },
  { q: "How do I use a coupon?", a: "Apply your coupon code in the checkout cart — discount appears instantly." },
];

const FAQ = () => (
  <StaticPage eyebrow="Help Center" title="Frequently Asked Questions" intro="Everything you need to know. Can't find an answer? Message us on WhatsApp.">
    <Accordion type="single" collapsible className="not-prose">
      {FAQS.map((f, i) => (
        <AccordionItem key={i} value={`f${i}`}>
          <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </StaticPage>
);
export default FAQ;
