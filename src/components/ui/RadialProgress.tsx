"use client";

import { cn } from "@/lib/utils";

interface RadialProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string; // Additional classes for positioning
}

export function RadialProgress({
  score,
  size = 48,
  strokeWidth = 4,
  color = "text-primary", // expect a text color class for the span, but here we need stroke color. Actually best to pass hex or use CSS var if possible.
  // Tailwind v4 CSS variables logic: we can use `stroke-[var(--color-primary)]` or similar if we pass classes.
  // Simplifying: pass className for color override.
  className,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Determine color class based on score or prop
  const colorClass = color === "text-primary" ? "stroke-primary" : color;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
         {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-[#20404b]"
        />
        {/* Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor" // Inherits or overridden
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out drop-shadow-[0_0_2px_currentColor]", colorClass)}
        />
      </svg>
      <span className={cn("absolute text-[10px] font-bold", className?.includes("stroke-") ? className.replace("stroke-", "text-") : "text-primary")}>
        {score}%
      </span>
    </div>
  );
}
