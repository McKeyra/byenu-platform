import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F8FBF9] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-[#8BC9A8]/20 via-[#C9B8E8]/20 to-[#F5D5C8]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-[40px] p-12 md:p-16 shadow-2xl shadow-[#1A1A2E]/5 border border-[#E5E7EB]/50 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#8BC9A8]/10 border border-[#8BC9A8]/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#8BC9A8]" />
            <span className="text-sm font-medium text-[#1A1A2E]">Join 10,000+ Businesses</span>
          </motion.div>

          {/* Headline */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1A1A2E] leading-tight mb-6">
            Ready to build your
            <span className="text-[#8BC9A8]"> perfect website?</span>
          </h2>

          <p className="text-lg md:text-xl text-[#6B7280] leading-relaxed mb-10 max-w-2xl mx-auto">
            Stop wasting time with complex builders. Start creating with ByeNU today and launch your website in minutes, not months.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/wizard-selector">
              <Button 
                size="lg"
                className="bg-[#8BC9A8] hover:bg-[#7AB897] text-white rounded-full px-10 py-7 text-lg shadow-xl shadow-[#8BC9A8]/30 hover:shadow-2xl hover:shadow-[#8BC9A8]/40 hover:-translate-y-1 transition-all duration-300"
              >
                Start Building Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-7 text-lg border-2 border-[#E5E7EB] hover:border-[#8BC9A8] hover:bg-[#8BC9A8]/5 transition-all duration-300"
            >
              View Examples
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-[#E5E7EB] flex flex-wrap justify-center gap-8 text-[#6B7280]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8BC9A8]" />
              <span className="text-sm">Start free instantly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#C9B8E8]" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F5D5C8]" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
