import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContactForm } from "./ContactForm";
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
                         description = "Leading provider of military-grade Edge AI systems, rugged data storage, and tactical network switches for defense and security operations.",
                         canonicalUrl,
                         ogImage,
                         ogType,
                         twitterCard,
                         keywords,
                         imageAlt,
                         structuredData,
                         pageType,
                         solutionName,
                         solutionCategory,
                         applicationAreas,
                         withContact = true
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
        <div className="flex flex-col min-h-screen">
          <Header />
          <motion.main
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
