import Razorpay from "razorpay";

if (!process.env.NEXT_PUBLIC_RAZORPAY_API_KEY) {
    throw new Error("Razorpay API Key not found!");
}

export const rzp = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET!,
});
