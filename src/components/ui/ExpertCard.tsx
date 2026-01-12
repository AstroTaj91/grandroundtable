"use client";

import { RadialProgress } from "./RadialProgress";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Persona {
  name: string;
  role: string;
  avatarUrl: string; // We will use placeholders if actuals aren't available
  score: number;
  strengths: string;
  concerns: string;
  recommendations: string;
}

interface ExpertCardProps {
  persona: Persona;
}

export function ExpertCard({ persona }: ExpertCardProps) {
  const [activeTab, setActiveTab] = useState<"strengths" | "concerns" | "recs">("concerns");

  // Determine color based on score (Green > 80, Orange > 50, Red < 50)
  // Actually design uses specific colors for specific personas or scores.
  // We'll stick to primary blue for high, orange/red for low.
  const scoreColor = persona.score >= 80 ? "stroke-primary text-primary" : persona.score >= 50 ? "stroke-orange-400 text-orange-400" : "stroke-red-500 text-red-500";
  const avatarBorderColor = persona.score >= 80 ? "border-primary/20" : persona.score >= 50 ? "border-orange-500/20" : "border-red-500/20";
  
  return (
    <article className="flex flex-col rounded-xl bg-white dark:bg-card-dark shadow-md border border-gray-100 dark:border-white/5 overflow-hidden group">
      <div className="p-4 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("relative w-12 h-12 rounded-full overflow-hidden border-2", avatarBorderColor)}>
             {/* Placeholder Avatar if URL is simple string, else img */}
             <div 
               className="w-full h-full bg-cover bg-center bg-gray-700"
               style={{ backgroundImage: `url(${persona.avatarUrl})` }}
             />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-base leading-tight">{persona.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{persona.role}</p>
          </div>
        </div>
        <RadialProgress score={persona.score} className={scoreColor} />
      </div>

      {/* Segmented Control */}
      <div className="px-4 py-3">
        <div className="flex w-full rounded-full bg-gray-100 dark:bg-background-dark p-1 h-8">
          <button 
            onClick={() => setActiveTab("strengths")}
            className={cn("flex-1 rounded-full text-[10px] font-medium transition-all", activeTab === "strengths" ? "bg-white dark:bg-[#20404b] text-gray-900 dark:text-white shadow-sm font-bold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white")}
          >
            Strengths
          </button>
          <button 
             onClick={() => setActiveTab("concerns")}
             className={cn("flex-1 rounded-full text-[10px] font-medium transition-all", activeTab === "concerns" ? "bg-white dark:bg-[#20404b] text-gray-900 dark:text-white shadow-sm font-bold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white")}
          >
            Concerns
          </button>
          <button 
             onClick={() => setActiveTab("recs")}
             className={cn("flex-1 rounded-full text-[10px] font-medium transition-all", activeTab === "recs" ? "bg-white dark:bg-[#20404b] text-gray-900 dark:text-white shadow-sm font-bold" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white")}
          >
            Recs
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 min-h-[80px]">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
            {activeTab === "strengths" && persona.strengths}
            {activeTab === "concerns" && persona.concerns}
            {activeTab === "recs" && persona.recommendations}
        </p>
      </div>
    </article>
  );
}
