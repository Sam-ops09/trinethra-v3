import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaMicrochip,
  FaDatabase,
  FaNetworkWired,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaDesktop
} from "react-icons/fa";
import { TrustedPartners } from "@/components/TrustedPartners";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const trustedPartners = [
    "ADE-DRDO", "CABS-DRDO", "GTRE-DRDO",
    "MTRDC-DRDO", "HAL", "ISRO"
  ];

  // Enhanced SEO for home page with structured data
  const homePageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TRINETHRA DEFENTECH - Advanced Defense Technology Solutions',
    description: 'Leading provider of military-grade defense technology including cable harness systems, rugged storage solutions, edge server platforms, and panel PCs for defense and security operations.',
    keywords: 'TRINETHRA DEFENTECH, defense technology, cable harness, storage solutions, edge server, panel pc, military systems, tactical equipment',
    inLanguage: 'en-US',
    mainEntity: {
      '@type': 'Organization',
      name: 'TRINETHRA DEFENTECH',
      url: 'https://trinethra-defentech.com',
      logo: 'https://trinethra-defentech.com/logo.png',
      description: 'Premier provider of advanced defense technology solutions engineered for mission-critical environments.',
      sameAs: [
        'https://linkedin.com/company/trinethra-defentech',
        'https://twitter.com/trinethra_def'
      ]
    }
  };

  return (
      <Layout
          title="TRINETHRA DEFENTECH | Advanced Defense Technology Solutions"
          description="Leading provider of military-grade cable harness systems, rugged storage solutions, edge server compute platforms, and panel PCs for defense and security operations. Engineered for mission-critical environments."
          ogType="website"
          keywords="TRINETHRA DEFENTECH, defense technology, cable harness, storage solutions, edge server, panel pc, defense-grade hardware"
          structuredData={JSON.stringify(homePageStructuredData)}
      >
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 md:pt-40 lg:pt-28 pb-16 md:pb-24 lg:pb-28 relative" aria-label="Hero">
          <HeroCarousel />
          <div className="section-container px-4 sm:px-6 md:px-8 mt-10 md:mt-14">
            <motion.div
                className="max-w-4xl"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
              <motion.h1
                  className="heading-clamp-1 font-condensed font-bold tracking-wide mb-4 text-[#0D4114] text-balance"
                  variants={fadeInUp}
              >
                TRINETHRA DEFENTECH
              </motion.h1>
              <motion.p
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-6 md:mb-8 text-[#0D4114] text-balance max-w-3xl"
                  variants={fadeInUp}
              >
                Tactical and strategic defense systems engineered for mission-critical environments
              </motion.p>
              <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
              >
                <Link href="/contact">
                  <Button
                      className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-8 rounded shadow-lg transition-all duration-300 inline-flex items-center justify-center focus-ring"
                  >
                    Request Consultation <FaArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button
                      variant="outline"
                      className="bg-transparent hover:bg-[#0D4114] border-2 border-[#0D4114] text-[#0D4114] font-bold py-3 px-8 rounded transition-all duration-300 inline-flex items-center justify-center focus-ring"
                  >
                    Explore Solutions
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-white section-spacing" aria-labelledby="mission-critical-heading">
          <div className="section-container px-4 sm:px-6 md:px-8">
            <motion.div
                className="max-w-3xl mx-auto text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
            >
              <h2 id="mission-critical-heading" className="heading-clamp-2 font-condensed font-bold mb-6 text-navy text-balance">Mission-Critical Performance</h2>
              <p className="text-lg text-charcoal/80 text-balance">
                We guarantee that our solutions meet your shock, vibration, EMI, power, and environmental specifications,
                delivering reliable performance in the most challenging operational conditions.
              </p>
            </motion.div>

            {/* Defense Capabilities Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 mt-6 md:mt-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
            >
              {/* Card 1: Cable Harness */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full focus-within:ring-2 focus-within:ring-teal">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <FaNetworkWired className="text-2xl text-forest" />
                    </div>
                    <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Cable Harness</h3>
                    <p className="text-charcoal/80 mb-4 flex-grow text-balance">
                      Rugged interconnect and signal distribution assemblies enabling reliable data & power routing across harsh tactical platforms.
                    </p>
                    <div className="flex mt-auto">
                      <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">MIL-STD-461</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2: Storage Solutions */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <FaDatabase className="text-2xl text-forest" />
                    </div>
                    <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Storage Solutions</h3>
                    <p className="text-charcoal/80 mb-4 flex-grow text-balance">
                      Secure, high-capacity removable and fixed storage systems with hardware encryption engineered for extreme environments.
                    </p>
                    <div className="flex mt-auto">
                      <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">FIPS 140-2</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3: Server */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <FaMicrochip className="text-2xl text-forest" />
                    </div>
                    <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Server</h3>
                    <p className="text-charcoal/80 mb-4 flex-grow text-balance">
                      Edge-ready compute platforms delivering low-latency AI inference, secure processing and modular I/O for autonomous and ISR workloads.
                    </p>
                    <div className="flex mt-auto">
                      <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">MIL-STD-810</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 4: Panel PC */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      <FaDesktop className="text-2xl text-forest" />
                    </div>
                    <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Panel PC</h3>
                    <p className="text-charcoal/80 mb-4 flex-grow text-balance">
                      Rugged operator interface terminals with sunlight-readable sealed displays for vehicle and command environments.
                    </p>
                    <div className="flex mt-auto">
                      <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">IP65</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted Partners Section (refactored) */}
        <TrustedPartners
          partners={trustedPartners}
          cta={(
            <Link href="/about">
              <Button variant="outline" className="bg-white hover:bg-teal/5 border-2 border-teal/20 text-navy focus-ring">
                Learn More About Our Partnerships <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          )}
        />
      </Layout>
  );
}
