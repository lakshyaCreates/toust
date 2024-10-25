import { NextRequest, NextResponse } from "next/server";

import { Plan } from "@prisma/client";

import { rzp } from "@/helpers/rzp";

interface OrderRequest {
    name: string;
    email: string;
    plan: Exclude<Plan, "GUEST">;
}

export async function POST(req: NextRequest) {
    const { plan, name, email }: OrderRequest = await req.json();

    try {
        const order = await rzp.orders.create({
            amount: plan === "APPETIZER" ? 469900 : 589910,
            currency: "INR",
            partial_payment: false,
            payment_capture: true,
            notes: {
                plan,
                name,
                email,
            },
        });

        return NextResponse.json({
            success: true,
            order,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error as string,
        });
    }
}
