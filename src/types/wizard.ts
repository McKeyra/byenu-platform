/**
 * Wizard Engine Types
 * Part of byeNU Master Prompt Library - Part 1
 */

export interface WizardStage {
  id: number
  name: string
  systemPrompt: string
  requiredEntities: string[]
  validationRules?: ValidationRule[]
  nextStageConditions?: NextStageCondition[]
}

export interface ValidationRule {
  field: string
  minLength?: number
  maxLength?: number
  enum?: string[]
  pattern?: string
  required?: boolean
}

export interface NextStageCondition {
  entity: string
  operator: 'equals' | 'contains' | 'exists' | 'greaterThan' | 'lessThan'
  value?: any
}

export interface WizardSession {
  id: string
  userId?: string
  currentStage: number
  conversationHistory: Message[]
  extractedData: ExtractedEntities
  templateId?: string
  status: 'active' | 'paused' | 'completed' | 'deployed'
  createdAt?: string
  updatedAt?: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  metadata?: MessageMetadata
  createdAt?: string
}

export interface MessageMetadata {
  suggestions?: string[]
  cards?: StyleCard[]
  buttons?: ActionButton[]
  images?: GeneratedImage[]
  progress?: number
  stageComplete?: boolean
}

export interface StyleCard {
  id: string
  name: string
  description: string
  colorPalette: string[]
  typography: {
    heading: string
    body: string
  }
  preview?: string
}

export interface ActionButton {
  label: string
  action: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface GeneratedImage {
  url: string
  prompt: string
  style?: string
}

export interface ExtractedEntities {
  businessName?: string
  industry?: string
  targetAudience?: string
  tagline?: string
  services?: Service[]
  uniqueValueProp?: string
  brandVoice?: string[]
  colorPalette?: ColorPalette
  selectedStyle?: string
  pages?: PageRequirement[]
  features?: Feature[]
  aboutContent?: string
  teamInfo?: TeamMember[]
  testimonials?: Testimonial[]
  reviewComplete?: boolean
  deploymentReady?: boolean
  customDomain?: string
  seoDescription?: string
}

export interface Service {
  name: string
  description: string
  price?: string
  features?: string[]
}

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
}

export interface PageRequirement {
  type: string
  required: boolean
  content?: any
}

export interface Feature {
  type: string
  enabled: boolean
  config?: any
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  image?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
  rating?: number
}

export interface WizardResponse {
  message: string
  currentStage: number
  progress: number
  isComplete: boolean
  metadata?: MessageMetadata
  extractedEntities?: Partial<ExtractedEntities>
}

export interface WizardRequest {
  sessionId: string
  message: string
  metadata?: any
}
