"use client";

import { cn } from "@/lib/utils";

interface SynthesisPanelProps {
  score: number;
  verdict: string;
  summary: string;
}

export function SynthesisPanel({ score, verdict, summary }: SynthesisPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-glass-border shadow-neon bg-gradient-to-br from-gray-900/90 to-black/90 dark:from-background-dark dark:to-card-dark">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full justify-between min-h-[220px]">
        <div className="flex items-start justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Consensus Verdict</span>
          </div>
          <div className="text-white/40">
            {/* Simple icon or svg */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white tracking-tighter">{score}</span>
              <span className="text-xl font-medium text-white/50">/ 100</span>
            </div>
            <p className="text-primary font-bold text-lg mt-1">{verdict}</p>
          </div>
          
          <p className="text-gray-200 dark:text-gray-300 text-sm leading-relaxed font-medium border-t border-white/10 pt-4">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}
