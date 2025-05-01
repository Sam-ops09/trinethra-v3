// SEO utilities for the application

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

export const DEFAULT_SEO = {
  title: 'TRINETHRA DEFENTECH | Tactical and Strategic Defense Systems',
  description: 'Advanced defense systems engineered for mission-critical environments. Providing Edge AI, Rugged Data Storage, and Military-Grade Equipment.',
  canonicalUrl: 'https://trinethra-defentech.com',
  ogImage: 'https://trinethra-defentech.com/og-image.jpg',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
};

export function generateSEO(props: SEOProps = {}) {
  const seo = { ...DEFAULT_SEO, ...props };
  
  // Create a structured data JSON-LD object for Organization
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TRINETHRA DEFENTECH',
    url: seo.canonicalUrl,
    logo: `${seo.canonicalUrl}/logo.png`,
    description: seo.description,
    sameAs: [
      'https://linkedin.com/company/trinethra-defentech',
      'https://twitter.com/trinethra_def'
    ]
  };
  
  // Create a structured data JSON-LD object for WebSite
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TRINETHRA DEFENTECH',
    url: seo.canonicalUrl,
    potentialAction: {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${seo.canonicalUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
  
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      type: seo.ogType,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      cardType: seo.twitterCard,
      title: seo.title,
      description: seo.description,
    },
    jsonLd: {
      organization: JSON.stringify(organizationJsonLd),
      website: JSON.stringify(websiteJsonLd),
    }
  };
}
