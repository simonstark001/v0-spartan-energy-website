"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { MagneticButton } from "./magnetic-button"

const navLinks = [
  { href: "#residential", label: "Residential" },
  { href: "#commercial", label: "Commercial" },
  { href: "#calculator", label: "Calculator" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glassmorphism py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="relative z-10 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Spartan Helmet Icon */}
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <svg viewBox="0 0 50 50" className="w-full h-full">
                  {/* Helmet base */}
                  <ellipse cx="25" cy="42" rx="12" ry="4" fill="#0A192F" />
                  {/* Helmet body */}
                  <path
                    d="M10 25C10 14 16 6 25 6C34 6 40 14 40 25V38C40 40 38 42 36 42H14C12 42 10 40 10 38V25Z"
                    fill="#112240"
                    stroke="#F5A623"
                    strokeWidth="1.5"
                  />
                  {/* Helmet crest */}
                  <path
                    d="M25 2C25 2 30 6 30 10V18H20V10C20 6 25 2 25 2Z"
                    fill="#BC171F"
                  />
                  {/* Face opening */}
                  <path
                    d="M16 22C16 22 18 20 25 20C32 20 34 22 34 22V36C34 36 32 38 25 38C18 38 16 36 16 36V22Z"
                    fill="#0A192F"
                  />
                  {/* Nose guard */}
                  <rect x="23" y="22" width="4" height="14" fill="#112240" rx="1" />
                </svg>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold tracking-wide text-[#F8F5F0]">
                  SPARTAN <span className="text-[#F5A623]">ENERGY</span>
                </span>
                <span className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#8892b0]">
                  Pioneering Solar Infrastructure
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="animated-underline text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Phone size={16} />
                <span className="hidden xl:inline">+91 98765 43210</span>
              </motion.a>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <MagneticButton
                  variant="primary"
                  size="sm"
                  icon={<Phone size={16} />}
                >
                  Book Site Survey
                </MagneticButton>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden relative z-10 p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="relative h-full flex flex-col justify-center items-center gap-8 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-semibold tracking-wider uppercase text-foreground hover:text-[#BC171F] transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="mt-8 flex flex-col gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.4 }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  icon={<Phone size={20} />}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Site Survey
                </MagneticButton>

                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={18} />
                  <span>+91 98765 43210</span>
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
