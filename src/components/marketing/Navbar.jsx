import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils/index.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const productLinks = [
    { label: 'NU AI Intelligence', href: '#' },
    { label: 'Abilities System', href: '#' },
    { label: 'Element Versioning', href: '#' },
    { label: 'Integrations', href: '#' },
    { label: 'Roadmap', href: '#' },
  ]

  const resourceLinks = [
    { label: 'Documentation', href: createPageUrl('Docs') },
    { label: 'Video Tutorials', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'API Docs (Pro+)', href: '#' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.08)]' 
            : 'bg-white/90 backdrop-blur-[20px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`${scrolled ? 'md:mx-6 md:my-3 md:rounded-[24px] md:border md:border-white/30 md:bg-white/95 md:px-6 md:py-4' : 'py-4'} flex items-center justify-between transition-all duration-500`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-xl font-semibold text-[#1A1A2E]">ByeNU</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Product Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('product')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors duration-300 text-sm font-medium rounded-lg hover:bg-[#F3F4F6]">
                  Product
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'product' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] py-2"
                    >
                      {productLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-[#4B5563] hover:text-[#1A1A2E] hover:bg-[#F9FAFB] transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#pricing" className="px-4 py-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors duration-300 text-sm font-medium rounded-lg hover:bg-[#F3F4F6]">
                Pricing
              </a>
              <a href="#examples" className="px-4 py-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors duration-300 text-sm font-medium rounded-lg hover:bg-[#F3F4F6]">
                Examples
              </a>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors duration-300 text-sm font-medium rounded-lg hover:bg-[#F3F4F6]">
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] py-2"
                    >
                      {resourceLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-[#4B5563] hover:text-[#1A1A2E] hover:bg-[#F9FAFB] transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to={createPageUrl('Blog')} className="px-4 py-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors duration-300 text-sm font-medium rounded-lg hover:bg-[#F3F4F6]">
                Blog
              </Link>
              <Link to={createPageUrl('About')} className="px-4 py-2 text-[#6B7280] hover:text-[#1A1A2E] transition-colors duration-300 text-sm font-medium rounded-lg hover:bg-[#F3F4F6]">
                About
              </Link>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center">
              <Link to="/wizard-selector">
                <Button 
                  className="bg-[#1A1A2E] hover:bg-[#2A2A3E] text-white rounded-full px-6 py-2 text-sm font-medium shadow-lg shadow-[#1A1A2E]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1A1A2E] focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>

                <div className="mt-16 space-y-1">
                  {/* Product Links */}
                  <div className="py-2">
                    <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider px-4 mb-2">Product</div>
                    {productLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-base text-[#1A1A2E] hover:bg-[#8BC9A8]/10 rounded-lg transition-colors min-h-[48px] flex items-center"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <a href="#pricing" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-base font-medium text-[#1A1A2E] hover:bg-[#8BC9A8]/10 rounded-lg transition-colors min-h-[48px] flex items-center">
                    Pricing
                  </a>
                  <a href="#examples" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-base font-medium text-[#1A1A2E] hover:bg-[#8BC9A8]/10 rounded-lg transition-colors min-h-[48px] flex items-center">
                    Examples
                  </a>

                  {/* Resources Links */}
                  <div className="py-2">
                    <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider px-4 mb-2">Resources</div>
                    {resourceLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-base text-[#1A1A2E] hover:bg-[#8BC9A8]/10 rounded-lg transition-colors min-h-[48px] flex items-center"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <Link to={createPageUrl('Blog')} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-base font-medium text-[#1A1A2E] hover:bg-[#8BC9A8]/10 rounded-lg transition-colors min-h-[48px] flex items-center">
                    Blog
                  </Link>
                  <Link to={createPageUrl('About')} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-base font-medium text-[#1A1A2E] hover:bg-[#8BC9A8]/10 rounded-lg transition-colors min-h-[48px] flex items-center">
                    About
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                  <Link to="/wizard-selector" onClick={() => setMobileOpen(false)}>
                    <Button 
                      className="w-full bg-[#1A1A2E] text-white rounded-full py-6 text-base font-medium shadow-lg"
                    >
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
