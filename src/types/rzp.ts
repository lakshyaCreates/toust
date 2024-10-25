export interface OrderData {}

export interface PaymentOptions {}

export interface PaymentResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
