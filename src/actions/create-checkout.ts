"use server";

import { redirect } from "next/navigation";

import {
    createCheckout as checkout,
    lemonSqueezySetup,
    NewCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";
import { Plan } from "@prisma/client";

export async function createCheckout(plan: Exclude<Plan, "GUEST">) {
    const storeId =
        plan === "APPETIZER"
            ? process.env.APPETIZER_STORE_ID
            : process.env.MAIN_COURSE_STORE_ID;

    const variantId =
        plan === "APPETIZER"
            ? process.env.APPETIZER_VARIANT_ID
            : process.env.MAIN_COURSE_VARIANT_ID;

    if (!storeId || !variantId) {
        return {
            status: 404,
            message: "Product Credentials not found!",
        };
    }

    const options: NewCheckout = {
        productOptions: {
            redirectUrl: process.env.SIGNIN_URL,
        },
        testMode: true,
    };
}
