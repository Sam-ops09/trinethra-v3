import React, { useState } from "react";
import { Link } from "wouter";
import { Logo } from "./ui/logo";
import { FaLinkedin, FaTwitter, FaEnvelope, FaPlus, FaMinus } from "react-icons/fa";
import { MadeInIndia } from "./ui/made-in-india";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function MobileCollapsible({ title, children }: FooterSectionProps) {
  const [open, setOpen] = useState(false);
  return (
      <div className="md:hidden border-b border-cream/20 py-3 last:border-b-0">
        <button
            className="w-full flex items-center justify-between text-left focus-ring"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
        >
          <span className="text-base font-condensed font-bold">{title}</span>
          <span className="text-cream/70 ml-4" aria-hidden>
            {open ? <FaMinus /> : <FaPlus />}
          </span>
        </button>
        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'} overflow-hidden`}>
          <div className="min-h-0">{children}</div>
        </div>
      </div>
  );
}

export function Footer() {
  return (
      <footer className="bg-forest text-cream mt-auto" role="contentinfo">
        <div className="section-container px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-cream/70 mb-6 text-balance">
                Tactical and strategic defense systems engineered for mission-critical environments.
              </p>
              <div className="flex space-x-4">
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream hover:text-teal transition-colors focus-ring"
                    aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream hover:text-teal transition-colors focus-ring"
                    aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                    href="mailto:contact@trinethra-defentech.com"
                    className="text-cream hover:text-teal transition-colors focus-ring"
                    aria-label="Email"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
              <div className="mt-6"><MadeInIndia /></div>
            </div>

            <div>
              <h3 className="text-lg font-condensed font-bold mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li><Link href="/solutions/cable-harness" className="text-cream/70 hover:text-cream transition-colors focus-ring">Cable Harness</Link></li>
                <li><Link href="/solutions/storage-solutions" className="text-cream/70 hover:text-cream transition-colors focus-ring">Storage Solutions</Link></li>
                <li><Link href="/solutions/server" className="text-cream/70 hover:text-cream transition-colors focus-ring">Server</Link></li>
                <li><Link href="/solutions/panel-pc" className="text-cream/70 hover:text-cream transition-colors focus-ring">Panel PC</Link></li>
                <li><Link href="/contact" className="text-cream/70 hover:text-cream transition-colors focus-ring">Custom Solutions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-condensed font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-cream/70 hover:text-cream transition-colors focus-ring">About Us</Link></li>
                <li><Link href="/certifications" className="text-cream/70 hover:text-cream transition-colors focus-ring">Certifications</Link></li>
                <li><a href="#" className="text-cream/70 hover:text-cream transition-colors focus-ring">Careers</a></li>
                <li><Link href="/contact" className="text-cream/70 hover:text-cream transition-colors focus-ring">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-condensed font-bold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-cream/70 hover:text-cream transition-colors focus-ring">White Papers</a></li>
                <li><a href="#" className="text-cream/70 hover:text-cream transition-colors focus-ring">Case Studies</a></li>
                <li><a href="#" className="text-cream/70 hover:text-cream transition-colors focus-ring">Technical Specifications</a></li>
                <li><a href="#" className="text-cream/70 hover:text-cream transition-colors focus-ring">Compliance Documentation</a></li>
              </ul>
            </div>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden mb-8">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-cream/70 mb-4 text-sm">
              Tactical and strategic defense systems engineered for mission-critical environments.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-cream hover:text-teal transition-colors focus-ring" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-cream hover:text-teal transition-colors focus-ring" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="mailto:contact@trinethra-defentech.com" className="text-cream hover:text-teal transition-colors focus-ring" aria-label="Email"><FaEnvelope size={20} /></a>
            </div>
            <MobileCollapsible title="Solutions">
              <ul className="space-y-3 text-sm pt-1">
                <li><Link href="/solutions/cable-harness" className="block py-1 text-cream/70 hover:text-cream transition-colors">Cable Harness</Link></li>
                <li><Link href="/solutions/storage-solutions" className="block py-1 text-cream/70 hover:text-cream transition-colors">Storage Solutions</Link></li>
                <li><Link href="/solutions/server" className="block py-1 text-cream/70 hover:text-cream transition-colors">Server</Link></li>
                <li><Link href="/solutions/panel-pc" className="block py-1 text-cream/70 hover:text-cream transition-colors">Panel PC</Link></li>
                <li><Link href="/contact" className="block py-1 text-cream/70 hover:text-cream transition-colors">Custom Solutions</Link></li>
              </ul>
            </MobileCollapsible>
            <MobileCollapsible title="Company">
              <ul className="space-y-3 text-sm pt-1">
                <li><Link href="/about" className="block py-1 text-cream/70 hover:text-cream transition-colors">About Us</Link></li>
                <li><Link href="/certifications" className="block py-1 text-cream/70 hover:text-cream transition-colors">Certifications</Link></li>
                <li><a href="#" className="block py-1 text-cream/70 hover:text-cream transition-colors">Careers</a></li>
                <li><Link href="/contact" className="block py-1 text-cream/70 hover:text-cream transition-colors">Contact</Link></li>
              </ul>
            </MobileCollapsible>
            <MobileCollapsible title="Resources">
              <ul className="space-y-3 text-sm pt-1">
                <li><a href="#" className="block py-1 text-cream/70 hover:text-cream transition-colors">White Papers</a></li>
                <li><a href="#" className="block py-1 text-cream/70 hover:text-cream transition-colors">Case Studies</a></li>
                <li><a href="#" className="block py-1 text-cream/70 hover:text-cream transition-colors">Technical Specifications</a></li>
                <li><a href="#" className="block py-1 text-cream/70 hover:text-cream transition-colors">Compliance Documentation</a></li>
              </ul>
            </MobileCollapsible>
            <div className="mt-6 mb-4"><MadeInIndia /></div>
          </div>

          <div className="border-t border-cream/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-cream/60 text-sm">
            <div>© {new Date().getFullYear()} TRINETHRA DEFENTECH. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cream transition-colors focus-ring">Privacy Policy</a>
              <a href="#" className="hover:text-cream transition-colors focus-ring">Terms of Service</a>
              <a href="#" className="hover:text-cream transition-colors focus-ring">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
  );
}
