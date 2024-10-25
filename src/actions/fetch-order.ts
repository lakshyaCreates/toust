"use server";

import { rzp } from "@/helpers/rzp";

export async function fetchOrder(orderId: string) {
    const res = await rzp.orders.fetch(orderId);

    return res;
}
