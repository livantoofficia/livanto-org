import { StaticPage } from "@/components/StaticPage";

export const PrivacyPolicy = () => (
  <StaticPage eyebrow="Legal" title="Privacy Policy" intro="Last updated: January 2026">
    <h2>Information we collect</h2>
    <p>We collect information you provide (name, address, phone, email) and order data to fulfil your orders and improve your experience.</p>
    <h2>How we use it</h2>
    <ul>
      <li>To process and deliver your orders</li>
      <li>To send order updates and important communications</li>
      <li>To improve our products and service</li>
      <li>To send marketing emails (opt-in only)</li>
    </ul>
    <h2>Sharing</h2>
    <p>We never sell your data. We share only with logistics, payment, and analytics partners necessary to operate the service.</p>
    <h2>Your rights</h2>
    <p>You can request deletion of your account and data at any time by emailing privacy@livanto.in.</p>
  </StaticPage>
);

export const RefundPolicy = () => (
  <StaticPage eyebrow="Legal" title="Refund & Return Policy" intro="Easy returns within 7 days of delivery">
    <h2>Eligibility</h2>
    <ul>
      <li>Items must be unused, in original packaging</li>
      <li>Return request raised within 7 days of delivery</li>
      <li>Hygiene/personal-care products are non-returnable for safety reasons</li>
    </ul>
    <h2>Refund timeline</h2>
    <p>Refunds are processed within 5-7 business days after we receive the returned item. The amount will reflect in your original payment method or LIVANTO wallet.</p>
    <h2>Damaged or wrong items</h2>
    <p>If you receive a damaged or incorrect item, message us on WhatsApp within 48 hours with photos and we'll arrange a free replacement or full refund.</p>
  </StaticPage>
);

export const ShippingPolicy = () => (
  <StaticPage eyebrow="Legal" title="Shipping Policy" intro="We deliver across India with care.">
    <h2>Shipping fees</h2>
    <ul>
      <li>Free standard shipping on orders ₹499 and above</li>
      <li>Flat ₹49 shipping for orders below ₹499</li>
    </ul>
    <h2>Delivery time</h2>
    <p>Standard delivery: 3-5 business days for most pin codes. Remote areas may take 5-8 days.</p>
    <h2>Order tracking</h2>
    <p>You'll receive a tracking link via SMS and email once your order ships. You can also track on our Track Order page.</p>
    <h2>Cash on Delivery</h2>
    <p>COD is available on orders up to ₹5,000 across most pin codes in India.</p>
  </StaticPage>
);

export const Terms = () => (
  <StaticPage eyebrow="Legal" title="Terms & Conditions" intro="By using LIVANTO, you agree to the following terms.">
    <h2>Use of the website</h2>
    <p>You agree to use this website for lawful purposes only and not to misuse our services in any way.</p>
    <h2>Pricing & availability</h2>
    <p>Prices and availability are subject to change without notice. We reserve the right to refuse or cancel any order.</p>
    <h2>Limitation of liability</h2>
    <p>LIVANTO is not liable for indirect or consequential damages arising from use of our products beyond the purchase value.</p>
    <h2>Governing law</h2>
    <p>These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of Mumbai courts.</p>
  </StaticPage>
);
