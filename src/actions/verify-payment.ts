"use server";

import axios from "axios";

import { type PaymentResponse } from "@/types/rzp";

export async function verifyPayment(data: PaymentResponse) {
    const api = `${process.env.BASE_URL!}/api/rzp/orders/create`;

    const response = await axios.post(api, data);

    if (!response || response.data.success === false) {
        return {
            success: false,
            message: "Payment Verification Failed!",
        };
    }

    return {
        success: true,
        message: "Payment Verified",
    };
}
