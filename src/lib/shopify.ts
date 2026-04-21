// LIVANTO Shopify Storefront client — 2025-07 API
import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "uxsh3j-a6.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "721841cf0576bf86a19573c9ca7561a0";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType?: string;
    tags?: string[];
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    compareAtPriceRange?: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          compareAtPrice?: { amount: string; currencyCode: string } | null;
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
  };
}

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<{ data?: T } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description:
        "Shopify API access requires an active billing plan. Please upgrade your store.",
    });
    return;
  }

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  if (data.errors) {
    throw new Error(
      `Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }
  return data;
}

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  productType
  tags
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) { edges { node { url altText } } }
  media(first: 6) {
    edges {
      node {
        mediaContentType
        ... on Video {
          sources { url mimeType format }
          previewImage { url altText }
        }
        ... on ExternalVideo {
          host
          embedUrl
          previewImage { url altText }
        }
      }
    }
  }
  variants(first: 25) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
          availableForSale
          selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { id handle title description } }
    }
  }
`;

export async function fetchProducts(opts?: {
  first?: number;
  query?: string;
  sortKey?: "BEST_SELLING" | "CREATED_AT" | "PRICE" | "TITLE" | "RELEVANCE";
  reverse?: boolean;
}): Promise<ShopifyProduct[]> {
  const result = await storefrontApiRequest<{
    products: { edges: ShopifyProduct[] };
  }>(PRODUCTS_QUERY, {
    first: opts?.first ?? 24,
    query: opts?.query ?? null,
    sortKey: opts?.sortKey ?? "BEST_SELLING",
    reverse: opts?.reverse ?? false,
  });
  return result?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(
  handle: string
): Promise<ShopifyProduct["node"] | null> {
  const result = await storefrontApiRequest<{ product: ShopifyProduct["node"] }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return result?.data?.product ?? null;
}

/**
 * Fetch products inside a Shopify Collection by its handle.
 * Collection handles (created in Shopify Admin → Products → Collections):
 *   shop-all · new-arrivals · best-sellers · under-499 · trending-now
 *   kitchen-dining · home-essentials · personal-care · fitness-wellness
 *   car-bike · garden-balcony · electronics · trending-deals
 *   watch-shop · up-to-50-off-flash-sale · bundle-save · gifts
 */
export async function fetchProductsByCollection(
  handle: string,
  opts?: {
    first?: number;
    sortKey?: "BEST_SELLING" | "CREATED" | "PRICE" | "TITLE" | "MANUAL" | "COLLECTION_DEFAULT";
    reverse?: boolean;
  }
): Promise<ShopifyProduct[]> {
  const result = await storefrontApiRequest<{
    collection: { products: { edges: ShopifyProduct[] } } | null;
  }>(COLLECTION_PRODUCTS_QUERY, {
    handle,
    first: opts?.first ?? 12,
    sortKey: opts?.sortKey ?? "COLLECTION_DEFAULT",
    reverse: opts?.reverse ?? false,
  });
  return result?.data?.collection?.products?.edges ?? [];
}

export async function fetchCollections(first = 50) {
  const result = await storefrontApiRequest<{
    collections: { edges: Array<{ node: { id: string; handle: string; title: string; description: string } }> };
  }>(COLLECTIONS_QUERY, { first });
  return result?.data?.collections?.edges?.map((e) => e.node) ?? [];
}

export function formatPrice(amount: string | number, currencyCode = "INR") {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (currencyCode === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(value);
}
