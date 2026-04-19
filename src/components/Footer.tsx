import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Instagram, Facebook, Mail } from "lucide-react";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/shoplivanto",
  instagram: "https://www.instagram.com/shoplivanto?igsh=YzljYTk1ODg3Zg==",
  pinterest: "https://pin.it/ifDiRH2EL",
};
const CONTACT_EMAIL = "livantoofficial@gmail.com";

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

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
          <a aria-label="Instagram" href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a aria-label="Facebook" href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
            <Facebook className="h-4 w-4" />
          </a>
          <a aria-label="Pinterest" href={SOCIAL_LINKS.pinterest} target="_blank" rel="noopener noreferrer" className="p-2 border border-primary-foreground/20 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors">
            <PinterestIcon className="h-4 w-4" />
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
