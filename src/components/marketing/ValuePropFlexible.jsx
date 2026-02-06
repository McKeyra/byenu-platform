import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Calendar, ShoppingCart, Mail, Users, BarChart3, Link2, Plus } from 'lucide-react'

export default function ValuePropFlexible() {
  const [activeAbilities, setActiveAbilities] = useState([0])

  const abilities = [
    { icon: Calendar, label: 'Booking & Scheduling', color: '#C8BFE7' },
    { icon: ShoppingCart, label: 'E-commerce', color: '#B8AFD7' },
    { icon: Mail, label: 'Email Marketing', color: '#A89FC7' },
    { icon: Users, label: 'Member Portals', color: '#988FB7' },
    { icon: BarChart3, label: 'Analytics Pro', color: '#887FA7' },
    { icon: Link2, label: 'Custom Integrations', color: '#786F97' }
  ]

  const toggleAbility = (index) => {
    if (activeAbilities.includes(index)) {
      setActiveAbilities(activeAbilities.filter(i => i !== index))
    } else {
      setActiveAbilities([...activeAbilities, index])
    }
  }

  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#C8BFE7]/20 rounded-full blur-3xl" />
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
              FLEXIBLE
            </span>

            <h2 className="font-serif text-[36px] md:text-[42px] font-semibold text-[#1A1A2E] leading-tight mb-6">
              Your site grows with your business
            </h2>

            <p className="text-[17px] text-[#4B5563] leading-relaxed mb-8">
              Start simple. Add abilities as you need them. Booking? E-commerce? Member portals? Just ask NU. Your website evolves without rebuilding.
            </p>

            <Button 
              size="lg"
              className="bg-white/40 hover:bg-white/60 text-[#1A1A2E] border border-[#E5E7EB] rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-10"
            >
              Explore Abilities
            </Button>

            {/* Abilities Grid */}
            <div className="grid grid-cols-2 gap-4">
              {abilities.map((ability, index) => (
                <motion.button
                  key={ability.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => toggleAbility(index)}
                  className={`bg-white rounded-[24px] p-6 shadow-sm border hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left ${
                    activeAbilities.includes(index) 
                      ? 'border-[#C8BFE7] bg-[#C8BFE7]/5' 
                      : 'border-[#E5E7EB]'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300"
                    style={{ 
                      backgroundColor: activeAbilities.includes(index) 
                        ? `${ability.color}30` 
                        : '#F3F4F6' 
                    }}
                  >
                    <ability.icon 
                      className="w-5 h-5 transition-colors duration-300" 
                      style={{ 
                        color: activeAbilities.includes(index) 
                          ? ability.color 
                          : '#6B7280' 
                      }}
                      strokeWidth={2}
                    />
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    activeAbilities.includes(index) 
                      ? 'text-[#1A1A2E]' 
                      : 'text-[#6B7280]'
                  }`}>
                    {ability.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-[32px] p-8 shadow-2xl border border-[#E5E7EB] min-h-[600px] relative overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-[#9CA3AF]" />
                </div>
                <p className="text-sm text-[#6B7280]">Click abilities to add them</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
