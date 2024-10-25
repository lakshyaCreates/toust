"use server";

import { Plan } from "@prisma/client";
import axios from "axios";
import Razorpay from "razorpay";

export async function createOrder(plan: Plan) {
    const response = await axios.post(
        `${process.env.BASE_URL!}/api/razorpay/orders/create`,
        {
            amount: 4599,
            note: {
                plan_name: plan,
            },
        },
    );

    if (!response || !response.data || !response.data.order) {
        return {
            success: false,
            message: "Error creating order",
        };
    } else if (!response.data.order.id) {
        return {
            success: false,
            message: "Order Id not found",
        };
    }

    return {
        success: true,
        message: "Order created!",
        order: response.data.order,
    };

    // const options = {
    //     key_id: process.env.RAZORPAY_API_KEY!, // Replace with your Razorpay key_id
    //     amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //     currency: "INR",
    //     name: "MAIN_COURSE",
    //     description: "Next.js Razorpay Integration Test",
    //     order_id: order.id, // This is the order_id created in the backend
    //     callback_url: `${process.env.BASE_URL}/payment-success`, // Your success URL
    // };

    // const rzp = new (window as any).Razorpay(options);
    // rzp.open();
}
