# Dashboard System Build Prompts
## Sequential Build Instructions for byeNU Client Dashboard & ENUW Key Master Dashboard

---

## PROMPT 1: Design Systems & Constants

**Task**: Create design system constants for both dashboards.

**Files to Create**:
- `src/theme/sport-constants.js` - 22C-SPORT design system (dark, athletic, Ball in the 6 aesthetic)
- Update `src/theme/constants.js` - Ensure 22C-CORP is complete

**Requirements**:
- 22C-SPORT: Dark base (#0a0a0a), electric blue primary (#0066FF), venture colors (Vance purple, B6 orange, Wear US green, enuwWEB blue, THE KEY gold)
- 22C-CORP: Mint (#1A7A6D), gold (#D4A843), coral (#E8756D), cream backgrounds
- Typography: Inter for SPORT, Fraunces/DM Sans for CORP
- Export constants as `S` (sport) and `C` (corp)

**Acceptance Criteria**:
- ✅ Both design systems exported and ready to use
- ✅ All colors defined with proper hex values
- ✅ Typography families specified
- ✅ Shadow and border constants included

---

## PROMPT 2: byeNU Client Dashboard Layout

**Task**: Create the byeNU Client Dashboard layout component with sidebar navigation.

**Files to Create**:
- `src/components/dashboard/byenu/ByenuDashboardLayout.jsx`

**Requirements**:
- Sidebar with byeNU logo
- Navigation items: Overview, Editor, Pages, Analytics, Abilities, Settings
- User section at bottom with avatar, plan badge, "Chat with NU" button
- Mobile-responsive with hamburger menu
- Active state styling (mint left-border, mint text, mintGlow background)
- Use 22C-CORP design system

**Acceptance Criteria**:
- ✅ Sidebar renders correctly
- ✅ Navigation highlights active route
- ✅ Mobile menu works
- ✅ Matches 22C-CORP aesthetic

---

## PROMPT 3: byeNU Dashboard Pages - Overview & Editor

**Task**: Build the Overview and Editor pages for byeNU dashboard.

**Files to Create**:
- `src/pages/dashboard/byenu/DashboardOverview.jsx`
- `src/pages/dashboard/byenu/DashboardEditor.jsx`

**Overview Page Requirements**:
- Welcome message with business name
- Site health card (uptime, last edit, visitors)
- Quick actions (Edit with NU, View Live Site, Invite Team)
- Metrics cards (visitors 7d/30d, credit balance)
- Recent activity feed

**Editor Page Requirements**:
- "What do you want to change?" conversational input
- Three mode selector (Wizard, Chat, Form)
- Site sections list with reorder/duplicate/delete controls
- Recent changes timeline with version restore

**Acceptance Criteria**:
- ✅ Both pages render with mock data
- ✅ Interactive elements work (buttons, inputs)
- ✅ Matches 22C-CORP design system
- ✅ Responsive layout

---

## PROMPT 4: byeNU Dashboard Pages - Pages, Analytics, Abilities

**Task**: Build the Pages Manager, Analytics, and Abilities pages.

**Files to Create**:
- `src/pages/dashboard/byenu/DashboardPages.jsx`
- `src/pages/dashboard/byenu/DashboardAnalytics.jsx`
- `src/pages/dashboard/byenu/DashboardAbilities.jsx`

**Pages Page Requirements**:
- Grid/list view of all site pages
- Each page card: thumbnail, title, status (Published/Draft/Hidden), last edited
- Add Page button
- Search functionality

**Analytics Page Requirements**:
- Visitor metrics (unique visitors, page views, avg time, bounce rate)
- Date range selector (7d/30d/90d/custom)
- Chart placeholder for trends
- Top pages table
- Traffic sources breakdown

**Abilities Page Requirements**:
- Grid of ability cards (Contact Form, Booking, E-commerce, Blog, Analytics, Newsletter)
- Each card: icon, name, status (Active/Paused/Setup Needed), stats, config button
- Status indicators with colors

**Acceptance Criteria**:
- ✅ All three pages render correctly
- ✅ Interactive elements functional
- ✅ Mock data displays properly
- ✅ Matches 22C-CORP design

---

## PROMPT 5: byeNU Dashboard Pages - Settings

**Task**: Build the Settings page with tabs.

**Files to Create**:
- `src/pages/dashboard/byenu/DashboardSettings.jsx`

**Requirements**:
- Tab navigation: Site Info, Team, Billing, Domain, Danger Zone
- Site Info: Business name, subdomain, custom domain
- Team: Invite members, role management (Admin/Editor/Viewer)
- Billing: Current plan, credit balance, upgrade CTA
- Domain: Custom domain setup, SSL status
- Danger Zone: Archive site, export code

**Acceptance Criteria**:
- ✅ All tabs render correctly
- ✅ Forms are functional
- ✅ Team member list displays
- ✅ Danger zone styled appropriately

---

## PROMPT 6: ENUW Key Master Dashboard Layout

**Task**: Create the ENUW Key Master Dashboard layout with dark theme.

**Files to Create**:
- `src/components/dashboard/enuw/EnuwDashboardLayout.jsx`

**Requirements**:
- Dark sidebar with ENUW logo (gold)
- Navigation sections: PORTFOLIO, PIPELINE, OPERATIONS
- Venture quick-switch (4 colored dots at bottom)
- User section with avatar and "Key Master" role badge
- THE KEY AI query bar (collapsible, persistent)
- Use 22C-SPORT design system
- Mobile-responsive

**Acceptance Criteria**:
- ✅ Dark theme applied correctly
- ✅ Navigation works
- ✅ Venture colors display properly
- ✅ Matches 22C-SPORT aesthetic

---

## PROMPT 7: ENUW Key Master - Command Center

**Task**: Build the Command Center (main dashboard) page.

**Files to Create**:
- `src/pages/dashboard/enuw/CommandCenter.jsx`

**Requirements**:
- Portfolio Pulse Strip: Total MRR, Cash Position, Active Users, Momentum Vector
- Vitality Index Cards (4 cards, one per venture):
  - Venture logo/name with color thread
  - Vitality Index score (0-100)
  - 3 key metrics per venture
  - Status indicator (Healthy/Attention/Critical)
- Hot Leads Panel (top 5 leads)
- Recent Activity Feed (cross-portfolio)
- Large mono numbers, small uppercase labels

**Acceptance Criteria**:
- ✅ All metrics display correctly
- ✅ Venture cards are clickable (link to deep-dive)
- ✅ Mock data renders properly
- ✅ Matches 22C-SPORT design

---

## PROMPT 8: ENUW Key Master - Pipeline & Leads

**Task**: Build the Pipeline Board and Leads Management pages.

**Files to Create**:
- `src/pages/dashboard/enuw/PipelineBoard.jsx`
- `src/pages/dashboard/enuw/LeadsManagement.jsx`

**Pipeline Board Requirements**:
- 5-column Kanban board: Discovery → Proposal → Negotiation → Contract → Closed
- Deal cards with company name, value, stage, days in stage, assigned owner
- Board metrics strip (total pipeline, weighted value, avg velocity)
- Venture color indicators on cards

**Leads Management Requirements**:
- Filterable table: company, AI6 score, tier, venture, last contact, created
- Search functionality
- Lead detail slideout (on click)
- Tier badges (Hot/Warm/Monitor)
- Sortable columns

**Acceptance Criteria**:
- ✅ Pipeline board displays deals correctly
- ✅ Leads table renders properly
- ✅ Filters and search work
- ✅ Matches 22C-SPORT design

---

## PROMPT 9: ENUW Key Master - AI6 Scoring & Golden Hour

**Task**: Build the AI6 Scoring Engine and Golden Hour pages.

**Files to Create**:
- `src/pages/dashboard/enuw/AI6Scoring.jsx`
- `src/pages/dashboard/enuw/GoldenHour.jsx`

**AI6 Scoring Requirements**:
- Live scoring form (company name, industry, city, website, email, owner name, employee count)
- Real-time AI6 calculation as fields populate
- 7-dimension breakdown with animated score ring
- Visual bars for each dimension with weights
- "Save as Lead" button

**Golden Hour Requirements**:
- Golden Hour window display (11:11am - 2:22pm)
- Today's priority list (auto-generated)
- Quick-action buttons (top 3 most impactful actions)
- Timer/focus mode
- Cross-venture checklist

**Acceptance Criteria**:
- ✅ Scoring form calculates score
- ✅ Dimension breakdown displays
- ✅ Golden Hour page renders correctly
- ✅ Matches 22C-SPORT design

---

## PROMPT 10: ENUW Key Master - Venture Deep-Dive & Reports

**Task**: Build the Venture Deep-Dive and Reports pages.

**Files to Create**:
- `src/pages/dashboard/enuw/VentureDeepDive.jsx`
- `src/pages/dashboard/enuw/Reports.jsx`

**Venture Deep-Dive Requirements**:
- Full-page view for each venture (dynamic route `/key/venture/:id`)
- Revenue chart (90d default)
- KPI grid (venture-specific metrics)
- Pipeline stage visualization
- Cash flow waterfall
- Top customers by revenue
- Action buttons

**Reports Requirements**:
- Auto-generated weekly/monthly reports
- Custom report builder
- PDF export functionality
- Report cards with download buttons
- Report metadata (type, date, status)

**Acceptance Criteria**:
- ✅ Venture page displays correct venture data
- ✅ Reports page lists available reports
- ✅ Download buttons functional
- ✅ Matches 22C-SPORT design

---

## PROMPT 11: Dashboard Route Integration

**Task**: Integrate both dashboards into App.jsx routing.

**Files to Update**:
- `src/App.jsx`

**Requirements**:
- Add byeNU dashboard routes under `/dashboard/*`
- Add ENUW Key Master routes under `/key/*`
- Create wrapper components for nested routing
- Ensure both dashboards are protected routes (require auth)

**Files to Create**:
- `src/pages/dashboard/byenu/ByenuDashboard.jsx` - Route wrapper
- `src/pages/dashboard/enuw/EnuwDashboard.jsx` - Route wrapper

**Acceptance Criteria**:
- ✅ All routes work correctly
- ✅ Navigation between pages functions
- ✅ Both dashboards accessible
- ✅ No route conflicts

---

## PROMPT 12: Supabase Schema & Database Setup

**Task**: Create database schema for dashboard data.

**Files to Create**:
- `supabase-dashboard-schema.sql`

**Requirements**:
- Tables: ventures, metrics, leads, deals, activities, websites, analytics_events, credits, team_members
- Indexes for performance
- RLS policies for security
- Updated_at triggers
- Initial data (4 ventures)

**Acceptance Criteria**:
- ✅ All tables created
- ✅ Indexes in place
- ✅ RLS policies configured
- ✅ Initial data inserted

---

## PROMPT 13: API Integration & Data Fetching

**Task**: Connect dashboards to Supabase for real data.

**Files to Create**:
- `src/api/dashboard.js` - Dashboard API functions
- `src/api/ventures.js` - Venture data functions
- `src/api/leads.js` - Leads management functions
- `src/api/pipeline.js` - Pipeline/deals functions

**Requirements**:
- Replace mock data with Supabase queries
- Add loading states
- Add error handling
- Implement real-time subscriptions where needed
- Use React Query for caching

**Acceptance Criteria**:
- ✅ Data fetches from Supabase
- ✅ Loading states display
- ✅ Errors handled gracefully
- ✅ Real-time updates work

---

## PROMPT 14: Testing & Polish

**Task**: Test both dashboards end-to-end and polish UI.

**Requirements**:
- Test all navigation flows
- Test responsive layouts (mobile, tablet, desktop)
- Verify design system consistency
- Add loading skeletons
- Add error boundaries
- Test form submissions
- Verify RLS policies work correctly

**Acceptance Criteria**:
- ✅ All pages tested
- ✅ Responsive on all devices
- ✅ Design systems consistent
- ✅ No console errors
- ✅ Forms submit correctly

---

## Summary

**Total Prompts**: 14
**Estimated Time**: 20-30 hours
**Design Systems**: 2 (22C-CORP, 22C-SPORT)
**Dashboard Pages**: 13 total (7 byeNU, 6 ENUW)
**Database Tables**: 9 tables

**Key Deliverables**:
1. ✅ byeNU Client Dashboard (22C-CORP aesthetic)
2. ✅ ENUW Key Master Dashboard (22C-SPORT aesthetic)
3. ✅ Supabase schema with RLS
4. ✅ API integration layer
5. ✅ Complete routing setup

**Next Steps After Completion**:
- Connect to real Supabase instance
- Implement AI6 scoring algorithm
- Add charting library (Recharts/Chart.js)
- Set up real-time subscriptions
- Add authentication guards
- Implement form validation
- Add analytics tracking

---

*Built by McKeyra Peter. ENUW. The future is educated.*
