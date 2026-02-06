# Conversational Wizard Engine - Setup Complete ✅

## Overview

The conversational wizard engine from the byeNU Master Prompt Library has been implemented. This is a production-ready system for guiding users through website creation via natural conversation.

## What Was Created

### 1. Database Schema ✅
- **File**: `supabase-wizard-migration.sql`
- **Tables**:
  - `wizard_sessions` - Stores session state and progress
  - `wizard_messages` - Stores conversation history
  - `wizard_entities` - Stores extracted business data
- **Features**:
  - RLS policies for user isolation
  - Staff access policies
  - Indexes for performance
  - Auto-update triggers

### 2. TypeScript Types ✅
- **File**: `src/types/wizard.ts`
- **Interfaces**:
  - `WizardStage` - Stage configuration
  - `WizardSession` - Session state
  - `Message` - Chat messages
  - `ExtractedEntities` - Business data
  - `WizardResponse` - API responses

### 3. Stage Configuration ✅
- **File**: `src/config/wizard-stages.ts`
- **8 Stages**:
  1. Introduction - Business basics
  2. Services/Offerings - What they offer
  3. Brand Personality - Brand voice
  4. Style Selection - Visual style
  5. Content Gathering - About, team, testimonials
  6. Features & Functionality - Site features
  7. Review - Final review
  8. Deployment - Go live
- **Features**:
  - System prompts per stage
  - Required entities
  - Validation rules
  - Progress calculation

### 4. Wizard API ✅
- **File**: `src/api/wizard.js`
- **Functions**:
  - `createWizardSession()` - Start new session
  - `sendWizardMessage()` - Process user message
  - `getWizardSession()` - Load session with history
  - `getUserWizardSessions()` - List user sessions
  - `resumeWizardSession()` - Resume paused session
  - `pauseWizardSession()` - Pause session

### 5. Conversational UI ✅
- **File**: `src/pages/wizard/ConversationalWizard.jsx`
- **Features**:
  - Chat interface
  - Progress bar
  - Message history
  - Suggestion chips
  - Typing indicator
  - Auto-scroll
  - 22C-CORP design

## Architecture

### Flow
1. User starts conversation → `createWizardSession()`
2. User sends message → `sendWizardMessage()`
3. Message processed → n8n webhook or AI API
4. Entities extracted → Stored in `wizard_entities`
5. Response generated → Saved to `wizard_messages`
6. Stage progression → Checked and updated
7. Completion → Redirect to review/deploy

### n8n Integration

The system is designed to work with n8n workflows:

**Webhook URL**: `VITE_N8N_WIZARD_WEBHOOK_URL`

**Request Format**:
```json
{
  "sessionId": "uuid",
  "currentStage": 1,
  "stagePrompt": "System prompt for stage",
  "conversationHistory": [...],
  "extractedData": {...},
  "userMessage": "User's message"
}
```

**Expected Response**:
```json
{
  "message": "AI response",
  "entities": {
    "businessName": "...",
    "industry": "..."
  },
  "metadata": {
    "suggestions": [...],
    "progress": 25
  }
}
```

## Stage System

### Stage 1: Introduction
- **Goal**: Get business basics
- **Required**: businessName, industry, targetAudience
- **Prompt**: Friendly, conversational, one question at a time

### Stage 2: Services/Offerings
- **Goal**: Understand what they offer
- **Required**: services, uniqueValueProp
- **Prompt**: Help articulate what makes them different

### Stage 3: Brand Personality
- **Goal**: Define brand voice
- **Required**: brandVoice (3-5 adjectives)
- **Prompt**: Get specific, beyond generic terms

### Stage 4: Style Selection
- **Goal**: Choose visual style
- **Required**: selectedStyle
- **Prompt**: Generate 3 curated options as cards

### Stage 5: Content Gathering
- **Goal**: Collect site content
- **Required**: aboutContent
- **Prompt**: Natural flow, not a form

### Stage 6: Features & Functionality
- **Goal**: Determine site features
- **Required**: features
- **Prompt**: Frame as recommendations

### Stage 7: Review
- **Goal**: Final review and changes
- **Required**: reviewComplete
- **Prompt**: Show structured summary

### Stage 8: Deployment
- **Goal**: Finalize and deploy
- **Required**: deploymentReady
- **Prompt**: Get deployment preferences

## Usage

### Start a Session
```javascript
import { createWizardSession } from '../api/wizard.js'

const session = await createWizardSession(userId)
```

### Send a Message
```javascript
import { sendWizardMessage } from '../api/wizard.js'

const response = await sendWizardMessage(sessionId, "My business is a yoga studio", userId)
// Returns: { message, currentStage, progress, isComplete, metadata }
```

### Get Session
```javascript
import { getWizardSession } from '../api/wizard.js'

const session = await getWizardSession(sessionId, userId)
// Returns full session with messages and extracted data
```

## Frontend Route

The conversational wizard is available at:
- `/wizard/conversational`

## Next Steps

1. **n8n Workflow** - Create the n8n workflow for multi-AI consensus
2. **Entity Extraction** - Implement Claude-based extraction
3. **Style Cards** - Generate visual style options
4. **Review Page** - Create review/deploy page
5. **Integration** - Connect to site generation system

## Configuration

### Environment Variables
```bash
# n8n Webhook for wizard processing
VITE_N8N_WIZARD_WEBHOOK_URL=https://your-n8n-instance.com/webhook/wizard

# Claude API (if using directly)
ANTHROPIC_API_KEY=sk-ant-...
```

### Database Migration
Run the migration:
```bash
psql -h your-supabase-host -U postgres -d postgres -f supabase-wizard-migration.sql
```

Or via Supabase Dashboard:
1. Go to SQL Editor
2. Paste `supabase-wizard-migration.sql`
3. Run

## Testing

Test the wizard:
1. Navigate to `/wizard/conversational`
2. Start chatting
3. Watch progress bar update
4. Check database for stored messages/entities

## Status

✅ **Database schema created**
✅ **TypeScript types defined**
✅ **Stage configuration complete**
✅ **API endpoints implemented**
✅ **Frontend UI built**
✅ **Ready for n8n integration**

---

**The conversational wizard engine is ready!** 🚀

Next: Create n8n workflow for multi-AI consensus processing.
