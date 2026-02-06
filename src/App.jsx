import React from 'react'
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
import Wizard2 from './pages/wizard/Wizard2.jsx'
import FullWizard from './pages/wizard/FullWizard.jsx'
import FormWizard from './pages/wizard/FormWizard.jsx'
import AIWizard from './pages/wizard/AIWizard.jsx'
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

function App() {
  return (
    <AuthProvider>
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
        
        {/* Build Routes (Full-screen, no nav/footer) - Shared State */}
        <Route path="/build" element={
          <BuildProvider>
            <Wizard2 />
          </BuildProvider>
        } />
        <Route path="/build/chat" element={
          <BuildProvider>
            <AIWizard />
          </BuildProvider>
        } />
        <Route path="/build/form" element={
          <BuildProvider>
            <FormWizard />
          </BuildProvider>
        } />
        
        {/* Customer Routes */}
        <Route path="/wizard-selector" element={<WizardSelector />} />
        <Route path="/wizard/quick" element={<Wizard2 />} />
        <Route path="/wizard/quick-old" element={<QuickWizard />} />
        <Route path="/wizard/full" element={<FullWizard />} />
        <Route path="/wizard/form" element={<FormWizard />} />
        <Route path="/wizard/ai" element={<AIWizard />} />
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
      </Routes>
    </AuthProvider>
  )
}

export default App
