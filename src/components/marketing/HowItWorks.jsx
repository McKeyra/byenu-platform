import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Wand2, Eye, Rocket } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Describe Your Vision",
      description: "Tell NU what kind of website you need. Use natural language—no technical jargon required.",
      color: "#8BC9A8"
    },
    {
      number: "02",
      icon: Wand2,
      title: "AI Builds It",
      description: "NU creates your website in real-time. Custom design, professional copy, perfect structure.",
      color: "#C9B8E8"
    },
    {
      number: "03",
      icon: Eye,
      title: "Review & Refine",
      description: "See your site live. Ask NU to make changes. Tweak colors, add sections, perfect every detail.",
      color: "#F5D5C8"
    },
    {
      number: "04",
      icon: Rocket,
      title: "Launch",
      description: "Go live with one click. Your professional website is ready to welcome the world.",
      color: "#B8D4E8"
    }
  ]

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block text-[#8BC9A8] font-medium text-sm tracking-wide uppercase mb-4">
            How It Works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A2E] mb-6">
            Four steps to your new website
          </h2>
          <p className="text-lg text-[#6B7280] leading-relaxed">
            We've simplified the entire process. From concept to launch, we've got you covered every step of the way.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#8BC9A8] via-[#C9B8E8] to-[#B8D4E8] opacity-30" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center lg:text-left"
              >
                {/* Step number and icon container */}
                <div className="relative inline-flex flex-col items-center lg:items-start mb-6">
                  {/* Background circle */}
                  <div 
                    className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-4 relative"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon 
                      className="w-8 h-8" 
                      style={{ color: step.color }} 
                    />
                    {/* Step number badge */}
                    <div 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#1A1A2E] mb-3">
                  {step.title}
                </h3>
                
                <p className="text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
