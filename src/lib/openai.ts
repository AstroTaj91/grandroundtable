
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AnalysisInput {
  text: string;
}

const PERSONAS = [
  {
    id: "visionary",
    name: "The Visionary",
    role: "Product Focus",
    systemPrompt: "You are The Visionary (modeled after Steve Jobs). Focus intensely on user experience, simplicity, and 'magic'. Criticize complexity. Your goal is to see if this product will delight users. Output JSON with fields: score (0-100), strengths, concerns, recommendations."
  },
  {
    id: "investor",
    name: "The Investor",
    role: "Financial Focus",
    systemPrompt: "You are The Investor (modeled after Warren Buffett). Focus on unit economics, moats, and long-term value. Be skeptical of high burn rates. Output JSON with fields: score (0-100), strengths, concerns, recommendations."
  },
  {
    id: "strategist",
    name: "The Strategist",
    role: "Market Fit", 
    systemPrompt: "You are The Strategist. Focus on go-to-market, competition, and timing. Output JSON with fields: score (0-100), strengths, concerns, recommendations."
  },
  {
    id: "skeptic",
    name: "The Skeptic",
    role: "Risk Analysis",
    systemPrompt: "You are The Skeptic. Find every hole in the plan. Assume the worst. Output JSON with fields: score (0-100), strengths, concerns, recommendations."
  },
   {
    id: "philosopher",
    name: "The Philosopher",
    role: "Ethics & Long-term",
    systemPrompt: "You are The Philosopher (Marcus Aurelius). Focus on virtue, societal impact, and long-term consequences. Output JSON with fields: score (0-100), strengths, concerns, recommendations."
  },
  {
      id: "validator",
      name: "The Validator",
      role: "Startup Mechanics",
      systemPrompt: "You are a YC Partner. Focus on founder-market fit, distribution, and MVPs. Output JSON with fields: score (0-100), strengths, concerns, recommendations."
  }
];

export async function analyzeIdea(text: string) {
  // Parallelize the API calls
  const promises = PERSONAS.map(async (persona) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: `${persona.systemPrompt} Respond in pure JSON format.` },
            { role: "user", content: `Analyze this idea: ${text.substring(0, 10000)}` }
        ],
        model: "gpt-4o",
        response_format: { type: "json_object" },
      });
      
      const result = JSON.parse(completion.choices[0].message.content || "{}");
      return {
        ...persona,
        avatarUrl: "", // Add avatars later
        ...result
      };
    } catch (e) {
      console.error(`Error analyzing with ${persona.name}:`, e);
      return {
        ...persona,
        score: 50,
        strengths: "Analysis failed",
        concerns: "Analysis failed",
        recommendations: "Try again"
      };
    }
  });

  const results = await Promise.all(promises);
  
  // Calculate average score
  const avgScore = Math.round(results.reduce((acc, curr) => acc + (curr.score || 0), 0) / results.length);
  
  // Generate synthesis
  const synthesisCompletion = await openai.chat.completions.create({
      messages: [
          { role: "system", content: "You are the Chairman of the Board. Synthesize the feedback from these experts into a verdict (e.g., 'Highly Viable', 'Risky', 'Pivot Required') and a 2-sentence summary." },
          { role: "user", content: JSON.stringify(results) }
      ],
      model: "gpt-4o",
  });
  
  const synthesisText = synthesisCompletion.choices[0].message.content || "";
  // Simple parse for now - usually we'd structure this too
  const verdict = avgScore > 80 ? "Highly Viable" : avgScore > 60 ? "Promising" : "Risky"; 
  
  return {
      score: avgScore,
      verdict: verdict, // simple fallback or extract from text
      summary: synthesisText,
      personas: results
  };
}
