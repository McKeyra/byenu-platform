import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSubmission } from '../../api/submissions.js'
import { generateReport } from '../../api/reports.js'
import PageLayout from '../../components/layout/PageLayout.jsx'
import { C } from '../../theme/constants.js'
import { ArrowLeft, ArrowRight, Send, Sparkles, HelpCircle, Loader2, CheckCircle, MessageSquare } from 'lucide-react'
import { useAuth } from '../../lib/auth/AuthContext.jsx'
import { Input } from '../../components/ui/input.jsx'
import { Textarea } from '../../components/ui/textarea.jsx'
import { cn } from '../../utils/index.js'

// Step definitions with resources
const stepDefinitions = [
  {
    id: 'businessName',
    question: "What's the name of your business?",
    help: {
      what: "Your business name is the foundation of your brand identity. It will appear prominently throughout your website.",
      why: "A clear business name helps visitors immediately understand who you are and builds trust.",
      example: "Examples: 'Acme Studio', 'Smith & Associates', 'The Green Cafe'"
    },
    type: 'text',
    field: 'businessName'
  },
  {
    id: 'industry',
    question: "What industry are you in? (You can select multiple)",
    help: {
      what: "Your industry helps us customize templates, content, and features specifically for your business type.",
      why: "Different industries have different needs - a restaurant needs menus and reservations, while a law firm needs case studies and consultation forms.",
      example: "Examples: Healthcare, Legal, Restaurant, Technology, Creative Services, etc."
    },
    type: 'multi-select',
    field: 'industry',
    options: ['Healthcare', 'Legal', 'Accounting', 'Real Estate', 'Restaurant', 'Retail', 'Technology', 'Creative', 'Fitness', 'Education', 'Construction', 'Other']
  },
  {
    id: 'businessType',
    question: "How big is your team?",
    help: {
      what: "Team size helps us recommend the right features and scale for your website.",
      why: "A solo freelancer needs different features than an enterprise - we'll tailor recommendations accordingly.",
      example: "Solo/Freelancer, Small Team (2-10), Growing Business (11-50), Enterprise (50+)"
    },
    type: 'select',
    field: 'businessType',
    options: [
      { id: 'solo', label: 'Solo / Freelancer', desc: 'Just me' },
      { id: 'small', label: 'Small Team', desc: '2-10 people' },
      { id: 'medium', label: 'Growing Business', desc: '11-50 people' },
      { id: 'enterprise', label: 'Enterprise', desc: '50+ people' }
    ]
  },
  {
    id: 'businessHistory',
    question: "How long have you been in business?",
    help: {
      what: "Your business history helps us craft your brand story and position your expertise.",
      why: "Established businesses can emphasize experience, while startups can highlight innovation and fresh perspectives.",
      example: "Just Starting, 1-3 Years, 3-5 Years, 5-10 Years, 10+ Years"
    },
    type: 'select',
    field: 'yearsOperational',
    options: [
      { id: 'startup', label: 'Just Starting', desc: 'Pre-launch or less than 1 year' },
      { id: '1-3', label: '1-3 Years', desc: 'Growing and establishing' },
      { id: '3-5', label: '3-5 Years', desc: 'Established presence' },
      { id: '5-10', label: '5-10 Years', desc: 'Well-established' },
      { id: '10+', label: '10+ Years', desc: 'Industry veteran' }
    ]
  },
  {
    id: 'domain',
    question: "Do you have a custom domain? (e.g., yourbusiness.com)",
    help: {
      what: "A custom domain makes your business look professional and helps with branding.",
      why: "Having your own domain builds credibility and makes it easier for customers to find and remember you.",
      example: "Yes: 'www.yourbusiness.com' | No: We can help you get one"
    },
    type: 'yes-no',
    field: 'domain',
    followUp: {
      yes: { question: "What's your domain?", field: 'customDomain', type: 'text' },
      no: { message: "Great! We'll help you set up a domain after you claim your site." }
    }
  },
  {
    id: 'email',
    question: "Do you have a business email? (e.g., contact@yourbusiness.com)",
    help: {
      what: "A professional business email builds trust and makes you look established.",
      why: "Customers are more likely to trust and contact businesses with professional email addresses.",
      example: "Yes: 'contact@yourbusiness.com' | No: We can help set one up"
    },
    type: 'yes-no',
    field: 'email',
    followUp: {
      yes: { question: "What's your business email?", field: 'businessEmail', type: 'email' },
      no: { message: "Perfect! We can help you set up professional email with Google Workspace or Microsoft 365." }
    }
  },
  {
    id: 'businessDocs',
    question: "Tell us about your business. What do you do? (Optional - you can skip this)",
    help: {
      what: "A brief description helps us understand your business and create better content.",
      why: "The more we know about your business, the more personalized and effective your website will be.",
      example: "Example: 'We provide accounting services to small businesses in Toronto, helping them manage their finances and file taxes.'"
    },
    type: 'textarea',
    field: 'businessDescription'
  },
  {
    id: 'brandAssets',
    question: "Do you have a logo?",
    help: {
      what: "A logo helps establish your brand identity and makes your website look professional.",
      why: "A logo creates visual recognition and helps visitors remember your business.",
      example: "Yes: Upload your logo | No: We can help create one or use text-based branding"
    },
    type: 'yes-no',
    field: 'hasLogo'
  },
  {
    id: 'goals',
    question: "What are your main goals for this website? (Select all that apply)",
    help: {
      what: "Your goals determine what features and pages your website needs.",
      why: "Different goals require different features - lead generation needs forms, e-commerce needs a shop, etc.",
      example: "Generate Leads, Accept Bookings, Showcase Work, Sell Products, Provide Info, Build Community"
    },
    type: 'multi-select',
    field: 'goals',
    options: [
      { id: 'lead-gen', label: 'Generate Leads', icon: '📧' },
      { id: 'booking', label: 'Accept Bookings', icon: '📅' },
      { id: 'showcase', label: 'Showcase Work', icon: '✨' },
      { id: 'sell', label: 'Sell Products', icon: '🛍️' },
      { id: 'inform', label: 'Provide Info', icon: '📚' },
      { id: 'community', label: 'Build Community', icon: '👥' }
    ]
  },
  {
    id: 'audience',
    question: "Who is your target audience? Describe your ideal customer.",
    help: {
      what: "Understanding your audience helps us create content and design that resonates with them.",
      why: "Different audiences respond to different messaging, design styles, and features.",
      example: "Example: 'Small business owners aged 30-50 looking for accounting services in Toronto'"
    },
    type: 'textarea',
    field: 'audience'
  },
  {
    id: 'primaryCta',
    question: "What's the main action you want visitors to take?",
    help: {
      what: "Your primary call-to-action is the main button or action you want visitors to take on your site.",
      why: "A clear, compelling CTA increases conversions and helps visitors know what to do next.",
      example: "Examples: 'Get Started', 'Book a Consultation', 'Contact Us', 'Get a Quote', 'Schedule Now'"
    },
    type: 'text',
    field: 'primaryCta',
    suggestions: ['Get Started', 'Book a Consultation', 'Contact Us', 'Get a Quote', 'Schedule Now', 'Learn More']
  },
  {
    id: 'tone',
    question: "What's your brand personality? (Select up to 2)",
    help: {
      what: "Your brand tone shapes how visitors perceive your business and influences trust and engagement.",
      why: "Consistency between your website tone and real-world experience builds authenticity.",
      example: "Professional, Friendly, Bold, Playful, Minimal, Luxurious"
    },
    type: 'multi-select',
    field: 'tone',
    max: 2,
    options: [
      { id: 'professional', label: 'Professional', desc: 'Formal & trustworthy' },
      { id: 'friendly', label: 'Friendly', desc: 'Warm & approachable' },
      { id: 'bold', label: 'Bold', desc: 'Confident & direct' },
      { id: 'playful', label: 'Playful', desc: 'Fun & energetic' },
      { id: 'minimal', label: 'Minimal', desc: 'Clean & simple' },
      { id: 'luxurious', label: 'Luxurious', desc: 'Premium & elegant' }
    ]
  },
  {
    id: 'colorScheme',
    question: "What color palette represents your brand?",
    help: {
      what: "Colors evoke emotions and shape perceptions. Blue builds trust, green suggests growth, purple sparks creativity.",
      why: "Choose colors that align with your brand personality and industry standards.",
      example: "Ocean Professional (Blue), Natural Growth (Green), Creative Purple, Warm Sunset, Elegant Neutral, Modern Teal"
    },
    type: 'select',
    field: 'colorDirections',
    options: [
      { id: 'blue-professional', name: 'Ocean Professional', colors: ['#1e40af', '#3b82f6', '#06b6d4'] },
      { id: 'green-nature', name: 'Natural Growth', colors: ['#166534', '#22c55e', '#fbbf24'] },
      { id: 'purple-creative', name: 'Creative Purple', colors: ['#7c3aed', '#a855f7', '#ec4899'] },
      { id: 'warm-sunset', name: 'Warm Sunset', colors: ['#ea580c', '#f97316', '#fbbf24'] },
      { id: 'neutral-elegant', name: 'Elegant Neutral', colors: ['#1f2937', '#6b7280', '#f59e0b'] },
      { id: 'teal-modern', name: 'Modern Teal', colors: ['#0d9488', '#14b8a6', '#f43f5e'] }
    ]
  },
  {
    id: 'fonts',
    question: "What typography style matches your brand?",
    help: {
      what: "Fonts communicate personality. Clean sans-serif feels modern, serif feels elegant, rounded feels friendly.",
      why: "Typography affects readability and how visitors perceive your brand's personality.",
      example: "Modern Sans (Inter), Elegant Serif (Playfair/Lato), Bold Impact (Montserrat), Friendly Rounded (Nunito)"
    },
    type: 'select',
    field: 'fonts',
    options: [
      { id: 'modern-sans', heading: 'Inter', body: 'Inter', preview: 'Clean & Modern' },
      { id: 'elegant-serif', heading: 'Playfair Display', body: 'Lato', preview: 'Elegant & Sophisticated' },
      { id: 'bold-impact', heading: 'Montserrat', body: 'Open Sans', preview: 'Bold & Impactful' },
      { id: 'friendly-rounded', heading: 'Nunito', body: 'Nunito', preview: 'Friendly & Approachable' },
      { id: 'professional-classic', heading: 'Roboto', body: 'Roboto', preview: 'Professional & Classic' },
      { id: 'creative-unique', heading: 'Poppins', body: 'Raleway', preview: 'Creative & Unique' }
    ]
  },
  {
    id: 'layouts',
    question: "What layout style do you prefer?",
    help: {
      what: "The layout is the foundation of your website's design structure.",
      why: "Different layouts work better for different goals - centered hero for conversions, split for storytelling, etc.",
      example: "Hero Centered (conversions), Split Hero (storytelling), Minimal Clean (elegant), Card Grid (portfolios)"
    },
    type: 'select',
    field: 'layout',
    options: [
      { id: 'hero-centered', name: 'Hero Centered', desc: 'Bold headline with centered call-to-action' },
      { id: 'hero-split', name: 'Split Hero', desc: 'Image on one side, content on other' },
      { id: 'minimal-clean', name: 'Minimal Clean', desc: 'Lots of white space, simple layout' },
      { id: 'card-grid', name: 'Card Grid', desc: 'Modular card-based layout' }
    ]
  }
]

