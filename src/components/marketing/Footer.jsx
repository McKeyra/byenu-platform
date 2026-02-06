import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Youtube, Github, Shield, Lock, Globe, ChevronDown } from 'lucide-react'

export default function Footer() {
  const [openSection, setOpenSection] = useState(null)

  const footerSections = {
    Product: [
      { label: 'NU AI Intelligence', href: '#' },
      { label: 'Abilities', href: '#' },
      { label: 'Versioning', href: '#' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Roadmap', href: '#' },
      { label: "What's New", href: '#' },
      { label: 'Examples', href: '#' },
    ],
    Resources: [
      { label: 'Docs', href: '/docs' },
      { label: 'Video Tutorials', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'API Docs', href: '/docs/api' },
      { label: 'Support', href: '/support' },
      { label: 'Status Page', href: '#' },
      { label: 'Community', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#', badge: 'hiring' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  }

  const socialLinks = [
    { label: 'Twitter', href: '#', icon: Twitter },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'YouTube', href: '#', icon: Youtube },
    { label: 'GitHub', href: '#', icon: Github },
  ]

  const trustBadges = [
    { label: 'SSL Secured', icon: Lock },
    { label: 'SOC 2 Type II', icon: Shield },
    { label: 'GDPR Compliant', icon: Globe },
    { label: 'CCPA Compliant', icon: Shield },
  ]

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-20 mb-16">
          {/* Column 1: ByeNU */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="/" className="inline-block mb-4">
                <span className="font-serif text-2xl font-semibold text-white">ByeNU</span>
              </a>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Say bye to the old way.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Columns 2-4: Links */}
          {Object.entries(footerSections).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-white/60 hover:text-white hover:underline transition-all text-sm flex items-center gap-2 group"
                      >
                        {link.label}
                        {link.badge === 'hiring' && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BC9A8] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8BC9A8]"></span>
                          </span>
                        )}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white/60 hover:text-white hover:underline transition-all text-sm flex items-center gap-2 group"
                      >
                        {link.label}
                        {link.badge === 'hiring' && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BC9A8] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8BC9A8]"></span>
                          </span>
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Accordions */}
        <div className="md:hidden space-y-6 mb-12">
          {/* ByeNU Section */}
          <div>
            <a href="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold text-white">ByeNU</span>
            </a>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Say bye to the old way.
            </p>
            <div className="flex items-center gap-3 mb-8">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Accordion Sections */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title} className="border-t border-white/10">
              <button
                onClick={() => toggleSection(title)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="font-semibold text-white text-sm uppercase tracking-wider">
                  {title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white/60 transition-transform ${
                    openSection === title ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === title && (
                <ul className="pb-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"
                        >
                          {link.label}
                          {link.badge === 'hiring' && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BC9A8] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8BC9A8]"></span>
                            </span>
                          )}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2"
                        >
                          {link.label}
                          {link.badge === 'hiring' && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8BC9A8] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8BC9A8]"></span>
                            </span>
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-12 pb-12 border-b border-white/10">
          {trustBadges.map((badge) => {
            const Icon = badge.icon
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-white/40 text-xs"
              >
                <Icon className="w-5 h-5" />
                <span>{badge.label}</span>
              </div>
            )
          })}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs text-center md:text-left">
            © 2026 Educated New United World Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select className="bg-white/5 text-white/60 text-xs px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8BC9A8]">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>

            {/* Built with ByeNU Badge */}
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
            >
              Built with ByeNU ✨
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
