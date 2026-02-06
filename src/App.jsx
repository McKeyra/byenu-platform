import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth/AuthContext.jsx'
import { BuildProvider } from './context/BuildContext.jsx'
import Home from './pages/Home.jsx'
import LandingPage from './pages/marketing/LandingPage.jsx'
import FeaturesPage from './pages/marketing/FeaturesPage.jsx'
import PricingPage from './pages/marketing/PricingPage.jsx'
import ExamplesPage from './pages/marketing/ExamplesPage.jsx'
import WizardSelector from './pages/WizardSelector.jsx'
import QuickWizard from './pages/wizard/QuickWizard.jsx'
import FullWizard from './pages/wizard/FullWizard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DashboardEnhanced from './pages/DashboardEnhanced.jsx'
import Claim from './pages/Claim.jsx'
import ClaimSuccess from './pages/ClaimSuccess.jsx'
import WizardSuccess from './pages/WizardSuccess.jsx'
import Builder from './pages/Builder.jsx'
import Site from './pages/Site.jsx'
import CommandCenter from './pages/CommandCenter.jsx'
import Pipeline from './pages/Pipeline.jsx'
import Docs from './pages/Docs.jsx'
import DocPage from './pages/DocPage.jsx'
import Support from './pages/Support.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'
import PageTransition from './components/PageTransition.jsx'
import LoadingSkeleton from './components/LoadingSkeleton.jsx'

// Lazy load build routes for code splitting
const Wizard2 = lazy(() => import('./pages/wizard/Wizard2.jsx'))
const FormWizard = lazy(() => import('./pages/wizard/FormWizard.jsx'))
const AIWizard = lazy(() => import('./pages/wizard/AIWizard.jsx'))

function App() {
  return (
    <AuthProvider>
      <PageTransition>
        <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:slug" element={<DocPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        {/* Build Routes (Full-screen, no nav/footer) - Shared State - Code Split */}
        <Route path="/build" element={
          <Suspense fallback={<LoadingSkeleton />}>
            <BuildProvider>
              <Wizard2 />
            </BuildProvider>
          </Suspense>
        } />
        <Route path="/build/chat" element={
          <Suspense fallback={<LoadingSkeleton />}>
            <BuildProvider>
              <AIWizard />
            </BuildProvider>
          </Suspense>
        } />
        <Route path="/build/form" element={
          <Suspense fallback={<LoadingSkeleton />}>
            <BuildProvider>
              <FormWizard />
            </BuildProvider>
          </Suspense>
        } />
        
        {/* Customer Routes */}
        <Route path="/wizard-selector" element={<WizardSelector />} />
        <Route path="/wizard/quick" element={
          <Suspense fallback={<LoadingSkeleton />}>
            <BuildProvider>
              <Wizard2 />
            </BuildProvider>
          </Suspense>
        } />
        <Route path="/wizard/quick-old" element={<QuickWizard />} />
        <Route path="/wizard/full" element={<FullWizard />} />
        <Route path="/wizard/form" element={
          <Suspense fallback={<LoadingSkeleton />}>
            <BuildProvider>
              <FormWizard />
            </BuildProvider>
          </Suspense>
        } />
        <Route path="/wizard/ai" element={
          <Suspense fallback={<LoadingSkeleton />}>
            <BuildProvider>
              <AIWizard />
            </BuildProvider>
          </Suspense>
        } />
        <Route path="/wizard/success" element={<WizardSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/enhanced" element={<DashboardEnhanced />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/claim/success" element={<ClaimSuccess />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/site" element={<Site />} />
        
        {/* Staff Routes */}
        <Route path="/command-center" element={<CommandCenter />} />
        <Route path="/command-center/pipeline" element={<Pipeline />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AuthProvider>
  )
}

export default App
