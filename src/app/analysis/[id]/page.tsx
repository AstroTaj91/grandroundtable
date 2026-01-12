
import { Navbar } from "@/components/ui/Navbar";
import { SynthesisPanel } from "@/components/ui/SynthesisPanel";
import { ExpertCard } from "@/components/ui/ExpertCard";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnalysisResultPage({ params }: PageProps) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  // In a server component, we can fetch directly from DB (if it was real DB).
  // With our MockDB singleton, it might be tricky in dev dev server (HMR resets state).
  // But for 'npm run start' it works.
  // We will try. If mock db is empty (due to HMR), we might show a demo or error.
  const analysis = await db.getAnalysis(id);
  
  // FALLBACK FOR DEMO: If not found, use mock data if ID is 'demo'
  if (!analysis) {
     if (id === 'demo') {
         // Return static demo data (same as previous mock)
         return <DemoAnalysisView />
     }
     // For now, if HMR cleared the DB, let's just show the Demo view with a warning, 
     // or 404. Let's show Demo view for testing ease.
     return <DemoAnalysisView isFallback />
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <SynthesisPanel 
                   score={analysis.score || 0} 
                   verdict={analysis.verdict || "Pending"} 
                   summary={analysis.summary || "Analysis in progress..."}
                />
            </div>
             <div className="lg:col-span-2 flex flex-col justify-center gap-4 text-gray-400 text-sm p-4 border border-white/5 rounded-xl bg-card-dark">
                 <h3 className="font-bold text-white mb-2">Analysis Context</h3>
                 <p>Analysis ID: {analysis.id}</p>
                 <p>Created: {new Date(analysis.createdAt).toLocaleDateString()}</p>
             </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">Expert Council</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-200 dark:bg-white/5 px-2 py-1 rounded-md">
            {(analysis.personas || []).length} Personas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
          {(analysis.personas || []).map((persona: any, i: number) => (
             <ExpertCard key={i} persona={persona} />
          ))}
        </div>
      </main>
    </div>
  );
}

function DemoAnalysisView({ isFallback = false }: { isFallback?: boolean }) {
    // Re-use the mock data from before
    const MOCK_PERSONAS = [
      {
        name: "The Visionary",
        role: "Product Focus",
        avatarUrl: "",
        score: 92,
        strengths: "The user experience is magical.",
        concerns: "Onboarding friction is too high.",
        recommendations: "Simplify the signup flow."
      },
      // ... (abbreviated for brevity, normally full list)
      {
        name: "The Investor",
        role: "Financial Focus",
        avatarUrl: "",
        score: 65,
        strengths: "Large TAM.",
        concerns: "Unit economics are weak.",
        recommendations: "Increase pricing."
      }
    ];

    return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col gap-6">
        {isFallback && (
            <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 p-4 rounded-xl text-sm mb-4">
                Note: Analysis not found (likely due to server restart clearing memory). Showing Demo View.
            </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                <SynthesisPanel 
                   score={87} 
                   verdict="Highly Viable" 
                   summary="The council agrees the market fit is strong. (DEMO DATA)"
                />
            </div>
             <div className="lg:col-span-2 flex flex-col justify-center gap-4 text-gray-400 text-sm p-4 border border-white/5 rounded-xl bg-card-dark">
                DEMO MODE
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
          {MOCK_PERSONAS.map((persona: any, i: number) => (
             <ExpertCard key={i} persona={persona} />
          ))}
        </div>
      </main>
    </div>
  );
}
