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
  const solutionsRef = useRef(null);

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
      // @ts-ignore
      if (solutionsRef.current instanceof HTMLDivElement && !solutionsRef.current.contains(event.target as Node)) {
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
      href: "/solutions/edge-ai",
      icon: "🧠"
    },
    {
      title: "Rugged Data Storage",
      description: "Advanced capabilities for growing teams",
      href: "/solutions/data-storage",
      icon: "💾"
    },
    {
      title: "Rugged Switches",
      description: "All features for large scale operations",
      href: "/solutions/switches",
      icon: "🔄"
    }
  ];

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${
      isScrolled
          ? "py-2 bg-forest/95 backdrop-blur-sm shadow-lg"
          : "py-4 bg-forest"
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
            <nav className="hidden lg:flex items-center space-x-6">
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
                          >
                            {link.label}
                          </Link>
                          <ChevronDown
                              size={16}
                              className={`ml-1 transition-transform duration-200 ${
                                  showSolutionsDropdown ? 'rotate-180' : ''
                              }`}
                              onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
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
                              >
                                <div className="p-2">
                                  {solutionsOptions.map((option) => (
                                      <Link
                                          key={option.href}
                                          href={option.href}
                                          className="flex items-start p-3 hover:bg-forest/60 transition-colors duration-200 rounded-md group"
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
                              location === link.href
                                  ? "after:w-full"
                                  : "after:w-0 hover:after:w-full"
                          }`}
                      >
                        {link.label}
                      </Link>
                  )
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden text-cream focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
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
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden bg-navy border-t border-cream/10 overflow-hidden"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto">
                  <div className="py-2 border-b border-cream/10 mb-2">
                    <MadeInIndia />
                  </div>
                  {navLinks.map((link) => (
                      link.hasDropdown ? (
                          <div key={link.href} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Link
                                  href={link.href}
                                  className="text-cream font-medium py-3 pl-3 text-left flex-grow rounded-md hover:bg-forest/50 transition-colors"
                                  onClick={() => setIsOpen(false)}
                              >
                                {link.label}
                              </Link>
                              <button
                                  className="text-cream font-medium p-3 flex items-center justify-center focus:outline-none rounded-md hover:bg-forest/50 transition-colors"
                                  onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                                  aria-label={showSolutionsDropdown ? 'Collapse menu' : 'Expand menu'}
                              >
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-200 ${
                                        showSolutionsDropdown ? 'rotate-180' : ''
                                    }`}
                                />
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
                                  >
                                    {solutionsOptions.map((option) => (
                                        <Link
                                            key={option.href}
                                            href={option.href}
                                            className="text-cream/90 font-medium py-3 px-4 flex items-center rounded-md hover:bg-forest/50 transition-colors"
                                            onClick={() => {
                                              setIsOpen(false);
                                              setShowSolutionsDropdown(false);
                                            }}
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
                              className={`text-cream font-medium py-3 px-3 block rounded-md hover:bg-forest/50 transition-colors ${
                                  location === link.href ? "bg-forest/30" : ""
                              }`}
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