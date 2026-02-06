# Extracted Features Documentation

## Overview
This document outlines the logic, database structures, and templates extracted from the three documents and integrated into the byeNU platform while maintaining the current 22C-CORP design system.

## 1. Prompt Engineering System

### Location
- **API**: `src/api/prompts.js`
- **Component**: Extracted from `prompt-perfect-ai-884e13be/src/pages/PromptEnhancer.jsx`

### Features Extracted
- **Prompt Analysis**: Analyzes user prompts and generates clarifying questions
- **Prompt Enhancement**: Enhances prompts with user answers and context
- **Category-Based Templates**: Templates for different content categories (website, marketing, content)
- **Platform Support**: Supports OpenAI and Claude platforms

### Database Schema
No database changes required - this is a stateless API service.

### API Functions
```javascript
// Analyze prompt and get questions
analyzePrompt({ prompt, category, type, context })

// Enhance prompt with answers
enhancePrompt({ originalPrompt, answers, category, type, platform })

// Get prompt templates
getPromptTemplates(category)
```

### Integration Points
- Can be integrated into wizard flows for content generation
- Can be used in the Builder page for AI-assisted editing
- Can be used in the Dashboard for prompt optimization

---

## 2. LLM Ensemble / Multi-LLM Decision Making

### Location
- **API**: `src/api/llm-ensemble.js`
- **Component**: `src/components/dashboard/LLMEnsemble.jsx`

### Features Extracted
- **Multi-LLM Consensus**: Merges decisions from multiple LLMs (GPT-4, Claude-3, Gemini)
- **Weighted Voting**: Each LLM has a weight for consensus calculation
- **Confidence Scoring**: Provides confidence levels for decisions
- **Business Recommendations**: Specialized function for business-related decisions

### Database Schema
No database changes required - this is a stateless API service.

### API Functions
```javascript
// Get ensemble decision from multiple LLMs
getEnsembleDecision({ prompt, question, options })

// Get business recommendation using ensemble
getBusinessRecommendation({ wizardData, question, options })
```

### Integration Points
- Dashboard: For AI-assisted decision making
- Wizard flows: For recommendations during wizard steps
- Report generation: For generating consensus-based reports
- Command Center: For staff decision support

### Visual Representation
The `LLMEnsemble` component displays:
- Individual model status (Ready, Thinking, Complete, Error)
- Consensus decision with confidence bar
- Agreement percentage
- Model breakdown showing individual votes
- Individual responses from each model

---

## 3. Enhanced Dashboard with Depth Levels and Chat Modes

### Location
- **Enhanced Dashboard**: `src/pages/DashboardEnhanced.jsx`
- **Updated Dashboard**: `src/pages/Dashboard.jsx` (includes chat tab)

### Features Extracted

#### Depth Levels
Three levels of information depth:
1. **Overview** (Depth 1): High-level summary
   - Basic status information
   - Key metrics
   - Quick actions

2. **Detailed** (Depth 2): In-depth analysis
   - Expanded report details
   - Font and imagery information
   - Additional context

3. **Expert** (Depth 3): Technical deep dive
   - Full report breakdown
   - Build prompts
   - Technical specifications
   - Complete monetization details

#### Chat Modes
Three different chat interaction modes:
1. **AI Assistant**: General-purpose AI help
   - Friendly, helpful responses
   - General website guidance

2. **Conversational**: Casual, friendly tone
   - More relaxed interactions
   - User-friendly explanations

3. **Technical**: Technical deep dive
   - System components
   - Technical specifications
   - Advanced features

#### Visual View Modes
Three ways to view dashboard data:
1. **Cards**: Card-based layout with stats
2. **List**: Detailed list view
3. **Visual**: Visual/graphical representation

### Database Schema
No database changes required - uses existing `submissions` and `reports` tables.

