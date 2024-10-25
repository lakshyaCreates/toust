"use server";

import { Plan } from "@prisma/client";
import axios from "axios";
import Razorpay from "razorpay";

interface Data {
    name: string;
    email: string;
    plan: Exclude<Plan, "GUEST">;
}

interface OrderData {
    amount: number;
    id: string;
    notes?: {
        email?: string;
        name?: string;
        plan?: string;
    };
    status?: "created" | "paid";
}

interface PaymentOptions {
    key_id: string;
    amount: OrderData["amount"];
    currency: string;
    name: string;
    description: string;
    order_id: OrderData["id"];
    callback_url: string;

    handler: (response: any) => void;
}

export async function initiateOrder(data: Data) {
    // const { name, email, plan } = data;
    const createOrderUrl = `${process.env.BASE_URL!}/api/rzp/orders/create`;

    const createOrderRes = await axios.post(createOrderUrl, {
        ...data,
    });

    if (!createOrderRes.data || !createOrderRes.data.order) {
        console.error("Order creation failed!");
        return;
    }

    const order: OrderData = createOrderRes.data.order;

    if (order) {
        return {
            order,
        };
    }

    // const paymentOptions: PaymentOptions = {
    //     key_id: process.env.RAZORPAY_API_KEY!,
    //     amount: order.amount,
    //     order_id: order.id,
    //     currency: "INR",
    //     name: data.plan,
    //     description: `Payment for purchasing ${data.plan} plan`,
    //     callback_url: `/payment-success?order_id=${order.id}`,

    //     handler: async (response) => {
    //         console.log("Payment Data Response: ", response);
    //     },
    // };

    // return {
    //     openWindow: true,
    //     paymentOptions,
    // };
    // const response = await axios.post(`${}`)
}
