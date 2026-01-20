import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, type = 'website', date, image, jsonLd }) {
  const siteName = 'Güneyyurt Belediyesi';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || 'Güneyyurt Belediyesi Resmi Web Sitesi. Haberler, duyurular, projeler ve e-belediye hizmetleri.';

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={window.location.href} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={window.location.href} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content={siteName} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || {
          "@context": "https://schema.org",
          "@type": "GovernmentOrganization",
          "name": "Güneyyurt Belediyesi",
          "alternateName": "Güneyyurt Municipality",
          "url": "https://www.guneyyurt.bel.tr",
          "logo": "https://www.guneyyurt.bel.tr/belediye-logo.png",
          "image": image || "https://www.guneyyurt.bel.tr/belediye-logo.png",
          "description": description || "Güneyyurt Belediyesi Resmi Web Portalı. Şeffaf yönetim, dijital belediyecilik ve halkın hizmetinde.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Belediye Cd. No:1",
            "addressLocality": "Güneyyurt / Ermenek",
            "addressRegion": "Karaman",
            "postalCode": "70410",
            "addressCountry": "TR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-338-736-80-04",
            "contactType": "customer service",
            "areaServed": "TR",
            "availableLanguage": "Turkish"
          },
          "sameAs": [
            "https://facebook.com/guneyyurtbelediyesi",
            "https://twitter.com/guneyyurt",
            "https://instagram.com/guneyyurtbelediyesi"
          ]
        })}
      </script>
    </Helmet>
  );
}
