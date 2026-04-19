import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Facebook } from "lucide-react";
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
          <ContactCard Icon={Mail} title="Email" body="livantoofficial@gmail.com" link="mailto:livantoofficial@gmail.com" linkLabel="Send an email →" />
          <ContactCard Icon={Phone} title="Phone" body="+91 99999 99999" link="tel:+919999999999" linkLabel="Call now →" />
          <ContactCard Icon={MapPin} title="Address" body="Mumbai, Maharashtra, India" />

          <div className="border border-border p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Follow us</p>
            <div className="flex items-center gap-3">
              <a aria-label="Instagram" href="https://www.instagram.com/shoplivanto?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noopener noreferrer" className="p-2.5 border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a aria-label="Facebook" href="https://www.facebook.com/shoplivanto" target="_blank" rel="noopener noreferrer" className="p-2.5 border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a aria-label="Pinterest" href="https://pin.it/ifDiRH2EL" target="_blank" rel="noopener noreferrer" className="p-2.5 border border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>
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
