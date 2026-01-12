
import { NextRequest, NextResponse } from "next/server";
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
    
    // Save draft to DB
    const analysisRecord = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        status: "pending" as const,
        content: contentToAnalyze,
        score: 0,
        verdict: "Pending",
        summary: "Pending Payment",
        personas: []
    };
    
    await db.createAnalysis(analysisRecord);
    
    return NextResponse.json({ id: analysisRecord.id });
    
  } catch (error) {
    console.error("Draft Error:", error);
    return NextResponse.json({ error: "Failed to save draft" }, { status: 500 });
  }
}
