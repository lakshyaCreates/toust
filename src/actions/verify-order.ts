"use server";

import axios from "axios";

export async function verifyOrder(response: any) {
    const res = await axios.post(
        `${process.env.BASE_URL!}/api/razorpay/orders/verify`,
        {
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
        },
    );

    if (!res || !res.data) {
        return {
            success: false,
            message: "Error verifying order",
        };
    } else if (res.data.isOk) {
        return {
            success: true,
            message: "Payment Verified",
        };
    } else if (!res.data.isOk) {
        return {
            success: false,
            message: "Payment not verified",
        };
    }

    return {
        success: true,
        message: "Payment should be verified! Not sure...",
    };
}
