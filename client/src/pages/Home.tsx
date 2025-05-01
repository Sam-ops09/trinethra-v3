import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FaMicrochip, 
  FaDatabase, 
  FaNetworkWired, 
  FaArrowRight 
} from "react-icons/fa";

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

  return (
    <Layout
      title="TRINETHRA DEFENTECH | Tactical and Strategic Defense Systems"
      description="Advanced defense systems engineered for mission-critical environments. Providing Edge AI, Rugged Data Storage, and Military-Grade Equipment."
    >
      {/* Hero Section */}
      <section className="hero-pattern pt-28 pb-16 sm:pt-32 md:pt-40 lg:pt-48 md:pb-24 lg:pb-32 responsive-px">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-forest to-navy opacity-90"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-condensed font-bold tracking-wide mb-4"
              variants={fadeInUp}
            >
              TRINETHRA DEFENTECH
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl font-medium mb-6 md:mb-8 text-cream/90"
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
                  className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-8 rounded shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                >
                  Request Consultation <FaArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-cream/10 border-2 border-cream text-cream font-bold py-3 px-8 rounded transition-all duration-300 inline-flex items-center justify-center"
                >
                  Explore Solutions
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 responsive-px">
        <div className="container mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-condensed font-bold mb-6 text-navy">Mission-Critical Performance</h2>
            <p className="text-lg text-charcoal/80">
              We guarantee that our solutions meet your shock, vibration, EMI, power, and environmental specifications, 
              delivering reliable performance in the most challenging operational conditions.
            </p>
          </motion.div>
          
          {/* Defense Capabilities Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Card 1 */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full">
                <CardContent className="p-0">
                  <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <FaMicrochip className="text-2xl text-forest" />
                  </div>
                  <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Edge Artificial Intelligence</h3>
                  <p className="text-charcoal/80 mb-4">
                    Advanced systems designed to detect, intercept, and counter enemy electronic signals 
                    in real-time without reliance on cloud connectivity.
                  </p>
                  <div className="flex mt-auto">
                    <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">
                      MIL-STD-810
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full">
                <CardContent className="p-0">
                  <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <FaDatabase className="text-2xl text-forest" />
                  </div>
                  <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Rugged Data Storage</h3>
                  <p className="text-charcoal/80 mb-4">
                    Encrypted communication networks resistant to jamming and interception, 
                    with multi-layer security protocols for classified data protection.
                  </p>
                  <div className="flex mt-auto">
                    <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">
                      FIPS 140-2
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white border border-gray-200 rounded-lg shadow-md p-6 card-hover h-full">
                <CardContent className="p-0">
                  <div className="bg-forest/10 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <FaNetworkWired className="text-2xl text-forest" />
                  </div>
                  <h3 className="text-xl font-condensed font-bold mb-3 text-navy">Rugged Switches</h3>
                  <p className="text-charcoal/80 mb-4">
                    Field-ready equipment designed to withstand extreme operational environments 
                    including temperature extremes, humidity, and high-impact events.
                  </p>
                  <div className="flex mt-auto">
                    <span className="text-sm font-medium bg-forest/10 text-forest px-3 py-1 rounded-full">
                      MIL-STD-461
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto">
          <motion.h2 
            className="text-2xl font-condensed font-bold text-center mb-12 text-navy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Trusted By
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trustedPartners.map((partner, index) => (
              <motion.div 
                key={index}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                variants={fadeInUp}
              >
                <div className="font-condensed font-bold text-lg text-charcoal">{partner}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
