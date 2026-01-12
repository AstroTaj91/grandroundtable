
"use client";

import { Navbar } from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function GeneratePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying Payment...");
  const [error, setError] = useState("");
  
  const id = params?.id as string;
  // Fallback for session_id if testing without payment (demo backdoor: session_id=skip)
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!id || !sessionId) {
        setError("Invalid Request");
        return;
    }

    const runAnalysis = async () => {
        try {
            setStatus("Consulting the Expert Council...");
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ analysisId: id, sessionId })
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Generation Failed");
            }
            
            setStatus("Synthesizing Verdict...");
            // Add a small artificial delay for drama if it was too fast
            await new Promise(r => setTimeout(r, 1000));
            
            router.push(`/analysis/${id}`);
            
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An error occurred");
        }
    };

    runAnalysis();
  }, [id, sessionId, router]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        {error ? (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-8 rounded-2xl max-w-md">
                <span className="material-symbols-outlined text-4xl mb-4">error</span>
                <h2 className="text-xl font-bold mb-2">Analysis Failed</h2>
                <p>{error}</p>
                <button 
                  onClick={() => router.push("/pricing?id=" + id)}
                  className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition"
                >
                  Try Again / Pay
                </button>
            </div>
        ) : (
            <div className="flex flex-col items-center max-w-md animate-pulse">
                <div className="w-24 h-24 rounded-full border-4 border-primary border-t-transparent animate-spin mb-8" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {status}
                </h2>
                <p className="text-gray-500">
                    Our AI personas are reviewing your submission. This usually takes about 30 seconds.
                </p>
            </div>
        )}
      </main>
    </div>
  );
}
