import React from "react";
import { Link } from "wouter";
import { Logo } from "./ui/logo";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-12 sm:pt-16 pb-6 sm:pb-8 responsive-px">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-cream/70 mb-6">
              Tactical and strategic defense systems engineered for mission-critical environments.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-cream hover:text-teal transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-cream hover:text-teal transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="mailto:contact@trinethra-defentech.com" 
                className="text-cream hover:text-teal transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-condensed font-bold mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/solutions" className="text-cream/70 hover:text-cream transition-colors">
                  Edge AI Systems
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-cream/70 hover:text-cream transition-colors">
                  Rugged Data Storage
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-cream/70 hover:text-cream transition-colors">
                  Tactical Network Switches
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-cream/70 hover:text-cream transition-colors">
                  Custom Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-condensed font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-cream/70 hover:text-cream transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-cream/70 hover:text-cream transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-cream/70 hover:text-cream transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-condensed font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  White Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  Technical Specifications
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-cream transition-colors">
                  Compliance Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-cream/60 text-sm">
          <div>© {new Date().getFullYear()} TRINETHRA DEFENTECH. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cream transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
