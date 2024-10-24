import { NextRequest, NextResponse } from "next/server";

import crypto from "crypto";

import { signIn } from "@/auth";
import db from "@/prisma";

const isError = (error: unknown): error is Error => {
    return error instanceof Error;
};

type EventName =
    | "order_created"
    | "order_refunded"
    | "subscription_created"
    | "subscription_cancelled"
    | "subscription_resumed"
    | "subscription_expired"
    | "subscription_paused"
    | "subscription_unpaused"
    | "subscription_payment_failed"
    | "subscription_payment_success"
    | "subscription_payment_recovered";

type Payload = {
    meta: {
        test_mode: boolean;
        event_name: EventName;
    };
    // Possibly not accurate: it's missing the relationships field and any custom data you add
    data: {
        type: string;
        id: string;
        attributes: {
            store_id?: string | number;
            customer_id?: string | number;
            user_name?: string;
            user_email?: string;
            order_number?: number | string;
            identifier?: string;
            currency?: string;
            first_order_item?: {
                product_name?: string;
            };
        };
    };
};

export async function POST(request: NextRequest) {
    try {
        const text = await request.text();
        const hmac = crypto.createHmac(
            "sha256",
            process.env["LEMON_SQUEEZY_WEBHOOK_SECRET"] || "",
        );
        const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
        const signature = Buffer.from(
            request.headers.get("x-signature") as string,
            "utf8",
        );

        if (!crypto.timingSafeEqual(digest, signature)) {
            return new Response("Invalid signature.", {
                status: 400,
            });
        }

        const payload = JSON.parse(text);

        const {
            meta: { event_name: eventName },
            data: subscription,
        } = payload as Payload;

        switch (eventName) {
            case "order_created":
                console.log("Order created");

                const email = subscription.attributes.user_email;
                const name = subscription.attributes.user_name;
                const product_name =
                    subscription.attributes.first_order_item?.product_name;
                const product =
                    product_name === "Appetizer" ? "APPETIZER" : "MAIN_COURSE";

                if (!email) {
                    throw new Error("Email not found in the webhook data");
                }

                const existingUser = await db.user.findUnique({
                    select: {
                        plan: true,
                    },
                    where: {
                        email,
                    },
                });

                if (!existingUser) {
                    try {
                        await db.user.create({
                            data: {
                                email,
                                name,
                                plan: product,
                            },
                        });

                        console.log("User created successfully!");
                    } catch (error) {
                        console.error("Error creating user in the database!");
                    } finally {
                        await signIn("resend", {
                            email,
                            redirect: false,
                        });

                        console.log("Signin email sent!");
                    }
                }

                if (existingUser) {
                    if (
                        existingUser.plan === "APPETIZER" &&
                        product === "MAIN_COURSE"
                    ) {
                        try {
                            await db.user.update({
                                where: {
                                    email,
                                },
                                data: {
                                    plan: product,
                                },
                            });

                            console.log("Plan upgraded successfully");
                        } catch (error) {
                            return NextResponse.json({
                                error: "Error upgrading plan!",
                            });
                        }
                    } else {
                        console.error("Invalid request: plan already exists");
                    }
                }

                break;
            default:
                throw new Error(`🤷‍♀️ Unhandled event: ${eventName}`);
        }
    } catch (error: unknown) {
        if (isError(error)) {
            return new Response(`Webhook error: ${error.message}`, {
                status: 400,
            });
        }

        return new Response("Webhook error", {
            status: 400,
        });
    }

    return new Response(null, {
        status: 200,
    });
}
