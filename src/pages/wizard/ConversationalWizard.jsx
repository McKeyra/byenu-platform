import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext.jsx'
import { createWizardSession, sendWizardMessage, getWizardSession } from '../../api/wizard.js'
import { calculateProgress, STAGES } from '../../config/wizard-stages.js'
import { colors, borderRadius, transitions } from '../../styles/design-system'
import { Send, Loader2, Sparkles } from 'lucide-react'

/**
 * Conversational Wizard Component
 * Part of byeNU Master Prompt Library - Part 1
 */
export default function ConversationalWizard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      if (!user) {
        navigate('/login')
        return
      }

      try {
        const session = await createWizardSession(user.id)
        setSessionId(session.id)
        setCurrentStage(session.current_stage)
        setProgress(calculateProgress(session.current_stage))

        // Load initial messages
        const fullSession = await getWizardSession(session.id, user.id)
        setMessages(fullSession.conversationHistory || [])
      } catch (error) {
        console.error('Error initializing session:', error)
      }
    }

    initSession()
  }, [user, navigate])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !sessionId) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await sendWizardMessage(sessionId, userMessage, user.id)

      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.message,
        metadata: response.metadata
      }])

      setCurrentStage(response.currentStage)
      setProgress(response.progress)
      setIsComplete(response.isComplete)

      // If complete, redirect to review/deploy
      if (response.isComplete) {
        setTimeout(() => {
          navigate(`/wizard/review?session=${sessionId}`)
        }, 1500)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  return (
    <>
      <style>{`
        .conversational-wizard {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: ${colors.bg};
          font-family: 'DM Sans', sans-serif;
        }
        .wizard-header {
          padding: 16px 24px;
          background: ${colors.white};
          border-bottom: 1px solid ${colors.border};
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .wizard-logo {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 700;
          color: ${colors.charcoal};
        }
        .wizard-logo span {
          color: ${colors.mint};
        }
        .wizard-progress {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .progress-bar {
          width: 200px;
          height: 4px;
          background: ${colors.border};
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, ${colors.mint}, ${colors.mintLight});
          transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .progress-text {
          font-size: 12px;
          font-weight: 600;
          color: ${colors.gray};
          font-family: 'JetBrains Mono', monospace;
        }
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .message {
          display: flex;
          gap: 12px;
          max-width: 80%;
          animation: messageIn 0.3s ease-out;
        }
        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .message.user .message-avatar {
          background: ${colors.charcoal};
          color: ${colors.white};
        }
        .message.assistant .message-avatar {
          background: ${colors.mint};
          color: ${colors.white};
        }
        .message-content {
          padding: 12px 16px;
          border-radius: ${borderRadius.card};
          font-size: 15px;
          line-height: 1.6;
        }
        .message.user .message-content {
          background: ${colors.charcoal};
          color: ${colors.white};
        }
        .message.assistant .message-content {
          background: ${colors.white};
          color: ${colors.charcoal};
          border: 1px solid ${colors.border};
        }
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .suggestion-chip {
          padding: 8px 14px;
          border: 1px solid ${colors.border};
          border-radius: ${borderRadius.pill};
          font-size: 13px;
          font-weight: 500;
          color: ${colors.charcoal};
          background: ${colors.white};
          cursor: pointer;
          transition: ${transitions.default};
        }
        .suggestion-chip:hover {
          border-color: ${colors.mint};
          background: ${colors.mintGlow};
          color: ${colors.mint};
        }
        .input-container {
          padding: 16px 24px;
          background: ${colors.white};
          border-top: 1px solid ${colors.border};
        }
        .input-form {
          display: flex;
          gap: 12px;
          max-width: 800px;
          margin: 0 auto;
        }
        .input-field {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid ${colors.border};
          border-radius: ${borderRadius.input};
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: ${colors.charcoal};
          background: ${colors.cream};
          outline: none;
          transition: ${transitions.default};
        }
        .input-field:focus {
          border-color: ${colors.mint};
          background: ${colors.white};
          box-shadow: 0 0 0 4px ${colors.mintGlow};
        }
        .send-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${colors.mint};
          color: ${colors.white};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: ${transitions.default};
          flex-shrink: 0;
        }
        .send-button:hover:not(:disabled) {
          background: ${colors.gold};
          color: ${colors.charcoal};
          transform: translateY(-1px);
        }
        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${colors.grayLight};
          animation: typingPulse 1.4s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typingPulse {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <div className="conversational-wizard">
        {/* Header */}
        <div className="wizard-header">
          <div className="wizard-logo">
            bye<span>NU</span>
          </div>
          <div className="wizard-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-text">
              Stage {currentStage} / {STAGES.length}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : <Sparkles size={18} />}
              </div>
              <div>
                <div className="message-content">{msg.content}</div>
                {msg.metadata?.suggestions && (
                  <div className="suggestions">
                    {msg.metadata.suggestions.map((suggestion, j) => (
                      <button
                        key={j}
                        className="suggestion-chip"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">
                <Sparkles size={18} />
              </div>
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="input-container">
          <form onSubmit={handleSend} className="input-form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isComplete ? "Site is ready! Redirecting..." : "Type your message..."}
              disabled={isLoading || isComplete}
              className="input-field"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || isComplete}
              className="send-button"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
