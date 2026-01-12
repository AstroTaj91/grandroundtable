import { NextRequest, NextResponse } from "next/server";
import { analyzeIdea } from "@/lib/openai";
import { db } from "@/lib/db";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse");
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get("text") as string;
    const file = formData.get("file") as File;
    
    let contentToAnalyze = text || "";
    
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const data = await pdf(buffer);
      contentToAnalyze = data.text;
    }
    
    if (!contentToAnalyze || contentToAnalyze.length < 50) {
        return NextResponse.json({ error: "Please provide more detail (at least 50 characters)." }, { status: 400 });
    }
    
    // Call OpenAI Service
    // This might take 30-60s. Vercel timeout is 10s on free tier. 
    // Ideally we use background jobs or streaming. 
    // For MVP, we will try to await it, but warn user it might be slow.
    const result = await analyzeIdea(contentToAnalyze);
    
    const analysisRecord = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        status: "completed" as const,
        ...result
    };
    
    // Save to DB
    await db.createAnalysis(analysisRecord);
    
    return NextResponse.json({ id: analysisRecord.id });
    
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Failed to process analysis" }, { status: 500 });
  }
}
