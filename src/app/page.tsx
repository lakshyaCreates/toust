"use client";

import { useTransition } from "react";

import Script from "next/script";

import axios from "axios";
import { toast } from "sonner";

import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";

import { createOrder } from "@/actions/create-order";
import { verifyOrder } from "@/actions/verify-order";

export default function HomePage() {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="flex h-full min-h-screen flex-col items-center justify-center">
            <div className="flex gap-x-2">
                <Button
                    disabled={isPending}
                    onClick={async () => {
                        startTransition(async () => {
                            const response = await createOrder("MAIN_COURSE");

                            if (!response.success) {
                                toast.error(response.message);
                            } else if (!response.order) {
                                toast.error("Order data not found!");
                            }

                            const order = response.order;

                            const options = {
                                key_id: process.env.RAZORPAY_API_KEY!,
                                amount: order.amount,
                                currency: "INR",
                                name: "MAIN_COURSE",
                                description:
                                    "Next.js Razorpay Integration Test",
                                order_id: order.id,
                                callback_url: `/payment-success`,

                                handler: async function (response: any) {
                                    const res = await verifyOrder(response);

                                    if (res.success) {
                                        toast.success(res.message);
                                    } else {
                                        toast.error(res.message);
                                    }

                                    console.log("Payment Response: ", response);
                                },
                            };

                            const rzp = new (window as any).Razorpay(options);
                            rzp.open();
                        });
                    }}
                >
                    {isPending ? <LoadingSpinner inline /> : "Buy Course"}
                </Button>
            </div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    );
}
