# byeNU Platform

AI-powered website builder platform with a unified design system and comprehensive wizard flows.

## 🎨 Design System

Built with the **22C-CORP design system** featuring:
- **Color Palette**: Mint (#1A7A6D), Gold (#D4A843), Coral (#E8756D)
- **Typography**: DM Sans (body) + Fraunces (headings)
- **Consistent Styling**: Modern, clean, and professional

## 🚀 Features

### Three Wizard Paths
1. **Quick Wizard** - 4 pages, 2-3 minutes
2. **Full Business Wizard** - 17 comprehensive steps
3. **AI Builder** - Conversational AI guide through 17 steps

### Core Functionality
- User authentication with Supabase
- Report generation and email delivery
- Site generation after membership claim
- Dashboard for managing submissions and reports
- Internal pipeline for staff management
- Command center for admin operations

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI
- **State Management**: React Query
- **Routing**: React Router DOM
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Payments**: Stripe (with abstraction layer for future providers)
- **Email Automation**: n8n webhooks

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

1. Copy `.env.example` to `.env`
2. Add your Supabase credentials
3. Add your Stripe keys
4. Configure n8n webhook URL (optional)

## 🗄️ Database Setup

Run the migration SQL file in your Supabase dashboard:
```sql
-- See supabase-migration.sql
```

## 🚦 Development

```bash
npm run dev
```

The app will be available at `http://localhost:5174`

## 📝 Project Structure

```
src/
├── components/
│   ├── layout/          # Page layout components
│   ├── marketing/       # Landing page components
│   ├── ui/              # Reusable UI components
│   └── wizard/          # Wizard-specific components
├── pages/               # Page components
├── api/                 # API functions
├── lib/                 # Core libraries (auth, supabase, payment)
├── theme/               # Design system constants
└── utils/               # Utility functions
```

## 🌐 Live Demo

Visit: https://github.com/McKeyra/byenu-platform

## 📄 License

© 2026 Educated New United World Inc. All rights reserved.