### Integration Points
- **User Dashboard**: Enhanced with depth levels, chat modes, and visual views
- **Admin Dashboard**: Can switch between admin and user views
- **Command Center**: Staff can toggle to see user experience

### Visual Features
- **Depth Selector**: Toggle between Overview, Detailed, and Expert views
- **Chat Interface**: Full chat UI with message history
- **View Toggle**: Switch between Cards, List, and Visual modes
- **Stats Grid**: Visual representation of key metrics
- **Responsive Design**: Works on all screen sizes

---

## Design System Compliance

All extracted features maintain the **22C-CORP Design System**:
- **Colors**: Uses `C.mint`, `C.gold`, `C.coral`, `C.cream`, `C.charcoal`
- **Typography**: Uses 'Fraunces' for headings, 'DM Sans' for body
- **Spacing**: Consistent padding and margins
- **Border Radius**: 12px, 16px, 20px for cards and containers
- **Transitions**: Smooth 0.2s-0.3s transitions
- **Icons**: Lucide React icons throughout

---

## Usage Examples

### Prompt Engineering
```javascript
import { analyzePrompt, enhancePrompt } from '../api/prompts.js'

// Analyze a prompt
const { questions } = await analyzePrompt({
  prompt: "Create a website for my yoga studio",
  category: "website",
  type: "hero"
})

// Enhance with answers
const { enhancedPrompt } = await enhancePrompt({
  originalPrompt: "Create a website for my yoga studio",
  answers: { audience: "Busy professionals", tone: "Calm" },
  category: "website",
  type: "hero"
})
```

### LLM Ensemble
```javascript
import { getEnsembleDecision } from '../api/llm-ensemble.js'

// Get consensus decision
const result = await getEnsembleDecision({
  prompt: "Business context...",
  question: "What color scheme should we use?",
  options: ["Light & Airy", "Dark & Bold", "Warm & Earthy"]
})

console.log(result.decision) // Consensus decision
console.log(result.confidence) // Confidence level
console.log(result.breakdown) // Model breakdown
```

### Dashboard Depth Levels
```javascript
// In Dashboard component
const [depthLevel, setDepthLevel] = useState('overview')

// Render based on depth
{depthLevel === 'overview' && <OverviewView />}
{depthLevel === 'detailed' && <DetailedView />}
{depthLevel === 'expert' && <ExpertView />}
```

---

## Next Steps

1. **Connect to Real LLM APIs**: Replace mock implementations with actual OpenAI, Anthropic, and Google API calls
2. **Add Chat History**: Store chat messages in database for persistence
3. **Implement Real-time Updates**: Use Supabase real-time subscriptions for live updates
4. **Add More Chat Modes**: Expand chat modes based on user feedback
5. **Enhance Visual Views**: Add charts and graphs for visual representation
6. **Add Export Features**: Allow users to export reports and chat conversations

---

## Files Created/Modified

### New Files
- `src/api/prompts.js` - Prompt engineering API
- `src/api/llm-ensemble.js` - LLM ensemble API
- `src/components/dashboard/LLMEnsemble.jsx` - LLM ensemble component
- `src/pages/DashboardEnhanced.jsx` - Enhanced dashboard with all features

### Modified Files
- `src/pages/Dashboard.jsx` - Added chat tab and enhanced features
- `src/App.jsx` - (Optional) Add route for enhanced dashboard if needed

---

## Testing

To test the extracted features:

1. **Prompt Engineering**: Navigate to a wizard and test prompt enhancement
2. **LLM Ensemble**: Use the ensemble component in dashboard or wizard
3. **Dashboard Depth**: Toggle between depth levels in the dashboard
4. **Chat Modes**: Switch between chat modes and test conversations
5. **Visual Views**: Toggle between Cards, List, and Visual modes

---

## Notes

- All features maintain backward compatibility
- Mock implementations are provided for development
- Real LLM API integration requires API keys and proper error handling
- All components are responsive and follow the 22C-CORP design system
