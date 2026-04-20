import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "product" | "article";
  /** Optional JSON-LD structured data object */
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

const DEFAULT_IMAGE = "/og-livanto.jpg";
const SITE_URL = "https://livanto.in";

export const SEO = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
  noindex,
}: Props) => {
  const fullTitle = title.includes("LIVANTO") ? title : `${title} | LIVANTO`;
  const url = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical}`
    : typeof window !== "undefined"
    ? window.location.href
    : SITE_URL;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description.slice(0, 160)} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description.slice(0, 200)} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="LIVANTO" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description.slice(0, 200)} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};
