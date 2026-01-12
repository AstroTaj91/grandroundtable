
import { NextRequest, NextResponse } from "next/server";
import { analyzeIdea } from "@/lib/openai";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { analysisId, sessionId } = await req.json();
    
    // 1. Verify Payment
    if (sessionId !== 'skip') {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== 'paid') {
            return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
        }
    }
    
    // 2. Get Draft Content
    const draft = await db.getAnalysis(analysisId);
    if (!draft || !draft.content) {
        return NextResponse.json({ error: "Analysis draft not found" }, { status: 404 });
    }
    
    // 3. Run OpenAI
    const result = await analyzeIdea(draft.content);
    
    // 4. Update DB
    const updatedRecord = await db.updateAnalysis(analysisId, {
        ...result,
        status: 'completed'
    });
    
    return NextResponse.json(updatedRecord);
    
  } catch (error) {
    console.error("Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
  }
}
