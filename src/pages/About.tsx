import { StaticPage } from "@/components/StaticPage";
import { SEO } from "@/components/SEO";

const About = () => (
  <>
    <SEO
      title="About LIVANTO — India's Premium Lifestyle Brand"
      description="Discover the LIVANTO story — a premium lifestyle brand curating beautifully designed kitchen, home and wellness essentials for modern Indian homes."
      canonical="/about"
    />
    <StaticPage
      eyebrow="Our Story"
      title="Living, beautifully."
      intro="LIVANTO is a premium lifestyle brand built for the modern Indian home — curating useful, beautifully-designed essentials at honest prices."
    >
    <h2>Why we exist</h2>
    <p>
      We started LIVANTO because shopping in India deserved better. Better
      design, better quality, better service — without paying luxury markups.
    </p>
    <h2>What we believe</h2>
    <ul>
      <li>Premium doesn't mean expensive — it means thoughtful.</li>
      <li>Indian customers deserve a world-class experience.</li>
      <li>Every product should solve a real, daily problem.</li>
      <li>Trust is earned through transparency and care.</li>
    </ul>
    <h2>The promise</h2>
    <p>
      Free shipping ₹499+. Cash on Delivery on most pin codes. Easy 7-day
      returns. WhatsApp support, always. We're building a brand for the long
      term — one happy customer at a time.
      </p>
    </StaticPage>
  </>
);
export default About;
