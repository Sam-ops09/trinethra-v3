// Enhanced SEO utilities for the application

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  pageType?: 'home' | 'about' | 'solutions' | 'solution' | 'certifications' | 'contact';
  solutionName?: string;
  solutionCategory?: string;
  applicationAreas?: string[];
}

export const DEFAULT_SEO = {
  title: 'TRINETHRA DEFENTECH | Advanced Defense Technology Systems',
  description: 'Leading provider of advanced defense technology, Edge AI systems, military-grade rugged data storage and secure tactical network switches. Engineered for mission-critical environments.',
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
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: ['English']
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'India'
    },
    brand: {
      '@type': 'Brand',
      name: 'TRINETHRA DEFENTECH',
      logo: `${seo.canonicalUrl}/logo.png`
    }
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

  // Product structured data for solution pages
  let productJsonLd = null;
  if (props.pageType === 'solution' && props.solutionName) {
    productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: props.solutionName,
      description: seo.description,
      brand: {
        '@type': 'Brand',
        name: 'TRINETHRA DEFENTECH'
      },
      category: props.solutionCategory || 'Defense Technology',
      manufacturer: {
        '@type': 'Organization',
        name: 'TRINETHRA DEFENTECH'
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
        priceCurrency: 'USD',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        url: seo.canonicalUrl + '/contact'
      }
    };
  }

  // Service structured data for solutions pages
  let serviceJsonLd = null;
  if (props.pageType === 'solutions') {
    serviceJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Defense Technology Solutions',
      provider: {
        '@type': 'Organization',
        name: 'TRINETHRA DEFENTECH'
      },
      description: seo.description,
      areaServed: 'Worldwide',
      audience: {
        '@type': 'Audience',
        audienceType: 'Defense and Security Organizations'
      }
    };
  }
  
  // Breadcrumbs for SEO
  let breadcrumbJsonLd = null;
  if (props.pageType && props.pageType !== 'home') {
    let breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seo.canonicalUrl
      }
    ];
    
    if (props.pageType === 'solution' && props.solutionName) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Solutions',
        item: `${seo.canonicalUrl}/solutions`
      });
      
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: props.solutionName,
        item: `${seo.canonicalUrl}/solutions/${props.solutionName.toLowerCase().replace(/\s+/g, '-')}`
      });
    } else {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: props.pageType.charAt(0).toUpperCase() + props.pageType.slice(1),
        item: `${seo.canonicalUrl}/${props.pageType.toLowerCase()}`
      });
    }
    
    breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };
  }
  
  // Create JSON-LD data with proper typing
  interface JsonLdData {
    organization: string;
    website: string;
    product?: string;
    service?: string;
    breadcrumb?: string;
    [key: string]: string | undefined;
  }
  
  const jsonLdData: JsonLdData = {
    organization: JSON.stringify(organizationJsonLd),
    website: JSON.stringify(websiteJsonLd)
  };
  
  if (productJsonLd) {
    jsonLdData.product = JSON.stringify(productJsonLd);
  }
  
  if (serviceJsonLd) {
    jsonLdData.service = JSON.stringify(serviceJsonLd);
  }
  
  if (breadcrumbJsonLd) {
    jsonLdData.breadcrumb = JSON.stringify(breadcrumbJsonLd);
  }
  
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
    jsonLd: jsonLdData
  };
}
