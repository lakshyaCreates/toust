import { NextRequest, NextResponse } from "next/server";

import { rzp } from "@/helpers/razorpay";

export async function POST(req: NextRequest) {
    const { amount, note } = await req.json();

    const order = await rzp.orders.create({
        amount,
        currency: "INR",
        notes: {
            plan: note.plan_name,
        },
        partial_payment: false,
    });

    return NextResponse.json({
        success: true,
        message: {
            text: "API is working...",
        },
        order: order,
    });
}
