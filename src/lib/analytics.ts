/**
 * Lightweight analytics layer.
 * - Reads measurement IDs from VITE_GA_MEASUREMENT_ID and VITE_META_PIXEL_ID at build time.
 * - Falls back to no-op if not configured (zero impact on dev / pre-launch).
 * - Loaded async, never blocks first paint.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function initAnalytics() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  // GA4
  if (GA_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: true });
  }

  // Meta Pixel
  if (META_PIXEL_ID) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq?.("init", META_PIXEL_ID);
    window.fbq?.("track", "PageView");
  }
}

/** Track a SPA route change (call on every location change). */
export function trackPageView(path: string) {
  if (GA_ID && window.gtag) {
    window.gtag("event", "page_view", { page_path: path });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "PageView");
  }
}

/** Track product view (PDP). */
export function trackViewContent(args: {
  id: string;
  name: string;
  price: number;
  currency: string;
}) {
  if (GA_ID && window.gtag) {
    window.gtag("event", "view_item", {
      currency: args.currency,
      value: args.price,
      items: [{ item_id: args.id, item_name: args.name, price: args.price }],
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_ids: [args.id],
      content_name: args.name,
      content_type: "product",
      value: args.price,
      currency: args.currency,
    });
  }
}

/** Track add to cart. */
export function trackAddToCart(args: {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity?: number;
}) {
  const qty = args.quantity ?? 1;
  if (GA_ID && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: args.currency,
      value: args.price * qty,
      items: [
        {
          item_id: args.id,
          item_name: args.name,
          price: args.price,
          quantity: qty,
        },
      ],
    });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_ids: [args.id],
      content_name: args.name,
      content_type: "product",
      value: args.price * qty,
      currency: args.currency,
    });
  }
}

/** Track checkout start. */
export function trackBeginCheckout(value: number, currency: string) {
  if (GA_ID && window.gtag) {
    window.gtag("event", "begin_checkout", { currency, value });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "InitiateCheckout", { value, currency });
  }
}
