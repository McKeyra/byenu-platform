import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { C } from '../../../theme/constants.js'
import {
  MessageSquare, FileText, Edit3, Clock, RotateCcw,
  ArrowUp, ArrowDown, Copy, Trash2, Plus
} from 'lucide-react'

export default function DashboardEditor() {
  const [activeMode, setActiveMode] = useState(null)
  const [conversationInput, setConversationInput] = useState('')

  const modes = [
    { id: 'wizard', label: 'Wizard', icon: FileText, description: 'Step-by-step editing' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, description: 'Talk to NU' },
    { id: 'form', label: 'Form', icon: Edit3, description: 'Power user mode' },
  ]

  const sections = [
    { id: 'hero', name: 'Hero Section', lastEdit: '2 hours ago' },
    { id: 'about', name: 'About Section', lastEdit: '1 day ago' },
    { id: 'services', name: 'Services Section', lastEdit: '3 days ago' },
    { id: 'contact', name: 'Contact Form', lastEdit: '1 week ago' },
  ]

  return (
    <div>
      <style>{`
        .byenu-editor-header {
          margin-bottom: 32px;
        }
        .byenu-editor-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-editor-subtitle {
          color: ${C.gray};
          font-size: 16px;
        }
        .byenu-conversation-input {
          background: ${C.white};
          border: 2px solid ${C.border};
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 32px;
        }
        .byenu-conversation-label {
          font-size: 14px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 12px;
        }
        .byenu-conversation-field {
          display: flex;
          gap: 12px;
        }
        .byenu-conversation-input-field {
          flex: 1;
          padding: 14px 18px;
          border: 2px solid ${C.border};
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          color: ${C.charcoal};
          outline: none;
          transition: border-color 0.2s;
        }
        .byenu-conversation-input-field:focus {
          border-color: ${C.mint};
        }
        .byenu-conversation-submit {
          padding: 14px 24px;
          background: ${C.mint};
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-conversation-submit:hover {
          background: ${C.gold};
          color: ${C.charcoal};
        }
        .byenu-mode-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .byenu-mode-card {
          background: ${C.white};
          border: 2px solid ${C.border};
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-mode-card:hover {
          border-color: ${C.mint};
          transform: translateY(-2px);
        }
        .byenu-mode-card.active {
          border-color: ${C.mint};
          background: ${C.mintGlow};
        }
        .byenu-mode-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: ${C.mintGlow};
          color: ${C.mint};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .byenu-mode-card.active .byenu-mode-icon {
          background: ${C.mint};
          color: white;
        }
        .byenu-mode-label {
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 4px;
        }
        .byenu-mode-description {
          font-size: 13px;
          color: ${C.gray};
        }
        .byenu-sections-list {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
        }
        .byenu-section-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border: 1px solid ${C.border};
          border-radius: 12px;
          margin-bottom: 12px;
        }
        .byenu-section-item:last-child {
          margin-bottom: 0;
        }
        .byenu-section-info {
          flex: 1;
        }
        .byenu-section-name {
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 4px;
        }
        .byenu-section-meta {
          font-size: 13px;
          color: ${C.gray};
        }
        .byenu-section-actions {
          display: flex;
          gap: 8px;
        }
        .byenu-section-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid ${C.border};
          background: ${C.white};
          color: ${C.gray};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-section-btn:hover {
          border-color: ${C.mint};
          color: ${C.mint};
        }
        .byenu-timeline {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
          margin-top: 32px;
        }
        .byenu-timeline-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 20px;
        }
        .byenu-timeline-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid ${C.border};
        }
        .byenu-timeline-item:last-child {
          border-bottom: none;
        }
        .byenu-timeline-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: ${C.cream};
          color: ${C.mint};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .byenu-timeline-content {
          flex: 1;
        }
        .byenu-timeline-text {
          color: ${C.charcoal};
          font-size: 14px;
          margin-bottom: 4px;
        }
        .byenu-timeline-time {
          color: ${C.gray};
          font-size: 12px;
        }
      `}</style>

      <div className="byenu-editor-header">
        <h1 className="byenu-editor-title">Site Editor</h1>
        <p className="byenu-editor-subtitle">
          Choose how you want to edit your site
        </p>
      </div>

      {/* Conversation Input */}
      <div className="byenu-conversation-input">
        <div className="byenu-conversation-label">
          What do you want to change?
        </div>
        <div className="byenu-conversation-field">
          <input
            type="text"
            className="byenu-conversation-input-field"
            placeholder="e.g., Make the hero section bigger, change colors to blue..."
            value={conversationInput}
            onChange={(e) => setConversationInput(e.target.value)}
          />
          <button className="byenu-conversation-submit">
            <MessageSquare size={18} style={{ display: 'inline', verticalAlign: 'middle' }} /> Send
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="byenu-mode-selector">
        {modes.map(mode => {
          const Icon = mode.icon
          return (
            <div
              key={mode.id}
              className={`byenu-mode-card ${activeMode === mode.id ? 'active' : ''}`}
              onClick={() => setActiveMode(mode.id)}
            >
              <div className="byenu-mode-icon">
                <Icon size={24} />
              </div>
              <div className="byenu-mode-label">{mode.label}</div>
              <div className="byenu-mode-description">{mode.description}</div>
            </div>
          )
        })}
      </div>

      {/* Sections List */}
      <div className="byenu-sections-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Fraunces', fontSize: '20px', fontWeight: 600, color: C.charcoal }}>
            Site Sections
          </h2>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: C.mint, color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
            <Plus size={16} />
            Add Section
          </button>
        </div>
        {sections.map(section => (
          <div key={section.id} className="byenu-section-item">
            <div className="byenu-section-info">
              <div className="byenu-section-name">{section.name}</div>
              <div className="byenu-section-meta">Last edited {section.lastEdit}</div>
            </div>
            <div className="byenu-section-actions">
              <button className="byenu-section-btn" title="Move up">
                <ArrowUp size={16} />
              </button>
              <button className="byenu-section-btn" title="Move down">
                <ArrowDown size={16} />
              </button>
              <button className="byenu-section-btn" title="Duplicate">
                <Copy size={16} />
              </button>
              <button className="byenu-section-btn" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Changes Timeline */}
      <div className="byenu-timeline">
        <h2 className="byenu-timeline-title">Recent Changes</h2>
        {[
          { text: 'Updated hero section', time: '2 hours ago' },
          { text: 'Changed color scheme', time: '1 day ago' },
          { text: 'Added new testimonial', time: '2 days ago' },
        ].map((item, idx) => (
          <div key={idx} className="byenu-timeline-item">
            <div className="byenu-timeline-icon">
              <Edit3 size={16} />
            </div>
            <div className="byenu-timeline-content">
              <div className="byenu-timeline-text">{item.text}</div>
              <div className="byenu-timeline-time">{item.time}</div>
            </div>
            <button className="byenu-section-btn" title="Restore version">
              <RotateCcw size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
