import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth/AuthContext.jsx'
import Home from './pages/Home.jsx'
import WizardSelector from './pages/WizardSelector.jsx'
import QuickWizard from './pages/wizard/QuickWizard.jsx'
import FullWizard from './pages/wizard/FullWizard.jsx'
import FormWizard from './pages/wizard/FormWizard.jsx'
import AIWizard from './pages/wizard/AIWizard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Claim from './pages/Claim.jsx'
import ClaimSuccess from './pages/ClaimSuccess.jsx'
import WizardSuccess from './pages/WizardSuccess.jsx'
import Builder from './pages/Builder.jsx'
import Site from './pages/Site.jsx'
import CommandCenter from './pages/CommandCenter.jsx'
import Pipeline from './pages/Pipeline.jsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        
        {/* Customer Routes */}
        <Route path="/wizard-selector" element={<WizardSelector />} />
        <Route path="/wizard/quick" element={<QuickWizard />} />
        <Route path="/wizard/full" element={<FullWizard />} />
        <Route path="/wizard/form" element={<FormWizard />} />
        <Route path="/wizard/ai" element={<AIWizard />} />
        <Route path="/wizard/success" element={<WizardSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
