
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { analysisId } = await req.json();
    const headers = req.headers;
    const origin = headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Grand RoundTable Analysis",
              description: "Full Expert Council Report",
            },
            unit_amount: 1900, // $19.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/analysis/${analysisId}/generate?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?id=${analysisId}`,
      metadata: {
        analysisId: analysisId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
