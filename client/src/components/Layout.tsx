import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { motion } from "framer-motion";
import Head from "@/components/Head";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string;
  imageAlt?: string;
  structuredData?: string;
  pageType?: 'home' | 'about' | 'solutions' | 'solution' | 'certifications' | 'contact';
  solutionName?: string;
  solutionCategory?: string;
  applicationAreas?: string[];
  withContact?: boolean;
}

export function Layout({
                         children,
                         title = "TRINETHRA DEFENTECH | Advanced Defense Technology Systems",
                         description = "Leading provider of military-grade cable harness systems, rugged storage solutions, edge server compute platforms, and panel PCs for defense and security operations.",
                         canonicalUrl,
                         ogImage,
                         ogType,
                         twitterCard,
                         keywords,
                         imageAlt,
                         structuredData,
                         pageType: _pageType,
                         solutionName: _solutionName,
                         solutionCategory: _solutionCategory,
                         applicationAreas: _applicationAreas,
                         withContact: _withContact = true
                       }: LayoutProps) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);

  return (
      <>
        <Head
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            ogType={ogType}
            twitterCard={twitterCard}
            keywords={keywords}
            imageAlt={imageAlt}
            structuredData={structuredData}
        />
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="flex flex-col min-h-screen">
          <Header />
          <motion.main
              id="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex-grow"
          >
            {children}
            {/*{withContact && <ContactForm />}*/}
          </motion.main>
          <Footer />
        </div>
      </>
  );
}