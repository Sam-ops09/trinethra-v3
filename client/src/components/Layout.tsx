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
  withContact?: boolean;
}

export function Layout({
  children,
  title = "TRINETHRA DEFENTECH | Tactical and Strategic Defense Systems",
  description = "Advanced defense systems engineered for mission-critical environments. Providing Edge AI, Rugged Data Storage, and Military-Grade Equipment.",
  withContact = true
}: LayoutProps) {
  return (
    <>
      <Head title={title} description={description} />
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
          {withContact && <ContactForm />}
        </motion.main>
        <Footer />
      </div>
    </>
  );
}
