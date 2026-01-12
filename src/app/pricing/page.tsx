"use client";

import { Navbar } from "@/components/ui/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function PricingContent() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    if (!analysisId) {
        alert("Please start an analysis first!");
        router.push("/upload");
        return;
    }
    
    setIsLoading(true);
    try {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ analysisId })
        });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
             alert("Checkout failed");
        }
    } catch (e) {
        console.error(e);
        alert("Payment Error");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Header Content */}
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Validation that pays for itself.
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Stop wasting months building products nobody wants. Get brutal, honest feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Pay Per Use */}
          <div className="relative group rounded-3xl bg-white dark:bg-card-dark border border-gray-200 dark:border-white/10 p-8 shadow-xl hover:shadow-neon transition-all duration-300">
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
             
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pay-Per-Analysis</h3>
             <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">$19</span>
                <span className="text-gray-500">/ report</span>
             </div>
             
             <ul className="space-y-4 mb-8 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    Full 6-Persona Council
                </li>
             </ul>
             
             <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-transform disabled:opacity-50"
             >
                {isLoading ? "Loading..." : "Validate One Idea"}
             </button>
          </div>
          
           {/* Subscription (Placeholder) */}
           <div className="relative group rounded-3xl bg-card-dark border-2 border-primary/50 p-8 shadow-neon-strong transform scale-105 z-10 opacity-70 cursor-not-allowed">
              <h3 className="text-xl font-bold text-white mb-2">Pro Validator</h3>
              <p className="text-sm text-gray-400">Coming Soon</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PricingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PricingContent />
        </Suspense>
    );
}
