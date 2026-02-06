import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Shield, 
  MessageCircle, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Star
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "NU AI Intelligence",
      description: "Natural language commands. Just describe what you want, and NU builds it. No design skills needed.",
      color: "mint"
    },
    {
      icon: Shield,
      title: "Element Versioning",
      description: "Every change is saved. Experiment freely knowing you can restore any previous version instantly.",
      color: "lavender"
    },
    {
      icon: MessageCircle,
      title: "Live Conversations",
      description: "Edit your website through conversation. Ask NU to make changes, add sections, or refine content.",
      color: "peach"
    },
    {
      icon: MapPin,
      title: "Smart Templates",
      description: "Industry-specific templates that adapt to your business. Not generic designs—custom solutions.",
      color: "sky"
    },
    {
      icon: Clock,
      title: "Instant Publishing",
      description: "Go live in minutes, not days. No waiting for reviews or approval. Your site, your timeline.",
      color: "mint"
    },
    {
      icon: DollarSign,
      title: "Credit Transparency",
      description: "See costs before every action. No surprise bills. Pay only for what you use.",
      color: "lavender"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members to edit together. Real-time updates. Perfect for agencies and teams.",
      color: "peach"
    },
    {
      icon: Star,
      title: "Built-In Abilities",
      description: "Add booking, e-commerce, forms, analytics, and more. No plugins or integrations needed.",
      color: "sky"
    }
  ]

  const colorVariants = {
    mint: { bg: "bg-[#8BC9A8]/10", text: "text-[#8BC9A8]", shadow: "shadow-[#8BC9A8]/10" },
    lavender: { bg: "bg-[#C9B8E8]/10", text: "text-[#C9B8E8]", shadow: "shadow-[#C9B8E8]/10" },
    peach: { bg: "bg-[#F5D5C8]/20", text: "text-[#E8A88A]", shadow: "shadow-[#F5D5C8]/10" },
    sky: { bg: "bg-[#B8D4E8]/10", text: "text-[#7AB3D4]", shadow: "shadow-[#B8D4E8]/10" },
  }

  return (
    <section id="features" className="py-24 md:py-32 bg-[#FAFBFC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#8BC9A8]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C9B8E8]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#8BC9A8] font-medium text-sm tracking-wide uppercase mb-4">
            Why Choose ByeNU
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A2E] mb-6">
            Everything you need to build your website
          </h2>
          <p className="text-lg text-[#6B7280] leading-relaxed">
            We've built every feature with real businesses in mind. Because creating a website shouldn't feel like a full-time job.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const variant = colorVariants[feature.color] || colorVariants.mint
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group bg-white rounded-[32px] p-8 shadow-lg ${variant.shadow} hover:shadow-2xl border border-[#E5E7EB]/50 hover:border-[#E5E7EB] transition-all duration-500`}
              >
                <div className={`w-14 h-14 ${variant.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${variant.text}`} />
                </div>
                
                <h3 className="font-serif text-xl font-semibold text-[#1A1A2E] mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
