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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal focus:text-white focus:font-medium focus:text-sm">
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <motion.main
              id="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
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