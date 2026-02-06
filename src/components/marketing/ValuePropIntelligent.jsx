import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Target, Brain, TrendingUp, RotateCcw, Sparkles } from 'lucide-react'

export default function ValuePropIntelligent() {
  const features = [
    { icon: Target, label: 'Industry-Aware Suggestions', color: '#B8D4E8' },
    { icon: Brain, label: 'Multi-Model AI Consensus', color: '#A8C4D8' },
    { icon: TrendingUp, label: 'Automatic Optimization', color: '#98B4C8' },
    { icon: RotateCcw, label: 'Version History with Reasoning', color: '#88A4B8' }
  ]

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#B8D4E8]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="bg-white rounded-[32px] p-8 shadow-2xl border border-[#E5E7EB] min-h-[500px] relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-32 h-32 bg-gradient-to-br from-[#B8D4E8] to-[#98B4C8] rounded-[28px] flex items-center justify-center shadow-xl"
              >
                <Brain className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6B7280] mb-4 block">
              INTELLIGENT
            </span>

            <h2 className="font-serif text-[36px] md:text-[42px] font-semibold text-[#1A1A2E] leading-tight mb-6">
              Websites that think like you do
            </h2>

            <p className="text-[17px] text-[#4B5563] leading-relaxed mb-8">
              NU understands your industry, your audience, your goals. Every suggestion is personalized. Every edit makes your site better—automatically.
            </p>

            <Button 
              size="lg"
              className="bg-white/40 hover:bg-white/60 text-[#1A1A2E] border border-[#E5E7EB] rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-10"
            >
              See NU in Action
            </Button>

            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}30` }}
                  >
                    <feature.icon 
                      className="w-6 h-6" 
                      style={{ color: feature.color }}
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-[15px] font-medium text-[#1A1A2E] group-hover:text-[#7AB3D4] transition-colors">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