export default function AIWizard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMsg = {
        type: 'assistant',
        content: `Hi! I'm your AI assistant. I'll guide you through creating your perfect website by asking you ${stepDefinitions.length} questions. Let's start! 🚀`
      }
      setMessages([welcomeMsg])
      // Auto-ask first question
      setTimeout(() => {
        askQuestion(0)
      }, 500)
    }
  }, [])

  const askQuestion = (stepIndex) => {
    const step = stepDefinitions[stepIndex]
    if (!step) return

    const questionMsg = {
      type: 'assistant',
      content: step.question,
      stepId: step.id,
      stepIndex,
      help: step.help
    }
    setMessages(prev => [...prev, questionMsg])
  }

  const handleInput = (value) => {
    setUserInput(value)
  }

  const handleSubmit = async () => {
    if (!userInput.trim() && currentStep < stepDefinitions.length) return

    const step = stepDefinitions[currentStep]
    if (!step) return

    // Add user message
    const userMsg = {
      type: 'user',
      content: userInput.trim()
    }
    setMessages(prev => [...prev, userMsg])

    // Process answer
    let answer = userInput.trim()
    let processedData = {}

    // Handle different input types
    if (step.type === 'multi-select') {
      // For multi-select, user might type multiple items separated by commas
      const items = answer.split(',').map(s => s.trim()).filter(Boolean)
      processedData[step.field] = items
    } else if (step.type === 'select' || step.type === 'yes-no') {
      processedData[step.field] = answer
    } else {
      processedData[step.field] = answer
    }

    // Handle special field mappings
    if (step.field === 'domain') {
      processedData.domain = {
        hasCustomDomain: answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('y'),
        customDomain: answer.toLowerCase().includes('yes') ? answer : ''
      }
    } else if (step.field === 'email') {
      processedData.email = {
        hasBusinessEmail: answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('y'),
        businessEmail: answer.toLowerCase().includes('yes') ? answer : ''
      }
    } else if (step.field === 'colorDirections') {
      processedData.colorDirections = [answer]
    } else if (step.field === 'fonts') {
      const selectedFont = step.options.find(o => o.id === answer || o.heading === answer)
      processedData.fonts = {
        fontPairingId: selectedFont?.id || answer,
        headingFont: selectedFont?.heading || 'Inter',
        bodyFont: selectedFont?.body || 'Inter'
      }
    } else if (step.field === 'hasLogo') {
      processedData.brandAssets = {
        hasLogo: answer.toLowerCase().includes('yes') || answer.toLowerCase().includes('y')
      }
    } else if (step.field === 'businessDescription') {
      processedData.businessDocs = {
        businessDescription: answer
      }
    } else {
      processedData[step.field] = answer
    }

    // Update form data
    setFormData(prev => ({ ...prev, ...processedData }))

    // Add confirmation message
    const confirmMsg = {
      type: 'assistant',
      content: `Got it! ${step.type === 'multi-select' ? `You selected: ${answer}` : `You said: ${answer}`} ✅`
    }
    setMessages(prev => [...prev, confirmMsg])

    // Move to next step
    const nextStep = currentStep + 1
    setUserInput('')
    setCurrentStep(nextStep)

    if (nextStep < stepDefinitions.length) {
      setTimeout(() => {
        askQuestion(nextStep)
      }, 500)
    } else {
      // All questions answered, ask for email
      setTimeout(() => {
        const emailMsg = {
          type: 'assistant',
          content: "Perfect! I have all the information I need. What email should I send your personalized website proposal to? 📧"
        }
        setMessages(prev => [...prev, emailMsg])
      }, 500)
    }
  }

  const handleFinalSubmit = async () => {
    if (!email.trim()) return

    setIsSubmitting(true)
    const emailMsg = {
      type: 'user',
      content: email
    }
    setMessages(prev => [...prev, emailMsg])

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
        wizardType: 'ai',
        email: submissionEmail,
        wizardData: formData
      })

      // Generate report
      const report = await generateReport(submission.id)

      // Success message
      const successMsg = {
        type: 'assistant',
        content: `Excellent! I've created your personalized website proposal and sent it to ${email}. Check your email and dashboard to see your report! 🎉`
      }
      setMessages(prev => [...prev, successMsg])

      // Navigate to success page
      setTimeout(() => {
        navigate(`/wizard/success?submission=${submission.id}`)
      }, 2000)
    } catch (error) {
      console.error('Error submitting wizard:', error)
      const errorMsg = {
        type: 'assistant',
        content: 'Oops! Something went wrong. Please try again or use one of our other wizard options.'
      }
      setMessages(prev => [...prev, errorMsg])
      setIsSubmitting(false)
    }
  }

  const currentStepDef = stepDefinitions[currentStep]
  const isLastStep = currentStep >= stepDefinitions.length
  const showEmailInput = isLastStep && !isSubmitting

  return (
    <PageLayout>
      <div className="enuw-container">
        <div style={{ padding: '40px 0', minHeight: 'calc(100vh - 100px)' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${C.border}` }}>
            <button
              onClick={() => navigate('/wizard-selector')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.gray, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} style={{ color: C.mint }} />
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 600, color: C.charcoal }}>AI Builder</h1>
            </div>
            <div style={{ fontSize: '13px', color: C.gray }}>
              Step {currentStep + 1} of {stepDefinitions.length}
            </div>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Chat Interface */}
        <GlassCard className="p-6 mb-6">
          <div className="h-[500px] overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex gap-3',
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl p-4',
                    msg.type === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-900'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.help && (
                    <button
                      onClick={() => setShowHelp(msg.stepId === currentStepDef?.id ? !showHelp : true)}
                      className="mt-2 text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3" />
                      Need help?
                    </button>
                  )}
                </div>
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Help Panel */}
          {showHelp && currentStepDef?.help && (
            <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Help & Resources</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div>
                  <strong>What:</strong> {currentStepDef.help.what}
                </div>
                <div>
                  <strong>Why:</strong> {currentStepDef.help.why}
                </div>
                <div>
                  <strong>Example:</strong> {currentStepDef.help.example}
                </div>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800"
              >
                Close help
              </button>
            </div>
          )}

          {/* Input Area */}
          {!isLastStep && (
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => handleInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={currentStepDef?.type === 'textarea' ? 'Type your answer...' : 'Type your answer...'}
                className="flex-1"
              />
              <button
                onClick={handleSubmit}
                disabled={!userInput.trim()}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold transition-all',
                  userInput.trim()
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Email Input for Final Step */}
          {showEmailInput && (
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1"
              />
              <button
                onClick={handleFinalSubmit}
                disabled={!email.trim() || isSubmitting}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold transition-all',
                  email.trim() && !isSubmitting
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Submit
                    <Send className="w-5 h-5 inline ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
        </GlassCard>

        {/* Quick Suggestions (for select/multi-select types) */}
        {currentStepDef && !isLastStep && (currentStepDef.type === 'select' || currentStepDef.type === 'multi-select') && (
          <GlassCard className="p-4">
            <p className="text-sm text-slate-600 mb-3">Quick select:</p>
            <div className="flex flex-wrap gap-2">
              {currentStepDef.options?.map((opt) => {
                const label = opt.label || opt.name || opt.heading || opt.id
                return (
                  <button
                    key={opt.id || opt}
                    onClick={() => {
                      handleInput(label)
                      setTimeout(handleSubmit, 100)
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm transition-colors"
                  >
                    {opt.icon && <span className="mr-1">{opt.icon}</span>}
                    {label}
                  </button>
                )
              })}
            </div>
          </GlassCard>
        )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
