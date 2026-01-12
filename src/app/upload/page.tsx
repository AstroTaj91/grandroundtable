"use client";

import { Navbar } from "@/components/ui/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"pdf" | "text">("pdf");

  const [textInput, setTextInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (mode === "pdf" && file) {
        formData.append("file", file);
      } else if (mode === "text") {
        formData.append("text", textInput);
      } else {
        alert("Please provide input");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/draft", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok && data.id) {
        // Redirect to Pricing with new Analysis ID
        router.push(`/pricing?id=${data.id}`);
      } else {
        alert("Submission failed: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Idea</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Upload your pitch deck or paste your idea text. Our council is ready.
            </p>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-2xl p-1 shadow-md mb-6 flex">
            <button
               onClick={() => setMode("pdf")}
               className={cn("flex-1 py-3 rounded-xl text-sm font-bold transition-all", mode === "pdf" ? "bg-primary text-white shadow-neon" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
            >
              Upload PDF
            </button>
            <button
               onClick={() => setMode("text")}
               className={cn("flex-1 py-3 rounded-xl text-sm font-bold transition-all", mode === "text" ? "bg-primary text-white shadow-neon" : "text-gray-500 hover:text-gray-900 dark:hover:text-white")}
            >
              Enter Text
            </button>
          </div>

          {mode === "pdf" ? (
             <div 
               className={cn("relative border-2 border-dashed rounded-2xl p-12 text-center transition-all", dragActive ? "border-primary bg-primary/5" : "border-gray-300 dark:border-white/10 hover:border-primary/50", file ? "border-solid border-primary/50 bg-primary/5" : "")}
               onDragEnter={handleDrag}
               onDragLeave={handleDrag}
               onDragOver={handleDrag}
               onDrop={handleDrop}
             >
               <input 
                 type="file" 
                 id="file-upload" 
                 className="hidden" 
                 accept=".pdf"
                 onChange={handleChange}
               />
               
               {file ? (
                 <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="h-16 w-16 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mb-4">
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{file.name}</p>
                    <p className="text-gray-500 text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-400 text-sm font-bold">Remove file</button>
                 </div>
               ) : (
                 <div className="flex flex-col items-center">
                    <div className="h-16 w-16 bg-gray-100 dark:bg-white/5 text-gray-400 rounded-xl flex items-center justify-center mb-4">
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm mb-6">PDF files up to 10MB</p>
                    <label htmlFor="file-upload" className="px-6 py-3 bg-white dark:bg-[#20404b] text-gray-900 dark:text-white font-bold rounded-full shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a4e5a] transition-colors border border-gray-200 dark:border-white/10">Select File</label>
                 </div>
               )}
             </div>
          ) : (
             <div className="relative">
                <textarea 
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full h-80 rounded-2xl bg-white dark:bg-card-dark border border-gray-200 dark:border-white/10 p-6 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-sans leading-relaxed"
                  placeholder="Describe your idea in detail. What problem are you solving? Who is the customer? How will you make money?..."
                ></textarea>
                <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                  {textInput.length} / 5000 chars
                </div>
             </div>
          )}


          <div className="mt-8 flex justify-center">
             <button
               onClick={handleSubmit}
               disabled={isLoading || (!file && !textInput)}
               className="w-full md:w-auto px-12 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-neon hover:shadow-neon-strong transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
               {isLoading ? (
                 <>
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Analyzing...
                 </>
               ) : (
                 <>
                   <span className="material-symbols-outlined">auto_awesome</span>
                   Start Analysis
                 </>
               )}
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}

