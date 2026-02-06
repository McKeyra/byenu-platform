import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Check, MessageSquare, Zap, Eye, Rocket } from 'lucide-react'

export default function ValuePropInstant() {
  const [currentStep, setCurrentStep] = useState(0)

  const chatSteps = [
    { role: 'user', text: 'Create a landing page for my coffee shop' },
    { role: 'assistant', text: 'Building your coffee shop website...' },
    { role: 'preview', text: 'Your site is live!' }
  ]

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    { icon: Zap, label: '8-Stage Wizard' },
    { icon: Check, label: 'Smart Defaults' },
    { icon: Eye, label: 'Real-time Preview' },
    { icon: Rocket, label: 'Instant Publishing' }
  ]

  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#F4DD8E]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6B7280] mb-4 block">
              INSTANT
            </span>

            <h2 className="font-serif text-[36px] md:text-[42px] font-semibold text-[#1A1A2E] leading-tight mb-6">
              From conversation to live website
            </h2>

            <p className="text-[17px] text-[#4B5563] leading-relaxed mb-8">
              Tell NU what you need. Your website builds itself while you watch. No coding. No design skills. No templates to fight with.
            </p>

            <Button 
              size="lg"
              className="bg-white/40 hover:bg-white/60 text-[#1A1A2E] border border-[#E5E7EB] rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-10"
            >
              Try a Demo
            </Button>

            {/* Sub-features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E5E7EB] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F4DD8E]/20 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-[#D4A80E]" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-[#1A1A2E]">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-[32px] p-8 shadow-2xl border border-[#E5E7EB] hover:shadow-3xl hover:-translate-y-1 transition-all duration-500">
              {/* Chat Interface Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E5E7EB]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4DD8E] to-[#E4CD7E] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#1A1A2E]">NU Assistant</div>
                  <div className="text-xs text-[#6B7280]">Building your website...</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: currentStep >= 0 ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-end"
                >
                  <div className="bg-[#1A1A2E] text-white rounded-[20px] rounded-tr-sm px-5 py-3 max-w-[80%]">
                    <p className="text-sm">Create a landing page for my coffee shop</p>
                  </div>
                </motion.div>

                {/* Assistant Thinking */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: currentStep >= 1 ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#F4DD8E]/20 border border-[#F4DD8E]/30 rounded-[20px] rounded-tl-sm px-5 py-3 max-w-[80%]">
                    <p className="text-sm text-[#1A1A2E]">Building your coffee shop website...</p>
                    <div className="flex gap-1 mt-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: currentStep >= 1 ? [1, 1.2, 1] : 1,
                            opacity: currentStep >= 1 ? [0.5, 1, 0.5] : 0.3
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity,
                            delay: i * 0.2 
                          }}
                          className="w-2 h-2 bg-[#D4A80E] rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Preview Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: currentStep >= 2 ? 1 : 0.3,
                    scale: currentStep >= 2 ? 1 : 0.95
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-[#F8FBF9] to-[#FFF9E6] rounded-[24px] p-6 border-2 border-[#F4DD8E]/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#D4A80E]" />
                      <span className="font-semibold text-[#1A1A2E]">Your site is live!</span>
                    </div>
                    <motion.div
                      animate={{ scale: currentStep >= 2 ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-2 h-2 bg-[#22C55E] rounded-full"
                    />
                  </div>
                  
                  {/* Mini Website Preview */}
                  <div className="bg-white rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5A3C] to-[#6B4423]" />
                      <div className="h-2 bg-[#E5E7EB] rounded w-20" />
                    </div>
                    <div className="h-3 bg-[#E5E7EB] rounded w-3/4" />
                    <div className="h-3 bg-[#E5E7EB] rounded w-full" />
                    <div className="h-3 bg-[#E5E7EB] rounded w-2/3" />
                    <div className="h-6 bg-[#F4DD8E] rounded-full w-24 mt-3" />
                  </div>
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#E5E7EB]">
                {[0, 1, 2].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      step <= currentStep 
                        ? 'w-8 bg-[#F4DD8E]' 
                        : 'w-1.5 bg-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-2 border border-[#E5E7EB]"
            >
              <div className="text-xs text-[#6B7280] mb-0.5">Avg. build time</div>
              <div className="text-xl font-bold text-[#1A1A2E]">47s</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
