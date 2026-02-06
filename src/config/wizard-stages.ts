/**
 * Wizard Stage Configuration
 * Part of byeNU Master Prompt Library - Part 1
 */

import { WizardStage } from '../types/wizard.js'

export const INDUSTRY_LIST = [
  'Restaurant & Food',
  'Health & Fitness',
  'Professional Services',
  'Retail & E-commerce',
  'Real Estate',
  'Creative & Design',
  'Education & Coaching',
  'Technology',
  'Non-profit',
  'Events & Entertainment',
  'Construction & Trades',
  'Beauty & Wellness',
  'Legal Services',
  'Financial Services',
  'Consulting',
  'Other'
]

export const STAGES: WizardStage[] = [
  {
    id: 1,
    name: 'Introduction',
    systemPrompt: `You are the byeNU website builder assistant. Start a friendly conversation to get business basics.

Required information:
- Business name
- Industry/type
- Target audience
- Tagline (optional)

Style: Friendly, conversational, one question at a time. Show genuine interest. Don't make it feel like a form.`,
    requiredEntities: ['businessName', 'industry', 'targetAudience'],
    validationRules: [
      { field: 'businessName', minLength: 2, maxLength: 100, required: true },
      { field: 'industry', enum: INDUSTRY_LIST, required: true },
      { field: 'targetAudience', minLength: 10, required: true }
    ]
  },
  
  {
    id: 2,
    name: 'Services/Offerings',
    systemPrompt: `Now that I know about {{ businessName }}, let's talk about what you offer.

Extract:
- Services/products (list)
- Key features/benefits
- Unique value proposition

Keep it conversational. Help them articulate what makes them different. Ask follow-up questions if needed.`,
    requiredEntities: ['services', 'uniqueValueProp'],
    validationRules: [
      { field: 'services', required: true },
      { field: 'uniqueValueProp', minLength: 20, required: true }
    ]
  },
  
  {
    id: 3,
    name: 'Brand Personality',
    systemPrompt: `Let's define {{ businessName }}'s brand personality.

Extract:
- 3-5 brand voice adjectives (e.g., "calm", "energetic", "professional", "playful")
- Visual style preferences
- Competitor references (optional)

Help them think beyond "professional" and "innovative" - get specific. Use examples if they're stuck.`,
    requiredEntities: ['brandVoice'],
    validationRules: [
      { field: 'brandVoice', required: true },
      { field: 'brandVoice', minLength: 3 } // At least 3 adjectives
    ]
  },
  
  {
    id: 4,
    name: 'Style Selection',
    systemPrompt: `Based on {{ industry }} and {{ brandVoice }}, generate 3 curated style options.

Each should include:
- Name (e.g., "Modern Minimal", "Warm & Inviting", "Bold & Energetic")
- Description (why it works for their business)
- Color palette (4 colors in hex)
- Typography pairing (heading + body fonts)
- Component style notes

Return as cards the user can select. Make them feel personalized, not generic.`,
    requiredEntities: ['selectedStyle'],
    validationRules: [
      { field: 'selectedStyle', required: true }
    ]
  },
  
  {
    id: 5,
    name: 'Content Gathering',
    systemPrompt: `Let's gather content for your site.

Extract:
- About story (2-3 paragraphs)
- Team info (if applicable)
- Testimonials (if they have them)
- Service descriptions (detailed)

Keep it flowing naturally. Don't make it feel like a form. If they don't have testimonials, that's fine - we can generate placeholder ones.`,
    requiredEntities: ['aboutContent'],
    validationRules: [
      { field: 'aboutContent', minLength: 100, required: true }
    ]
  },
  
  {
    id: 6,
    name: 'Features & Functionality',
    systemPrompt: `What functionality does your site need?

Suggest based on {{ industry }}:
- Contact form (always included)
- Booking/scheduling? (for service businesses)
- E-commerce? (for retail)
- Blog? (for content marketing)
- Gallery? (for creative/portfolio)
- Newsletter signup?

Frame as recommendations, not questions. "For a {{ industry }} business, I'd recommend..."`,
    requiredEntities: ['features'],
    validationRules: [
      { field: 'features', required: true }
    ]
  },
  
  {
    id: 7,
    name: 'Review',
    systemPrompt: `Here's what we're building for {{ businessName }}:

[Show structured summary with all extracted data]

Anything you want to change or add? This is your chance to refine everything before we build.`,
    requiredEntities: ['reviewComplete'],
    validationRules: [
      { field: 'reviewComplete', required: true }
    ]
  },
  
  {
    id: 8,
    name: 'Deployment',
    systemPrompt: `Final step! Let's get your site live.

- Custom domain? (optional - can add later)
- SEO meta description (I'll suggest one based on your business)
- Analytics setup (Google Analytics, optional)

Then we deploy! Your site will be live in under 60 seconds.`,
    requiredEntities: ['deploymentReady'],
    validationRules: [
      { field: 'deploymentReady', required: true }
    ]
  }
]

/**
 * Get stage by ID
 */
export function getStage(stageId: number): WizardStage | undefined {
  return STAGES.find(s => s.id === stageId)
}

/**
 * Get current stage for session
 */
export function getCurrentStage(session: { currentStage: number }): WizardStage {
  return STAGES[session.currentStage - 1] || STAGES[0]
}

/**
 * Check if stage requirements are met
 */
export function isStageComplete(
  stage: WizardStage,
  extractedData: Record<string, any>
): boolean {
  return stage.requiredEntities.every(entity => {
    const value = extractedData[entity]
    if (value === undefined || value === null) return false
    
    // Check validation rules
    const rule = stage.validationRules?.find(r => r.field === entity)
    if (rule) {
      if (rule.required && !value) return false
      if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) return false
      if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) return false
      if (rule.enum && !rule.enum.includes(value)) return false
    }
    
    return true
  })
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(currentStage: number, totalStages: number = STAGES.length): number {
  return Math.round((currentStage / totalStages) * 100)
}
