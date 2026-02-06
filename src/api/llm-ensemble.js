/**
 * LLM Ensemble API
 * Merges multiple LLMs to make decisions together using consensus/voting
 */

/**
 * Call multiple LLMs and get consensus
 */
export async function getEnsembleDecision({ prompt, question, options = [] }) {
  // Define LLM models to use
  const models = [
    { name: 'gpt-4', provider: 'openai', weight: 1.0 },
    { name: 'claude-3', provider: 'anthropic', weight: 1.0 },
    { name: 'gemini-pro', provider: 'google', weight: 0.9 },
  ];

  // Call each LLM in parallel
  const responses = await Promise.all(
    models.map(async (model) => {
      try {
        const response = await callLLM({
          prompt: buildEnsemblePrompt(prompt, question, options),
          model: model.name,
          provider: model.provider,
        });
        return {
          model: model.name,
          provider: model.provider,
          weight: model.weight,
          response: parseLLMResponse(response),
          raw: response,
        };
      } catch (error) {
        console.error(`Error calling ${model.name}:`, error);
        return null;
      }
    })
  );

  // Filter out failed calls
  const validResponses = responses.filter(Boolean);

  if (validResponses.length === 0) {
    throw new Error('All LLM calls failed');
  }

  // Calculate consensus
  const consensus = calculateConsensus(validResponses, options);

  return {
    decision: consensus.winner,
    confidence: consensus.confidence,
    breakdown: consensus.breakdown,
    individualResponses: validResponses,
    agreement: consensus.agreement,
  };
}

/**
 * Build prompt for ensemble decision-making
 */
function buildEnsemblePrompt(context, question, options) {
  return `You are an expert decision-making assistant. Based on the following context, answer the question and provide reasoning.

Context:
${context}

Question: ${question}

${options.length > 0 ? `Options:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}` : ''}

Provide:
1. Your answer/decision
2. Brief reasoning (2-3 sentences)
3. Confidence level (0-1)

Format your response as JSON:
{
  "decision": "your answer",
  "reasoning": "your reasoning",
  "confidence": 0.85
}`;
}

/**
 * Parse LLM response
 */
function parseLLMResponse(response) {
  try {
    // Try to parse as JSON first
    if (typeof response === 'string') {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    return typeof response === 'object' ? response : { decision: response, confidence: 0.7 };
  } catch (error) {
    return { decision: response, confidence: 0.5 };
  }
}

/**
 * Calculate consensus from multiple LLM responses
 */
function calculateConsensus(responses, options = []) {
  // If options provided, use voting
  if (options.length > 0) {
    const votes = {};
    let totalWeight = 0;

    responses.forEach((r) => {
      const decision = r.response.decision?.toLowerCase() || '';
      const matchedOption = options.find(
        (opt) => decision.includes(opt.toLowerCase()) || opt.toLowerCase().includes(decision)
      );
      const key = matchedOption || decision;
      
      if (!votes[key]) {
        votes[key] = { count: 0, weight: 0, confidence: 0 };
      }
      votes[key].count++;
      votes[key].weight += r.weight;
      votes[key].confidence += r.response.confidence || 0.7;
      totalWeight += r.weight;
    });

    // Find winner (highest weighted vote)
    const winner = Object.entries(votes).reduce((a, b) =>
      a[1].weight > b[1].weight ? a : b
    );

    const confidence = winner[1].weight / totalWeight;
    const agreement = winner[1].count / responses.length;

    return {
      winner: winner[0],
      confidence,
      agreement,
      breakdown: votes,
    };
  }

  // If no options, find most common decision
  const decisions = responses.map((r) => r.response.decision || '');
  const decisionCounts = {};
  decisions.forEach((d) => {
    decisionCounts[d] = (decisionCounts[d] || 0) + 1;
  });

  const winner = Object.entries(decisionCounts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  const avgConfidence =
    responses.reduce((sum, r) => sum + (r.response.confidence || 0.7), 0) / responses.length;

  return {
    winner: winner[0],
    confidence: avgConfidence,
    agreement: winner[1] / responses.length,
    breakdown: decisionCounts,
  };
}

/**
 * Call LLM (placeholder - replace with actual implementation)
 */
async function callLLM({ prompt, model, provider }) {
  // TODO: Implement actual LLM API calls
  // This would integrate with OpenAI, Anthropic, Google APIs
  
  // Mock response for development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        decision: `Mock decision from ${model}`,
        reasoning: `Based on the context provided, ${model} recommends...`,
        confidence: 0.75 + Math.random() * 0.2,
      });
    }, 500);
  });
}

/**
 * Get ensemble recommendation for business decisions
 */
export async function getBusinessRecommendation({ wizardData, question, options }) {
  const context = `
Business: ${wizardData.businessName || 'Unknown'}
Industry: ${wizardData.industry || 'General'}
Goals: ${Array.isArray(wizardData.goals) ? wizardData.goals.join(', ') : wizardData.goals || 'N/A'}
Audience: ${wizardData.audience || 'General audience'}
Tone: ${Array.isArray(wizardData.tone) ? wizardData.tone.join(', ') : wizardData.tone || 'Professional'}
  `.trim();

  return await getEnsembleDecision({
    prompt: context,
    question,
    options,
  });
}
