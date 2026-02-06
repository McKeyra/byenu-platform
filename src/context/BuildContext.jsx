import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BuildContext = createContext(null)

export function BuildProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [currentStage, setCurrentStage] = useState(0)
  const [mode, setMode] = useState('wizard') // 'wizard' | 'chat' | 'form'
  const navigate = useNavigate()
  const location = useLocation()

  // Determine mode from route
  useEffect(() => {
    if (location.pathname === '/build/chat') {
      setMode('chat')
    } else if (location.pathname === '/build/form') {
      setMode('form')
    } else if (location.pathname === '/build') {
      setMode('wizard')
    }
  }, [location.pathname])

  // Load state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('buildState')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setAnswers(parsed.answers || {})
        setCurrentStage(parsed.currentStage || 0)
      } catch (e) {
        console.error('Error loading build state:', e)
      }
    }
  }, [])

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('buildState', JSON.stringify({
      answers,
      currentStage,
      mode,
    }))
  }, [answers, currentStage, mode])

  const setAnswer = (stageId, value) => {
    setAnswers(prev => ({
      ...prev,
      [stageId]: value,
    }))
  }

  const updateAnswers = (updates) => {
    setAnswers(prev => ({
      ...prev,
      ...updates,
    }))
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    // Navigate to the appropriate route
    if (newMode === 'wizard') {
      navigate('/build')
    } else if (newMode === 'chat') {
      navigate('/build/chat')
    } else if (newMode === 'form') {
      navigate('/build/form')
    }
  }

  // Calculate progress
  const progress = Object.keys(answers).length > 0 
    ? Math.round((Object.keys(answers).filter(key => answers[key] !== null && answers[key] !== undefined && answers[key] !== '').length / 8) * 100)
    : 0

  // Check if complete (all 8 stages answered)
  const isComplete = Object.keys(answers).length >= 8 && 
    Object.values(answers).every(val => 
      val !== null && val !== undefined && val !== '' && 
      (Array.isArray(val) ? val.length > 0 : true)
    )

  const value = {
    answers,
    currentStage,
    mode,
    setAnswer,
    updateAnswers,
    setStage: setCurrentStage,
    setMode: switchMode,
    progress,
    isComplete,
    // Helper to get answer for a stage
    getAnswer: (stageId) => answers[stageId],
    // Helper to check if stage is answered
    isStageAnswered: (stageId) => {
      const answer = answers[stageId]
      return answer !== null && answer !== undefined && answer !== '' &&
        (Array.isArray(answer) ? answer.length > 0 : true)
    },
    // Reset all answers
    reset: () => {
      setAnswers({})
      setCurrentStage(0)
      sessionStorage.removeItem('buildState')
    },
  }

  return (
    <BuildContext.Provider value={value}>
      {children}
    </BuildContext.Provider>
  )
}

export function useBuild() {
  const context = useContext(BuildContext)
  if (!context) {
    throw new Error('useBuild must be used within BuildProvider')
  }
  return context
}
