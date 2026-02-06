/**
 * Wizard API - Conversational Engine
 * Part of byeNU Master Prompt Library - Part 1
 */

import { supabase } from '../lib/supabase.js'
import { getCurrentStage, isStageComplete, calculateProgress, STAGES } from '../config/wizard-stages.js'

/**
 * Create a new wizard session
 */
export async function createWizardSession(userId) {
  const { data, error } = await supabase
    .from('bye_nu.wizard_sessions')
    .insert({
      user_id: userId,
      current_stage: 1,
      conversation_history: [],
      extracted_data: {},
      status: 'active'
    })
    .select()
    .single()

  if (error) throw error

  // Add initial welcome message
  const stage = getCurrentStage(data)
  const welcomeMessage = await generateWelcomeMessage(stage)

  await supabase
    .from('bye_nu.wizard_messages')
    .insert({
      session_id: data.id,
      role: 'assistant',
      content: welcomeMessage,
      metadata: {
        progress: calculateProgress(data.current_stage),
        stageComplete: false
      }
    })

  return data
}

/**
 * Send a message to the wizard
 */
export async function sendWizardMessage(sessionId, userMessage, userId) {
  // Verify session ownership
  const { data: session, error: sessionError } = await supabase
    .from('bye_nu.wizard_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', userId)
    .single()

  if (sessionError || !session) {
    throw new Error('Session not found or access denied')
  }

  // Save user message
  await supabase
    .from('bye_nu.wizard_messages')
    .insert({
      session_id: sessionId,
      role: 'user',
      content: userMessage
    })

  // Get current stage
  const stage = getCurrentStage(session)

  // Process message (this would call n8n webhook or AI API)
  const response = await processWizardMessage(session, userMessage, stage)

  // Save assistant response
  await supabase
    .from('bye_nu.wizard_messages')
    .insert({
      session_id: sessionId,
      role: 'assistant',
      content: response.message,
      metadata: response.metadata
    })

  // Update extracted entities
  if (response.extractedEntities) {
    await updateExtractedEntities(sessionId, response.extractedEntities)
  }

  // Check if stage is complete
  const updatedSession = await getWizardSession(sessionId, userId)
  const stageComplete = isStageComplete(stage, updatedSession.extracted_data)

  // Update session
  let nextStage = session.current_stage
  if (stageComplete && session.current_stage < STAGES.length) {
    nextStage = session.current_stage + 1
  }

  const isComplete = stageComplete && session.current_stage === STAGES.length

  await supabase
    .from('bye_nu.wizard_sessions')
    .update({
      current_stage: nextStage,
      extracted_data: { ...session.extracted_data, ...response.extractedEntities },
      status: isComplete ? 'completed' : 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', sessionId)

  return {
    message: response.message,
    currentStage: nextStage,
    progress: calculateProgress(nextStage),
    isComplete,
    metadata: response.metadata
  }
}

/**
 * Process wizard message (calls n8n webhook or AI API)
 */
async function processWizardMessage(session, userMessage, stage) {
  // For now, use n8n webhook
  // In production, this would call the n8n workflow
  const n8nWebhookUrl = import.meta.env.VITE_N8N_WIZARD_WEBHOOK_URL

  if (n8nWebhookUrl) {
    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: session.id,
          currentStage: session.current_stage,
          stagePrompt: stage.systemPrompt,
          conversationHistory: session.conversation_history,
          extractedData: session.extracted_data,
          userMessage
        })
      })

      if (response.ok) {
        const data = await response.json()
        return {
          message: data.message || data.response,
          extractedEntities: data.entities || {},
          metadata: data.metadata || {}
        }
      }
    } catch (error) {
      console.error('n8n webhook error:', error)
      // Fall through to fallback
    }
  }

  // Fallback: Simple response (for development)
  return {
    message: generateFallbackResponse(stage, userMessage),
    extractedEntities: {},
    metadata: {
      progress: calculateProgress(session.current_stage),
      stageComplete: false
    }
  }
}

/**
 * Generate welcome message for stage
 */
async function generateWelcomeMessage(stage) {
  const messages = {
    1: "Hi! I'm NU, your AI website builder. Let's start by getting to know your business. What's the name of your business?",
    2: "Great! Now tell me about what you offer. What services or products do you provide?",
    3: "Perfect! Let's talk about your brand personality. How would you describe your business's vibe? (Think: calm, energetic, professional, playful, etc.)",
    4: "Based on what you've told me, I've curated 3 style options for your site. Let me show you...",
    5: "Now let's gather some content. Tell me about your business - what's your story?",
    6: "What functionality does your site need? I'll recommend features based on your industry.",
    7: "Here's everything we're building for you. Want to change anything?",
    8: "Almost there! Let's get your site live. Any final preferences?"
  }

  return messages[stage.id] || "Let's continue building your website!"
}

/**
 * Generate fallback response (for development)
 */
function generateFallbackResponse(stage, userMessage) {
  const responses = {
    1: "Thanks! I've noted that. What industry are you in?",
    2: "Got it! What makes your services unique?",
    3: "Perfect! I'm getting a sense of your brand. Can you give me 3-5 words that describe your vibe?",
    4: "Based on your brand, here are 3 style options. Which one resonates with you?",
    5: "Great! Tell me more about your business story.",
    6: "For your industry, I'd recommend a contact form, booking system, and gallery. Sound good?",
    7: "Here's your site summary. Everything look good?",
    8: "Perfect! Your site is ready to deploy. Let's go live!"
  }

  return responses[stage.id] || "I understand. Let's continue!"
}

/**
 * Update extracted entities
 */
async function updateExtractedEntities(sessionId, entities) {
  const updates = Object.entries(entities).map(([type, value]) => ({
    session_id: sessionId,
    entity_type: type,
    entity_value: typeof value === 'string' ? value : JSON.stringify(value),
    confidence_score: 0.9
  }))

  // Use upsert to handle updates
  for (const update of updates) {
    await supabase
      .from('bye_nu.wizard_entities')
      .upsert(update, {
        onConflict: 'session_id,entity_type'
      })
  }
}

/**
 * Get wizard session
 */
export async function getWizardSession(sessionId, userId) {
  const { data: session, error } = await supabase
    .from('bye_nu.wizard_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', userId)
    .single()

  if (error) throw error

  // Load messages
  const { data: messages } = await supabase
    .from('bye_nu.wizard_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })

  // Load entities
  const { data: entities } = await supabase
    .from('bye_nu.wizard_entities')
    .select('*')
    .eq('session_id', sessionId)

  // Reconstruct extracted data from entities
  const extractedData = {}
  entities?.forEach(entity => {
    try {
      extractedData[entity.entity_type] = JSON.parse(entity.entity_value)
    } catch {
      extractedData[entity.entity_type] = entity.entity_value
    }
  })

  return {
    ...session,
    conversationHistory: messages || [],
    extractedData: { ...session.extracted_data, ...extractedData }
  }
}

/**
 * Get user's active wizard sessions
 */
export async function getUserWizardSessions(userId) {
  const { data, error } = await supabase
    .from('bye_nu.wizard_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Resume a paused session
 */
export async function resumeWizardSession(sessionId, userId) {
  const { data, error } = await supabase
    .from('bye_nu.wizard_sessions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', sessionId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Pause a session
 */
export async function pauseWizardSession(sessionId, userId) {
  const { data, error } = await supabase
    .from('bye_nu.wizard_sessions')
    .update({
      status: 'paused',
      updated_at: new Date().toISOString()
    })
    .eq('id', sessionId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}
