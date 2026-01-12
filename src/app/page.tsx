import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/10 blur-[100px] pointer-events-none" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 max-w-4xl relative z-10">
          Validate Your Idea with the <br/>
          <span className="text-primary drop-shadow-[0_0_15px_rgba(0,191,255,0.5)]">Greatest Minds in History</span>
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-10 leading-relaxed relative z-10">
          Get instant, brutal, and constructive feedback from an AI board of directors including Elon Musk, Steve Jobs, Warren Buffett, and more.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <Link 
            href="/upload"
            className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-neon hover:shadow-neon-strong transition-all transform hover:scale-105"
          >
            Start Analysis
          </Link>
          <Link 
            href="/analysis"
            className="px-8 py-4 rounded-full bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-bold text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
          >
            View Demo
          </Link>
        </div>
      </main>
    </div>
  );
}
