"use client";

import { Navbar } from "@/components/ui/Navbar";
import { SynthesisPanel } from "@/components/ui/SynthesisPanel";
import { ExpertCard, Persona } from "@/components/ui/ExpertCard";

// Mock Data
const MOCK_PERSONAS: Persona[] = [
  {
    name: "The Visionary",
    role: "Product Focus",
    avatarUrl: "https://imagedelivery.net/hK2-10V1059-4-02_9w/d286134a-912b-4560-bf8c-1e8271017300/public", // Placeholder
    score: 92,
    strengths: "The user experience is magical. It solves a core human need with elegance.",
    concerns: "Onboarding friction is too high. You lose 40% of users before they see value.",
    recommendations: "Simplify the signup flow. Remove all optional fields until later."
  },
  {
    name: "The Investor",
    role: "Financial Focus",
    avatarUrl: "",
    score: 65,
    strengths: "Large addressable market (TAM) of $50B+. Good initial traction.",
    concerns: "Unit economics are weak. CAC is $50 but LTV is only $80. Margins are thin.",
    recommendations: "Increase pricing by 30% and focus on organic growth to lower CAC."
  },
  {
    name: "The Strategist",
    role: "Market Fit",
    avatarUrl: "",
    score: 88,
    strengths: "Clear competitive advantage in the enterprise segment.",
    concerns: "Competitor 'X' is launching a similar feature next quarter.",
    recommendations: "Lock in key partnerships now to build a defensive moat."
  },
  {
    name: "The Skeptic",
    role: "Risk Analysis",
    avatarUrl: "",
    score: 70,
    strengths: "The tech stack is robust and scalable.",
    concerns: "I'm not convinced users will pay for this repeatedly. Is it a vitamin or a painkiller?",
    recommendations: "Run a willingness-to-pay survey before building more features."
  },
   {
    name: "The Philosopher",
    role: "Ethics & Long-term",
    avatarUrl: "",
    score: 82,
    strengths: "Aligns with human flourishing and promotes connectivity.",
    concerns: "Potential for addiction if the gamification is too aggressive.",
    recommendations: "Implement 'well-being' checks to ensure healthy usage patterns."
  },
  {
      name: "The Validator",
      role: "Startup Mechanics",
      avatarUrl: "",
      score: 78,
      strengths: "Founder-market fit is strong. You know this space well.",
      concerns: "Distribution channel is unclear. 'Build it and they will come' is not a strategy.",
      recommendations: "Pick ONE channel (e.g., SEO) and master it."
  }
];

export default function AnalysisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col gap-6">
        
        {/* Top Section: Synthesis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <SynthesisPanel 
                   score={87} 
                   verdict="Highly Viable" 
                   summary="The council agrees the market fit is strong. While the monetization strategy shows promise, the 'Strategist' and 'Investor' personas flag potential scalability bottlenecks in Q4."
                />
            </div>
            
            {/* We could put something else here, or just have the panel take up width. 
                Design shows panel at top, grid below. 
                Let's make the panel full width or prominent? 
                Actually design snippet showed Synthesis Card as a section at top.
            */}
             <div className="lg:col-span-2 flex flex-col justify-center gap-4 text-gray-400 text-sm p-4 border border-white/5 rounded-xl bg-card-dark">
                 <h3 className="font-bold text-white mb-2">Key Takeaways</h3>
                 <ul className="list-disc pl-5 space-y-2">
                     <li>Strong Product-Market Fit detected by Visionary and Strategist.</li>
                     <li>Financial viability is the main risk factor (Investor score: 65%).</li>
                     <li>Recommended Action: Focus on unit economics before scaling.</li>
                 </ul>
             </div>
        </div>

        {/* Filters / Header */}
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Expert Council</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-200 dark:bg-white/5 px-2 py-1 rounded-md">
            {MOCK_PERSONAS.length} Personas
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
          {MOCK_PERSONAS.map((persona, i) => (
             <ExpertCard key={i} persona={persona} />
          ))}
          {/* Add more place holders if needed to get to 8? */}
        </div>

      </main>
      
      {/* FAB for New Analysis */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-neon-strong hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        </button>
      </div>
      
    </div>
  );
}
