import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./ui/logo";
import { MadeInIndia } from "./ui/made-in-india";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [location] = useLocation();
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowSolutionsDropdown(false);
  }, [location]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setShowSolutionsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Solutions", hasDropdown: true },
    { href: "/offerings", label: "Offerings" },
    { href: "/certifications", label: "Certifications" },
    { href: "/contact", label: "Contact" }
  ];

  const solutionsOptions = [
    {
      title: "Edge AI",
      description: "Essential features to get started",
      href: "/solutions/edge-ai"
    },
    {
      title: "Rugged Data Storage",
      description: "Advanced capabilities for growing teams",
      href: "/solutions/data-storage"
    },
    {
      title: "Rugged switches",
      description: "All features for large scale operations",
      href: "/solutions/switches"
    }
  ];

  const headerClass = `fixed w-full bg-forest text-cream shadow-md z-50 transition-all duration-300 ${
      isScrolled ? "py-2" : "py-3"
  }`;

  return (
      <header className={headerClass}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <MadeInIndia />
              {navLinks.map((link) => (
                  link.hasDropdown ? (
                      <div key={link.href} className="relative" ref={solutionsRef}>
                        <div className="flex items-center cursor-pointer"
                             onMouseEnter={() => setShowSolutionsDropdown(true)}
                        >
                          <Link
                              href={link.href}
                              className={`menu-item font-medium ${
                                  location === link.href || location.startsWith(link.href + "/") ? "after:w-full" : ""
                              }`}
                          >
                            {link.label}
                          </Link>
                          <button
                              className="ml-1 flex items-center focus:outline-none"
                              onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                          >
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                className={`transition-transform duration-200 ${showSolutionsDropdown ? 'rotate-180' : ''}`}
                            >
                              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>

                        {/* Solutions Dropdown */}
                        <AnimatePresence>
                          {showSolutionsDropdown && (
                              <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute left-0 mt-2 w-72 bg-forest border border-cream/10 shadow-lg rounded-md overflow-hidden z-50"
                                  onMouseLeave={() => setShowSolutionsDropdown(false)}
                              >
                                <div className="p-1">
                                  {solutionsOptions.map((option) => (
                                      <Link
                                          key={option.href}
                                          href={option.href}
                                          className="block p-4 hover:bg-navy transition-colors duration-200 rounded-sm"
                                      >
                                        <div className="font-condensed font-bold text-lg">{option.title}</div>
                                        <div className="text-cream/80 text-sm">{option.description}</div>
                                      </Link>
                                  ))}
                                </div>
                              </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                  ) : (
                      <Link
                          key={link.href}
                          href={link.href}
                          className={`menu-item font-medium ${
                              location === link.href ? "after:w-full" : ""
                          }`}
                      >
                        {link.label}
                      </Link>
                  )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-cream focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                  animate={isOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 }
                    }}
                    className="w-6 h-0.5 bg-cream block mb-1.5 transition-transform"
                />
                <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-6 h-0.5 bg-cream block mb-1.5 transition-opacity"
                />
                <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 }
                    }}
                    className="w-6 h-0.5 bg-cream block transition-transform"
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-x-0 top-[60px] z-40 md:hidden bg-navy shadow-lg"
              >
                <div className="container mx-auto px-4 py-3 flex flex-col space-y-2 max-h-[calc(100vh-60px)] overflow-y-auto">
                  <div className="py-2">
                    <MadeInIndia />
                  </div>
                  {navLinks.map((link) => (
                      link.hasDropdown ? (
                          <div key={link.href} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Link
                                  href={link.href}
                                  className="text-cream font-medium py-2.5 pl-3 text-left flex-grow rounded-md hover:bg-forest/50 transition-colors"
                                  onClick={() => setIsOpen(false)}
                              >
                                {link.label}
                              </Link>
                              <button
                                  className="text-cream font-medium p-2.5 flex items-center justify-center focus:outline-none rounded-md hover:bg-forest/50 transition-colors"
                                  onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                                  aria-label={showSolutionsDropdown ? 'Collapse menu' : 'Expand menu'}
                              >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    className={`transform transition-transform duration-200 ${showSolutionsDropdown ? 'rotate-180' : ''}`}
                                >
                                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </div>

                            <AnimatePresence>
                              {showSolutionsDropdown && (
                                  <motion.div
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -5 }}
                                      transition={{ duration: 0.15 }}
                                      className="pl-3 space-y-1 pt-1"
                                  >
                                    {solutionsOptions.map((option) => (
                                        <Link
                                            key={option.href}
                                            href={option.href}
                                            className="text-cream/90 font-medium py-2.5 px-4 block rounded-md hover:bg-forest/50 transition-colors"
                                            onClick={() => {
                                              setIsOpen(false);
                                              setShowSolutionsDropdown(false);
                                            }}
                                        >
                                          <div className="text-sm font-bold">{option.title}</div>
                                          <div className="text-xs text-cream/70">{option.description}</div>
                                        </Link>
                                    ))}
                                  </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                      ) : (
                          <Link
                              key={link.href}
                              href={link.href}
                              className="text-cream font-medium py-2.5 px-3 block rounded-md hover:bg-forest/50 transition-colors"
                              onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                      )
                  ))}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
}