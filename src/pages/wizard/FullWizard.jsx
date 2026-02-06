import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSubmission } from '../../api/submissions.js'
import { generateReport } from '../../api/reports.js'
import PageLayout from '../../components/layout/PageLayout.jsx'
import { C } from '../../theme/constants.js'
import { ArrowLeft, ArrowRight, Loader2, Building2, Globe, Mail, FileText, Image as ImageIcon, Target, Users, MousePointer, Palette, Type, Layout, CheckCircle, Sparkles } from 'lucide-react'
import { useAuth } from '../../lib/auth/AuthContext.jsx'
import { Input } from '../../components/ui/input.jsx'
import { Label } from '../../components/ui/label.jsx'
import { Textarea } from '../../components/ui/textarea.jsx'
import { cn } from '../../utils/index.js'

// Step 1: Business Basics (businessName, industry, businessType, businessHistory)
function PageBusinessBasics({ formData, setFormData, onNext }) {
  const [businessName, setBusinessName] = useState(formData.businessName || '')
  const [industry, setIndustry] = useState(formData.industry || [])
  const [businessType, setBusinessType] = useState(formData.businessType || '')
  const [yearsOperational, setYearsOperational] = useState(formData.yearsOperational || '')

  const businessTypes = [
    { id: 'solo', label: 'Solo / Freelancer', desc: 'Just me' },
    { id: 'small', label: 'Small Team', desc: '2-10 people' },
    { id: 'medium', label: 'Growing Business', desc: '11-50 people' },
    { id: 'enterprise', label: 'Enterprise', desc: '50+ people' }
  ]

  const timeframes = [
    { id: 'startup', label: 'Just Starting', desc: 'Pre-launch or less than 1 year' },
    { id: '1-3', label: '1-3 Years', desc: 'Growing and establishing' },
    { id: '3-5', label: '3-5 Years', desc: 'Established presence' },
    { id: '5-10', label: '5-10 Years', desc: 'Well-established' },
    { id: '10+', label: '10+ Years', desc: 'Industry veteran' }
  ]

  const industries = [
    'Healthcare', 'Legal', 'Accounting', 'Real Estate', 'Restaurant', 'Retail',
    'Technology', 'Creative', 'Fitness', 'Education', 'Construction', 'Other'
  ]

  const handleNext = () => {
    setFormData({
      ...formData,
      businessName,
      industry: Array.isArray(industry) ? industry : [industry],
      businessType,
      yearsOperational
    })
    onNext()
  }

  const toggleIndustry = (ind) => {
    const current = Array.isArray(industry) ? industry : (industry ? [industry] : [])
    if (current.includes(ind)) {
      setIndustry(current.filter(i => i !== ind))
    } else {
      setIndustry([...current, ind])
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 mx-auto mb-4 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Tell us about your business</h1>
        <p className="text-slate-600">Let's start with the basics</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Business Name *</Label>
          <Input
            placeholder="e.g. Acme Studio"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="h-12 text-lg"
          />
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Industry * (Select all that apply)</Label>
          <div className="grid grid-cols-3 gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => toggleIndustry(ind)}
                className={cn(
                  'p-3 rounded-xl border-2 text-sm transition-all',
                  (Array.isArray(industry) ? industry : (industry ? [industry] : [])).includes(ind)
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Business Size *</Label>
          <div className="grid grid-cols-2 gap-3">
            {businessTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setBusinessType(type.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  businessType === type.id
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <h3 className="font-semibold text-slate-900">{type.label}</h3>
                <p className="text-sm text-slate-500">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">How long have you been in business? *</Label>
          <div className="grid grid-cols-2 gap-3">
            {timeframes.map(tf => (
              <button
                key={tf.id}
                onClick={() => setYearsOperational(tf.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  yearsOperational === tf.id
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <h3 className="font-semibold text-slate-900">{tf.label}</h3>
                <p className="text-sm text-slate-500">{tf.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!businessName || (Array.isArray(industry) ? industry.length === 0 : !industry) || !businessType || !yearsOperational}
          className={cn(
            'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all',
            businessName && (Array.isArray(industry) ? industry.length > 0 : industry) && businessType && yearsOperational
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Step 2: Technical Setup (domain, email, businessDocs, brandAssets)
function PageTechnicalSetup({ formData, setFormData, onNext, onBack }) {
  const [hasDomain, setHasDomain] = useState(formData.domain?.hasCustomDomain ?? null)
  const [domain, setDomain] = useState(formData.domain?.customDomain || '')
  const [hasEmail, setHasEmail] = useState(formData.email?.hasBusinessEmail ?? null)
  const [email, setEmail] = useState(formData.email?.businessEmail || '')
  const [businessDescription, setBusinessDescription] = useState(formData.businessDocs?.businessDescription || '')
  const [hasLogo, setHasLogo] = useState(formData.brandAssets?.hasLogo || false)

  const handleNext = () => {
    setFormData({
      ...formData,
      domain: {
        hasCustomDomain: hasDomain,
        customDomain: hasDomain ? domain : '',
        domainProvider: hasDomain ? 'TBD' : ''
      },
      email: {
        hasBusinessEmail: hasEmail,
        businessEmail: hasEmail ? email : ''
      },
      businessDocs: {
        businessDescription
      },
      brandAssets: {
        hasLogo
      }
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Globe className="w-16 h-16 mx-auto mb-4 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Technical Setup</h1>
        <p className="text-slate-600">Domain, email, and brand materials</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Do you have a custom domain? *</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setHasDomain(true)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasDomain === true ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-slate-700" />
              <p className="font-semibold">Yes, I have one</p>
            </button>
            <button
              onClick={() => setHasDomain(false)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasDomain === false ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <Globe className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <p className="font-semibold">No, help me get one</p>
            </button>
          </div>
          {hasDomain === true && (
            <Input
              placeholder="www.yourbusiness.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-3 h-12"
            />
          )}
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Do you have a business email? *</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setHasEmail(true)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasEmail === true ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <Mail className="w-6 h-6 mx-auto mb-2 text-slate-700" />
              <p className="font-semibold">Yes, I have one</p>
            </button>
            <button
              onClick={() => setHasEmail(false)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasEmail === false ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <Mail className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <p className="font-semibold">No, set one up</p>
            </button>
          </div>
          {hasEmail === true && (
            <Input
              type="email"
              placeholder="contact@yourbusiness.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-3 h-12"
            />
          )}
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Business Description (Optional)</Label>
          <Textarea
            placeholder="Describe what your business does, who you serve, and what makes you unique..."
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Do you have a logo?</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setHasLogo(true)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasLogo === true ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <ImageIcon className="w-6 h-6 mx-auto mb-2 text-slate-700" />
              <p className="font-semibold">Yes</p>
            </button>
            <button
              onClick={() => setHasLogo(false)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all',
                hasLogo === false ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <ImageIcon className="w-6 h-6 mx-auto mb-2 text-slate-400" />
              <p className="font-semibold">No</p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={hasDomain === null || hasEmail === null || (hasDomain === true && !domain) || (hasEmail === true && !email)}
          className={cn(
            'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all',
            hasDomain !== null && hasEmail !== null && (hasDomain === false || domain) && (hasEmail === false || email)
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Step 3: Strategy (goals, audience, primaryCta)
function PageStrategy({ formData, setFormData, onNext, onBack }) {
  const [goals, setGoals] = useState(formData.goals || [])
  const [audience, setAudience] = useState(formData.audience || '')
  const [primaryCta, setPrimaryCta] = useState(formData.primaryCta || '')

  const goalOptions = [
    { id: 'lead-gen', label: 'Generate Leads', icon: '📧' },
    { id: 'booking', label: 'Accept Bookings', icon: '📅' },
    { id: 'showcase', label: 'Showcase Work', icon: '✨' },
    { id: 'sell', label: 'Sell Products', icon: '🛍️' },
    { id: 'inform', label: 'Provide Info', icon: '📚' },
    { id: 'community', label: 'Build Community', icon: '👥' }
  ]

  const ctaSuggestions = [
    'Get Started', 'Book a Consultation', 'Contact Us', 'Get a Quote', 'Schedule Now', 'Learn More'
  ]

  const toggleGoal = (goalId) => {
    if (goals.includes(goalId)) {
      setGoals(goals.filter(g => g !== goalId))
    } else {
      setGoals([...goals, goalId])
    }
  }

  const handleNext = () => {
    setFormData({
      ...formData,
      goals,
      audience,
      primaryCta
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Target className="w-16 h-16 mx-auto mb-4 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Strategy</h1>
        <p className="text-slate-600">Your goals and target audience</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-slate-700 font-medium mb-2 block">What are your goals? * (Select all that apply)</Label>
          <div className="grid grid-cols-3 gap-3">
            {goalOptions.map(goal => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-center',
                  goals.includes(goal.id)
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <span className="text-2xl block mb-2">{goal.icon}</span>
                <span className="text-sm font-medium">{goal.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Who are you trying to reach? *</Label>
          <Textarea
            placeholder="e.g., Small business owners aged 30-50 looking for accounting services in Toronto"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">What action should visitors take? *</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {ctaSuggestions.map(cta => (
              <button
                key={cta}
                onClick={() => setPrimaryCta(cta)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  primaryCta === cta
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {cta}
              </button>
            ))}
          </div>
          <Input
            placeholder="Or type your own..."
            value={primaryCta}
            onChange={(e) => setPrimaryCta(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={goals.length === 0 || !audience || !primaryCta}
          className={cn(
            'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all',
            goals.length > 0 && audience && primaryCta
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Step 4: Design (tone, colorScheme, fonts, layouts)
function PageDesign({ formData, setFormData, onNext, onBack }) {
  const [tone, setTone] = useState(formData.tone || [])
  const [colorScheme, setColorScheme] = useState(formData.colorDirections?.[0] || '')
  const [fonts, setFonts] = useState(formData.fonts?.fontPairingId || '')
  const [layout, setLayout] = useState(formData.layout || '')

  const toneOptions = [
    { id: 'professional', label: 'Professional', desc: 'Formal & trustworthy' },
    { id: 'friendly', label: 'Friendly', desc: 'Warm & approachable' },
    { id: 'bold', label: 'Bold', desc: 'Confident & direct' },
    { id: 'playful', label: 'Playful', desc: 'Fun & energetic' },
    { id: 'minimal', label: 'Minimal', desc: 'Clean & simple' },
    { id: 'luxurious', label: 'Luxurious', desc: 'Premium & elegant' }
  ]

  const colorPalettes = [
    { id: 'blue-professional', name: 'Ocean Professional', colors: ['#1e40af', '#3b82f6', '#06b6d4'] },
    { id: 'green-nature', name: 'Natural Growth', colors: ['#166534', '#22c55e', '#fbbf24'] },
    { id: 'purple-creative', name: 'Creative Purple', colors: ['#7c3aed', '#a855f7', '#ec4899'] },
    { id: 'warm-sunset', name: 'Warm Sunset', colors: ['#ea580c', '#f97316', '#fbbf24'] },
    { id: 'neutral-elegant', name: 'Elegant Neutral', colors: ['#1f2937', '#6b7280', '#f59e0b'] },
    { id: 'teal-modern', name: 'Modern Teal', colors: ['#0d9488', '#14b8a6', '#f43f5e'] }
  ]

  const fontPairings = [
    { id: 'modern-sans', heading: 'Inter', body: 'Inter', preview: 'Clean & Modern' },
    { id: 'elegant-serif', heading: 'Playfair Display', body: 'Lato', preview: 'Elegant & Sophisticated' },
    { id: 'bold-impact', heading: 'Montserrat', body: 'Open Sans', preview: 'Bold & Impactful' },
    { id: 'friendly-rounded', heading: 'Nunito', body: 'Nunito', preview: 'Friendly & Approachable' },
    { id: 'professional-classic', heading: 'Roboto', body: 'Roboto', preview: 'Professional & Classic' },
    { id: 'creative-unique', heading: 'Poppins', body: 'Raleway', preview: 'Creative & Unique' }
  ]

  const layouts = [
    { id: 'hero-centered', name: 'Hero Centered', desc: 'Bold headline with centered call-to-action' },
    { id: 'hero-split', name: 'Split Hero', desc: 'Image on one side, content on other' },
    { id: 'minimal-clean', name: 'Minimal Clean', desc: 'Lots of white space, simple layout' },
    { id: 'card-grid', name: 'Card Grid', desc: 'Modular card-based layout' }
  ]

  const toggleTone = (toneId) => {
    if (tone.includes(toneId)) {
      setTone(tone.filter(t => t !== toneId))
    } else if (tone.length < 2) {
      setTone([...tone, toneId])
    }
  }

  const handleNext = () => {
    const selectedFont = fontPairings.find(f => f.id === fonts)
    setFormData({
      ...formData,
      tone,
      colorDirections: colorScheme ? [colorScheme] : [],
      fonts: fonts ? {
        fontPairingId: fonts,
        headingFont: selectedFont?.heading || 'Inter',
        bodyFont: selectedFont?.body || 'Inter'
      } : {},
      layout
    })
    onNext()
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Palette className="w-16 h-16 mx-auto mb-4 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Design & Style</h1>
        <p className="text-slate-600">Visual identity and website aesthetics</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Brand Personality * (Select up to 2)</Label>
          <div className="grid grid-cols-3 gap-3">
            {toneOptions.map(t => (
              <button
                key={t.id}
                onClick={() => toggleTone(t.id)}
                disabled={!tone.includes(t.id) && tone.length >= 2}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  tone.includes(t.id)
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300',
                  !tone.includes(t.id) && tone.length >= 2 && 'opacity-40 cursor-not-allowed'
                )}
              >
                <h3 className="font-semibold text-slate-900">{t.label}</h3>
                <p className="text-sm text-slate-500">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Color Palette *</Label>
          <div className="grid grid-cols-3 gap-3">
            {colorPalettes.map(palette => (
              <button
                key={palette.id}
                onClick={() => setColorScheme(palette.id)}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all',
                  colorScheme === palette.id
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <div className="flex h-8 rounded-lg overflow-hidden mb-2">
                  {palette.colors.map((color, idx) => (
                    <div key={idx} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Typography *</Label>
          <div className="grid grid-cols-2 gap-3">
            {fontPairings.map(font => (
              <button
                key={font.id}
                onClick={() => setFonts(font.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  fonts === font.id
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <Type className="w-5 h-5 text-slate-700 mb-2" />
                <p className="text-xs text-slate-500 mb-1">Heading: {font.heading}</p>
                <p className="text-xs text-slate-500 mb-1">Body: {font.body}</p>
                <p className="text-sm text-slate-600 italic">{font.preview}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-slate-700 font-medium mb-2 block">Layout Style *</Label>
          <div className="grid grid-cols-2 gap-3">
            {layouts.map(l => (
              <button
                key={l.id}
                onClick={() => setLayout(l.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  layout === l.id
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <Layout className="w-5 h-5 text-slate-700 mb-2" />
                <h3 className="font-semibold text-slate-900">{l.name}</h3>
                <p className="text-sm text-slate-600">{l.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={tone.length === 0 || !colorScheme || !fonts || !layout}
          className={cn(
            'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all',
            tone.length > 0 && colorScheme && fonts && layout
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Step 5: Review & Submit
function PageReviewSubmit({ formData, onSubmit, onBack, isSubmitting }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!email) return
    setSubmitted(true)
    await onSubmit(email)
  }

  if (submitted && !isSubmitting) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-20 h-20 mx-auto mb-6 text-emerald-600" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Check Your Email!</h1>
        <p className="text-lg text-slate-600 mb-6">
          We've sent your personalized website proposal to <strong>{email}</strong>
        </p>
        <GlassCard className="p-6 text-left max-w-md mx-auto">
          <h3 className="font-semibold text-slate-900 mb-3">What's Next?</h3>
          <ol className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="font-bold text-slate-900">1.</span>
              Review your personalized proposal and pricing
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-slate-900">2.</span>
              Choose the membership that fits your budget
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-slate-900">3.</span>
              Complete payment to activate your account
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-slate-900">4.</span>
              Start customizing your website immediately
            </li>
          </ol>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Review & Submit</h1>
        <p className="text-slate-600">Let's finalize your website plan</p>
      </div>

      <GlassCard className="p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Business:</span>
            <span className="font-medium text-slate-900">{formData.businessName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Industry:</span>
            <span className="font-medium text-slate-900">
              {Array.isArray(formData.industry) ? formData.industry.join(', ') : formData.industry}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Goals:</span>
            <span className="font-medium text-slate-900">{formData.goals?.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Primary CTA:</span>
            <span className="font-medium text-slate-900">{formData.primaryCta}</span>
          </div>
        </div>
      </GlassCard>

      <div>
        <Label className="text-slate-700 font-medium mb-2 block">Email Address *</Label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
        />
        <p className="text-xs text-slate-500 mt-2">We'll send your personalized proposal here</p>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!email || isSubmitting}
          className={cn(
            'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all',
            email && !isSubmitting
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating plan...
            </>
          ) : (
            <>
              Get My Personalized Proposal
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Main FullWizard Component
export default function FullWizard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    industry: [],
    businessType: '',
    yearsOperational: '',
    domain: {},
    email: {},
    businessDocs: {},
    brandAssets: {},
    goals: [],
    audience: '',
    primaryCta: '',
    tone: [],
    colorDirections: [],
    fonts: {},
    layout: ''
  })

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('fullWizardDraft', JSON.stringify(formData))
  }, [formData])

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('fullWizardDraft')
    if (draft) {
      try {
        setFormData(JSON.parse(draft))
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
  }, [])

  const handleSubmit = async (email) => {
    setIsSubmitting(true)
    try {
      const submissionEmail = user?.email || email
      if (!submissionEmail) {
        alert('Email is required')
        setIsSubmitting(false)
        return
      }

      // Create submission
      const submission = await createSubmission({
        source: 'user',
        wizardType: 'full',
        email: submissionEmail,
        wizardData: formData
      })

      // Generate report
      const report = await generateReport(submission.id)

      // Clear draft
      localStorage.removeItem('fullWizardDraft')

      // Navigate to success page
      navigate(`/wizard/success?submission=${submission.id}`)
    } catch (error) {
      console.error('Error submitting wizard:', error)
      alert('Error submitting. Please try again.')
      setIsSubmitting(false)
    }
  }

  const totalPages = 5

  return (
    <PageLayout>
      <div className="enuw-container">
        <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 100px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Progress */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: C.gray }}>Page {currentPage} of {totalPages}</span>
                <span style={{ fontSize: '13px', color: C.gray }}>{Math.round((currentPage / totalPages) * 100)}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: C.border, borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{ 
                    height: '100%', 
                    background: `linear-gradient(90deg, ${C.mint}, ${C.mintLight})`,
                    borderRadius: '2px',
                    transition: 'width 0.5s',
                    width: `${(currentPage / totalPages) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div style={{ background: 'white', border: `1px solid ${C.border}`, borderRadius: '20px', padding: '40px' }}>
          {currentPage === 1 && (
            <PageBusinessBasics
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentPage(2)}
            />
          )}
          {currentPage === 2 && (
            <PageTechnicalSetup
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentPage(3)}
              onBack={() => setCurrentPage(1)}
            />
          )}
          {currentPage === 3 && (
            <PageStrategy
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentPage(4)}
              onBack={() => setCurrentPage(2)}
            />
          )}
          {currentPage === 4 && (
            <PageDesign
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentPage(5)}
              onBack={() => setCurrentPage(3)}
            />
          )}
          {currentPage === 5 && (
            <PageReviewSubmit
              formData={formData}
              onSubmit={handleSubmit}
              onBack={() => setCurrentPage(4)}
              isSubmitting={isSubmitting}
            />
          )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
