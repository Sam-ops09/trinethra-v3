import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./ui/logo";
import { MadeInIndia } from "./ui/made-in-india";
import { ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [location] = useLocation();
  const solutionsRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for performance
      requestAnimationFrame(() => setIsScrolled(window.scrollY > 20));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Solutions", hasDropdown: true },
    { href: "/certifications", label: "Certifications" },
    { href: "/contact", label: "Contact" }
  ];

  const solutionsOptions = [
    { title: "Cable Harness", description: "Rugged interconnect & distribution", href: "/solutions/cable-harness", icon: "🪢" },
    { title: "Storage Solutions", description: "Rugged secure data platforms", href: "/solutions/storage-solutions", icon: "💾" },
    { title: "Server", description: "Edge compute & AI inference", href: "/solutions/server", icon: "🖥️" },
    { title: "Panel PC", description: "Rugged operator interfaces", href: "/solutions/panel-pc", icon: "🖲️" }
  ];

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-forest/95 backdrop-blur-sm shadow-lg" : "py-4 bg-forest"}`;

  return (
      <header className={headerClass} role="banner">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 focus-ring" aria-label="Go to home page">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6" aria-label="Primary navigation">
              <MadeInIndia />
              {navLinks.map((link) => (
                  link.hasDropdown ? (
                      <div key={link.href} className="relative" ref={solutionsRef}>
                        <div
                            className="flex items-center cursor-pointer group"
                            onMouseEnter={() => setShowSolutionsDropdown(true)}
                        >
                          <Link
                              href={link.href}
                              className={`text-cream hover:text-white font-medium py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-cream after:transition-all after:duration-300 after:ease-in-out ${
                                  location === link.href || location.startsWith(link.href + "/")
                                      ? "after:w-full"
                                      : "after:w-0 group-hover:after:w-full"
                              }`}
                              aria-haspopup="true"
                              aria-expanded={showSolutionsDropdown}
                          >
                            {link.label}
                          </Link>
                          <ChevronDown
                              size={16}
                              className={`ml-1 transition-transform duration-200 text-white ${showSolutionsDropdown ? 'rotate-180' : ''}`}
                              onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                              aria-label="Toggle solutions submenu"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowSolutionsDropdown(!showSolutionsDropdown); }}
                          />
                        </div>

                        {/* Solutions Dropdown */}
                        <AnimatePresence>
                          {showSolutionsDropdown && (
                              <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute left-0 mt-2 w-72 bg-navy border border-cream/10 shadow-2xl rounded-lg overflow-hidden z-50"
                                  onMouseLeave={() => setShowSolutionsDropdown(false)}
                                  role="menu"
                                  aria-label="Solutions submenu"
                              >
                                <div className="p-2">
                                  {solutionsOptions.map((option) => (
                                      <Link
                                          key={option.href}
                                          href={option.href}
                                          className="flex items-start p-3 hover:bg-forest/60 transition-colors duration-200 rounded-md group focus-ring"
                                          aria-label={`${option.title} – ${option.description}`}
                                      >
                              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cream/10 text-cream rounded-md mr-3 group-hover:bg-cream/20">
                                {option.icon}
                              </span>
                                        <div>
                                          <div className="font-condensed font-bold text-lg text-cream group-hover:text-white">{option.title}</div>
                                          <div className="text-cream/70 text-sm group-hover:text-cream/90">{option.description}</div>
                                        </div>
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
                          className={`text-cream hover:text-white font-medium py-2 px-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-cream after:transition-all after:duration-300 after:ease-in-out ${
                              location === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                          } focus-ring`}
                          aria-current={location === link.href ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                  )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden text-cream focus-ring inline-flex items-center justify-center p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={24} />
                    </motion.div>
                ) : (
                    <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={24} />
                    </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  ref={mobileNavRef}
                  id="mobile-navigation"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden bg-navy border-t border-cream/10 overflow-hidden will-change-transform"
                  role="dialog"
                  aria-modal="true"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto safe-bottom">
                  {/* added safe-bottom for notch devices */}
                  <div className="py-2 border-b border-cream/10 mb-2">
                    <MadeInIndia />
                  </div>
                  {navLinks.map((link) => (
                      link.hasDropdown ? (
                          <div key={link.href} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Link
                                  href={link.href}
                                  className="text-cream font-medium py-3 pl-3 text-left flex-grow rounded-md hover:bg-forest/50 transition-colors focus-ring"
                                  onClick={() => setIsOpen(false)}
                              >
                                {link.label}
                              </Link>
                              <button
                                  className="text-cream font-medium p-3 flex items-center justify-center focus-ring rounded-md hover:bg-forest/50 transition-colors"
                                  onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                                  aria-label={showSolutionsDropdown ? 'Collapse menu' : 'Expand menu'}
                                  aria-expanded={showSolutionsDropdown}
                              >
                                <ChevronDown size={20} className={`transition-transform duration-200 ${showSolutionsDropdown ? 'rotate-180' : ''}`} />
                              </button>
                            </div>

                            <AnimatePresence>
                              {showSolutionsDropdown && (
                                  <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="pl-3 space-y-1 pt-1"
                                      role="menu"
                                      aria-label="Solutions submenu"
                                  >
                                    {solutionsOptions.map((option) => (
                                        <Link
                                            key={option.href}
                                            href={option.href}
                                            className="text-cream/90 font-medium py-3 px-4 flex items-center rounded-md hover:bg-forest/50 transition-colors focus-ring"
                                            onClick={() => { setIsOpen(false); setShowSolutionsDropdown(false); }}
                                        >
                              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cream/10 text-cream rounded-md mr-3">
                                {option.icon}
                              </span>
                                          <div>
                                            <div className="text-sm font-bold">{option.title}</div>
                                            <div className="text-xs text-cream/70">{option.description}</div>
                                          </div>
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
                              className={`text-cream font-medium py-3 px-3 block rounded-md hover:bg-forest/50 transition-colors focus-ring ${location === link.href ? "bg-forest/30" : ""}`}
                              onClick={() => setIsOpen(false)}
                              aria-current={location === link.href ? 'page' : undefined}
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