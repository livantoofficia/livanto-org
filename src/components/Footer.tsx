import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground mt-16 pb-24 lg:pb-0">
    <div className="container-luxe py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-5">
        <span className="font-brand text-2xl">LIVANTO</span>
        <p className="text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
          A premium Indian lifestyle brand crafting useful, beautifully-designed
          essentials for the modern home. Made with care. Delivered with trust.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <a aria-label="Instagram" href="#" className="p-2 border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a aria-label="Facebook" href="#" className="p-2 border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a aria-label="Twitter" href="#" className="p-2 border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-5">Shop</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/70">
          <li><Link to="/shop" className="hover:text-accent">All Products</Link></li>
          <li><Link to="/shop?cat=trending" className="hover:text-accent">Trending</Link></li>
          <li><Link to="/shop?cat=kitchen" className="hover:text-accent">Kitchen</Link></li>
          <li><Link to="/shop?cat=home" className="hover:text-accent">Home</Link></li>
          <li><Link to="/shop?cat=gifts" className="hover:text-accent">Gifts</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-5">Help</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/70">
          <li><Link to="/track-order" className="hover:text-accent">Track Order</Link></li>
          <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
          <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
          <li><Link to="/shipping-policy" className="hover:text-accent">Shipping</Link></li>
          <li><Link to="/refund-policy" className="hover:text-accent">Returns</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-5">Company</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/70">
          <li><Link to="/about" className="hover:text-accent">About</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-accent">Privacy</Link></li>
          <li><Link to="/terms" className="hover:text-accent">Terms</Link></li>
          <li><a href="mailto:hello@livanto.in" className="hover:text-accent inline-flex items-center gap-1.5"><Mail className="h-3 w-3" />hello@livanto.in</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container-luxe py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
        <p>© {new Date().getFullYear()} LIVANTO. Crafted in India with care.</p>
        <p className="flex items-center gap-3">
          <span>UPI</span>·<span>Cards</span>·<span>Net Banking</span>·<span>COD</span>
        </p>
      </div>
    </div>
  </footer>
);
