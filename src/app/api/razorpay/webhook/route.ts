import { NextRequest } from "next/server";

import { createHmac, timingSafeEqual } from "crypto";
import Razorpay from "razorpay";

import { rzp } from "@/helpers/razorpay";

const { validateWebhookSignature } = Razorpay;

export async function POST(req: NextRequest) {
    const text = await req.text();
    const hmac = createHmac(
        "sha256",
        process.env["LEMON_SQUEEZY_WEBHOOK_SECRET"] || "",
    );
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(
        req.headers.get("x-signature") as string,
        "utf8",
    );

    if (timingSafeEqual(digest, signature)) {
        return new Response("Invalid signature.", {
            status: 400,
        });
    }

    const payload = JSON.parse(text);

    const {
        meta: { event_name: eventName },
        data: webhookData,
    } = payload;

    console.log(payload);
}
