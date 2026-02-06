# Component Library Integration

## Overview

The component library has been integrated into the byeNU platform for dynamic site generation. Components follow the 22C-CORP design system and can be assembled based on user conversation.

## Structure

```
src/components/library/
├── headers/
│   └── StickyHeader.jsx      # Sticky navigation with scroll effects
├── heroes/
│   └── CenteredHero.jsx      # Centered hero section
├── index.js                   # Component exports and metadata
└── README.md                  # Library documentation

src/api/
└── component-library.js       # Component selection and generation API
```

## How It Works

1. **User completes wizard** → Wizard data collected
2. **Component selection** → `selectComponents()` picks appropriate components based on:
   - Industry type
   - Business type
   - Desired pages
   - Tone preferences
   - Color directions
3. **Props generation** → `generateComponentProps()` fills components with:
   - Business name
   - Business description
   - Audience info
   - Brand colors
   - CTA text
4. **Page structure** → `generatePageStructure()` creates ordered component list
5. **Site generation** → Components rendered and stored in database

## Integration Points

### Site Generation API (`src/api/sites.js`)

```javascript
import { generatePageStructure } from './component-library.js'

// In generateSite():
const pageStructure = generatePageStructure(wizardData)
const template = await createLayoutTemplate(..., pageStructure)
```

### Component Storage

Component structure is stored in `bye_nu.layout_templates.component_structure`:

```json
[
  {
    "type": "header",
    "component": "StickyHeader",
    "variant": "sticky-transparent",
    "props": { "logo": "My Business", "navItems": [...] },
    "order": 0
  },
  {
    "type": "hero",
    "component": "CenteredHero",
    "variant": "centered",
    "props": { "headline": "...", "subtext": "..." },
    "order": 1
  }
]
```

## Available Components

### Headers
- **StickyHeader** - Transparent → solid on scroll, mobile menu

### Heroes
- **CenteredHero** - Centered content with gradient background

### Coming Soon
- About sections (Story, Team, Timeline, Values)
- Features/Services (Grid, Tabs, Cards, List)
- Testimonials (Carousel, Grid, Single)
- Contact (Form, Map, Info Cards)
- Footers (Standard, Minimal, Full Navigation)

## Usage Example

```javascript
import { selectComponents, generateComponentProps } from '../api/component-library.js'

// Select components for a yoga studio
const wizardData = {
  industry: 'Health & Fitness',
  businessName: 'Sunrise Yoga',
  businessDescription: 'Yoga classes for stressed professionals',
  desiredPages: ['Home', 'About', 'Services', 'Contact'],
  tone: ['Calm', 'Natural', 'Warm'],
  colorDirections: ['light']
}

const components = selectComponents(wizardData)
const heroProps = generateComponentProps('hero', 'centered', wizardData)
```

## Next Steps

1. **Add remaining components** from the provided library
2. **Create component renderer** to convert structure to React/HTML
3. **Add component preview** in dashboard
4. **Implement component editing** (swap components, edit props)
5. **Add more variants** per component type

## Component Metadata

Each component includes:
- `type`: Component category (header, hero, about, etc.)
- `variants`: Available style variants
- `industryTags`: Suitable industries (or 'all')
- `requiredProps`: Required data fields
- `optionalProps`: Optional customization

This metadata helps the AI select the right components for each business type.
