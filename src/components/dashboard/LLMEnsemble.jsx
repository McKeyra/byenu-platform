import React, { useState } from 'react'
import { getEnsembleDecision, getBusinessRecommendation } from '../../api/llm-ensemble.js'
import { C } from '../../theme/constants.js'
import { Sparkles, Brain, Zap, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const css = `
  .ensemble-container {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 32px;
  }
  .ensemble-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .ensemble-title {
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 600;
    color: ${C.charcoal};
  }
  .ensemble-models {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .model-card {
    flex: 1;
    min-width: 120px;
    padding: 16px;
    border: 1.5px solid ${C.border};
    border-radius: 12px;
    background: ${C.cream};
    text-align: center;
    transition: all 0.2s;
  }
  .model-card.active {
    border-color: ${C.mint};
    background: ${C.mintGlow};
  }
  .model-name {
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 4px;
  }
  .model-status {
    font-size: 12px;
    color: ${C.gray};
  }
  .model-status.thinking {
    color: ${C.gold};
  }
  .model-status.complete {
    color: ${C.success};
  }
  .consensus-result {
    background: ${C.cream};
    border: 1px solid ${C.border};
    border-radius: 16px;
    padding: 24px;
    margin-top: 24px;
  }
  .consensus-decision {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 12px;
  }
  .consensus-confidence {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  .confidence-bar {
    flex: 1;
    height: 8px;
    background: ${C.border};
    border-radius: 4px;
    overflow: hidden;
  }
  .confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, ${C.mint}, ${C.mintLight});
    transition: width 0.3s;
  }
  .breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid ${C.border};
  }
  .breakdown-item:last-child {
    border-bottom: none;
  }
`

export default function LLMEnsemble({ question, context, options = [], wizardData = null }) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [modelStatuses, setModelStatuses] = useState({})

  const models = [
    { name: 'GPT-4', provider: 'openai', icon: Zap },
    { name: 'Claude-3', provider: 'anthropic', icon: Brain },
    { name: 'Gemini', provider: 'google', icon: Sparkles },
  ]

  const handleGetDecision = async () => {
    setIsLoading(true)
    setModelStatuses({
      'GPT-4': 'thinking',
      'Claude-3': 'thinking',
      'Gemini': 'thinking',
    })

    try {
      let decision
      if (wizardData) {
        decision = await getBusinessRecommendation({
          wizardData,
          question,
          options,
        })
      } else {
        decision = await getEnsembleDecision({
          prompt: context,
          question,
          options,
        })
      }

      setResult(decision)
      setModelStatuses({
        'GPT-4': 'complete',
        'Claude-3': 'complete',
        'Gemini': 'complete',
      })
    } catch (error) {
      console.error('Ensemble decision failed:', error)
      setModelStatuses({
        'GPT-4': 'error',
        'Claude-3': 'error',
        'Gemini': 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <style>{css}</style>
      <div className="ensemble-container">
        <div className="ensemble-header">
          <Sparkles size={24} style={{ color: C.mint }} />
          <h3 className="ensemble-title">Multi-LLM Consensus</h3>
        </div>

        <div className="ensemble-models">
          {models.map((model) => {
            const Icon = model.icon
            const status = modelStatuses[model.name] || 'idle'
            return (
              <div key={model.name} className={`model-card ${status === 'complete' ? 'active' : ''}`}>
                <Icon size={20} style={{ margin: '0 auto 8px', color: C.mint }} />
                <div className="model-name">{model.name}</div>
                <div className={`model-status ${status}`}>
                  {status === 'idle' && 'Ready'}
                  {status === 'thinking' && 'Thinking...'}
                  {status === 'complete' && 'Complete'}
                  {status === 'error' && 'Error'}
                </div>
              </div>
            )
          })}
        </div>

        {!result && (
          <button
            onClick={handleGetDecision}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px 28px',
              background: C.mint,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '15px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Getting Consensus...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Get Ensemble Decision
              </>
            )}
          </button>
        )}

        {result && (
          <div className="consensus-result">
            <div className="consensus-decision">{result.decision}</div>
            
            <div className="consensus-confidence">
              <span style={{ fontSize: '13px', color: C.gray }}>Confidence:</span>
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: C.charcoal }}>
                {Math.round(result.confidence * 100)}%
              </span>
            </div>

            {result.agreement && (
              <div style={{ fontSize: '13px', color: C.gray, marginBottom: '16px' }}>
                Agreement: {Math.round(result.agreement * 100)}% of models agree
              </div>
            )}

            {result.breakdown && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: C.charcoal, marginBottom: '12px' }}>
                  Model Breakdown:
                </div>
                {Object.entries(result.breakdown).map(([option, data]) => (
                  <div key={option} className="breakdown-item">
                    <span style={{ fontSize: '13px', color: C.gray }}>{option}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: C.charcoal }}>
                      {typeof data === 'object' ? `${data.count} votes` : data}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {result.individualResponses && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: C.charcoal, marginBottom: '12px' }}>
                  Individual Responses:
                </div>
                {result.individualResponses.map((response, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      background: C.cream,
                      borderRadius: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, color: C.mint, marginBottom: '4px' }}>
                      {response.model}
                    </div>
                    <div style={{ fontSize: '13px', color: C.charcoal }}>
                      {response.response.decision || response.response}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
