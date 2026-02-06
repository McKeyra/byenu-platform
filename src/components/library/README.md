# byeNU Component Library

## Overview

This library contains reusable components for site generation. All components follow the 22C-CORP design system and can be dynamically assembled based on user conversation.

## Structure

```
components/library/
├── headers/        # Navigation components
├── heroes/         # Hero sections
├── about/          # About sections
├── features/       # Features/services sections
├── testimonials/   # Testimonial displays
├── contact/        # Contact forms and info
├── footers/        # Footer components
├── templates/      # Full page templates
└── utils/          # Utility components (buttons, cards, etc.)
```

## Usage

Components are designed to be:
1. **Data-driven**: Accept props for content customization
2. **Style-aware**: Use 22C-CORP design tokens
3. **Industry-agnostic**: Work for any business type
4. **Accessible**: WCAG 2.1 AA compliant

## Integration with Site Generation

The site generation API (`src/api/sites.js`) will:
1. Select appropriate components based on wizard data
2. Fill in content from conversation
3. Apply brand colors and styling
4. Generate final HTML/React code

## Component Metadata

Each component includes:
- `type`: Component category
- `variants`: Available style variants
- `industryTags`: Suitable industries
- `requiredProps`: Required data fields
- `optionalProps`: Optional customization
