import { NextRequest, NextResponse } from "next/server";

import crypto from "crypto";

import { PaymentResponse } from "@/types/rzp";

const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string,
) => {
    const keySecret = process.env.RAZORPAY_API_SECRET! as string;

    const sig = crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
    return sig;
};

export async function POST(request: NextRequest) {
    const {
        razorpay_order_id: orderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
    }: PaymentResponse = await request.json();

    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return {
            success: false,
            message: "Payment Verification Failed!",
        };
    }

    return NextResponse.json({
        success: true,
        message: "Payment Verified",
    });
}
