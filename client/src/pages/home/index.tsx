import React from 'react';
import { Layout } from '@/components/Layout';
import { HomeHero } from './sections/HomeHero';
import { HomeSolutions } from './sections/HomeSolutions';
import { HomeCapabilities } from './sections/HomeCapabilities';
import { HomeProcess } from './sections/HomeProcess';
import { HomeAssurance } from './sections/HomeAssurance';
import { HomeCTA } from './sections/HomeCTA';
import { TrustedPartners } from '@/components/TrustedPartners';
import {
  homeSeo,
  homeStructuredData,
  partners
} from '@/content/home';

export default function HomePage() {
  return (
    <Layout
      title={homeSeo.title}
      description={homeSeo.description}
      ogType={homeSeo.ogType}
      keywords={homeSeo.keywords}
      structuredData={JSON.stringify(homeStructuredData)}
    >
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HomeHero />
        
        {/* Solutions Section */}
        <HomeSolutions />
        
        {/* Capabilities Section */}
        <HomeCapabilities />
        
        {/* Partners Section */}
        <TrustedPartners
          partners={partners}
          heading="Strategic Partners"
          description="Collaborating with leading defense organizations"
        />
        
        {/* Process Section */}
        <HomeProcess />
        
        {/* Assurance Section */}
        <HomeAssurance />
        
        {/* CTA Section */}
        <HomeCTA />
      </div>
    </Layout>
  );
}