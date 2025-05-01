import React from "react";
import { generateSEO } from "@/lib/seo";

interface HeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string;
  imageAlt?: string;
  structuredData?: string;
}

export default function Head({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType,
  twitterCard,
  keywords = "defense technology, military equipment, edge ai, tactical systems, rugged switches, secure storage, defense-grade solutions",
  imageAlt = "TRINETHRA DEFENTECH military and defense technology",
  structuredData
}: HeadProps) {
  const seo = generateSEO({
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    twitterCard
  });

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.openGraph.url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.openGraph.type} />
      <meta property="og:title" content={seo.openGraph.title} />
      <meta property="og:description" content={seo.openGraph.description} />
      <meta property="og:url" content={seo.openGraph.url} />
      {seo.openGraph.images && seo.openGraph.images[0]?.url && (
        <>
          <meta property="og:image" content={seo.openGraph.images[0].url} />
          <meta property="og:image:alt" content={imageAlt} />
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitter.cardType} />
      <meta name="twitter:title" content={seo.twitter.title} />
      <meta name="twitter:description" content={seo.twitter.description} />
      {seo.openGraph.images && seo.openGraph.images[0]?.url && (
        <>
          <meta name="twitter:image" content={seo.openGraph.images[0].url} />
          <meta name="twitter:image:alt" content={imageAlt} />
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: structuredData || seo.jsonLd.organization 
        }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: seo.jsonLd.website 
        }} 
      />
    </>
  );
}
