import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 2) return toast.error("Please enter your name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Please enter a valid email");
    if (message.length < 10) return toast.error("Please write a message");
    toast.success("Message sent ✦", {
      description: "We'll get back to you within 24 hours.",
    });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <section className="container-luxe py-12 lg:py-20">
      <div className="text-center mb-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent mb-3">✦ We're here to help</p>
        <h1 className="font-display text-4xl lg:text-5xl">Contact Us</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="space-y-6">
          <ContactCard Icon={MessageCircle} title="WhatsApp Support" body="Fastest way to reach us — 9am to 9pm IST" link="https://wa.me/919999999999" linkLabel="Chat with us →" />
          <ContactCard Icon={Mail} title="Email" body="hello@livanto.in" link="mailto:hello@livanto.in" linkLabel="Send an email →" />
          <ContactCard Icon={Phone} title="Phone" body="+91 99999 99999" link="tel:+919999999999" linkLabel="Call now →" />
          <ContactCard Icon={MapPin} title="Address" body="Mumbai, Maharashtra, India" />
        </div>

        <form onSubmit={submit} className="bg-secondary/50 p-6 sm:p-8 space-y-4">
          <h2 className="font-display text-2xl">Send a message</h2>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={100} className="h-12 bg-background" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" maxLength={255} className="h-12 bg-background" />
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help you?" rows={5} maxLength={1000} className="bg-background" />
          <Button type="submit" className="w-full h-12 bg-primary">Send message</Button>
        </form>
      </div>
    </section>
  );
};

const ContactCard = ({ Icon, title, body, link, linkLabel }: any) => (
  <div className="border border-border p-6 flex gap-4">
    <Icon className="h-6 w-6 text-accent flex-shrink-0" strokeWidth={1.4} />
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{body}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent uppercase tracking-wider mt-2 inline-block hover:underline">
          {linkLabel}
        </a>
      )}
    </div>
  </div>
);

export default Contact;
