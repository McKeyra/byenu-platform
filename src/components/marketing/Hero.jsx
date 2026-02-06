import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { motion } from 'framer-motion'
import { Play, Check, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  const featurePills = [
    "Live in minutes",
    "No credit card",
    "Cancel anytime"
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#8BC9A8]">
      {/* Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Organic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-[40%_60%_70%_30%/60%_40%_60%_40%] blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white/10 rounded-[60%_40%_30%_70%/40%_60%_40%_60%] blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-[50%_50%_40%_60%/50%_60%_40%_50%] blur-2xl"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-[800px] mx-auto px-6 py-[120px] pb-[80px] text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[40px] md:text-[56px] font-normal text-white leading-[1.15] mb-6 tracking-tight"
        >
          Say bye to the old way.
          <br />
          Say hello to the <span className="italic">NU</span> you.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[20px] text-white/90 leading-relaxed mb-10 max-w-[600px] mx-auto font-normal"
        >
          AI-powered websites that understand your business. No templates. No tutorials. Just conversation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Link to="/wizard-selector">
            <Button 
              size="lg"
              className="bg-[#1A1A2E] hover:bg-[#2A2A3E] text-white rounded-full px-8 py-6 text-base font-medium shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              Start Building Free
            </Button>
          </Link>
          <Button 
            size="lg"
            variant="outline"
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white/40 hover:border-white/60 rounded-full px-8 py-6 text-base font-medium backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            onClick={() => {
              const howItWorksSection = document.getElementById('how-it-works')
              if (howItWorksSection) {
                howItWorksSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <Play className="w-4 h-4 mr-2 fill-white" />
            Watch How It Works
          </Button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {featurePills.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              <span className="text-sm font-medium text-white">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Product Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-[700px]"
        >
          {/* Glassmorphic Card */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/20 overflow-hidden">
            {/* Card Header - Editor Interface */}
            <div className="bg-gradient-to-b from-[#FAFBFC] to-white p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF6057]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-sm text-[#6B7280] border border-[#E5E7EB]">
                  byenu.com
                </div>
              </div>
              
              {/* Mock Editor Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8BC9A8]/20 flex items-center justify-center">
                    <span className="text-base">✨</span>
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-3 py-2 text-sm text-[#1A1A2E] border border-[#E5E7EB]">
                    Create a landing page for my cafe...
                  </div>
                </div>
                
                {/* Response Preview */}
                <div className="bg-[#8BC9A8]/10 rounded-2xl p-4 space-y-2">
                  <div className="h-2 bg-[#8BC9A8]/30 rounded w-3/4" />
                  <div className="h-2 bg-[#8BC9A8]/30 rounded w-full" />
                  <div className="h-2 bg-[#8BC9A8]/30 rounded w-2/3" />
                </div>
              </div>
            </div>

            {/* Card Preview - Website */}
            <div className="p-6 bg-white">
              <div className="aspect-[16/10] bg-gradient-to-br from-[#F8FBF9] to-[#E8F5EE] rounded-2xl p-6 relative overflow-hidden">
                {/* Mini website preview */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8BC9A8]" />
                    <div className="h-3 bg-[#1A1A2E]/10 rounded w-24" />
                  </div>
                  <div className="h-8 bg-[#1A1A2E]/10 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#1A1A2E]/5 rounded w-full" />
                  <div className="h-4 bg-[#1A1A2E]/5 rounded w-5/6" />
                  <div className="h-10 bg-[#8BC9A8] rounded-full w-32 mt-4" />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 border border-[#E5E7EB]"
                >
                  <Check className="w-4 h-4 text-[#8BC9A8]" />
                  <span className="text-xs font-medium text-[#1A1A2E]">Live Site</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-white/20 rounded-[40px] blur-2xl -z-10" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  )
}
