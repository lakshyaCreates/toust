import { NextRequest, NextResponse } from "next/server";

import {
    createCheckout,
    lemonSqueezySetup,
    NewCheckout,
} from "@lemonsqueezy/lemonsqueezy.js";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        lemonSqueezySetup({
            apiKey: process.env.LEMON_SQUEEZY_API_KEY!,
            onError: (error) => {
                throw new Error(`Lemon Squeezy API Error: ${error.message}`);
            },
        });

        console.log("Lemon Squeezy setup successful!");
    } catch (error) {
        return NextResponse.json({ error: "Error setting up lemon squeezy!" });
    }
    const { plan } = await req.json();

    if (!plan) {
        return NextResponse.json({ error: "Plan not found!" });
    }

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID!;
    const variantId =
        plan === "APPETIZER"
            ? process.env.APPETIZER_VARIANT_ID!
            : process.env.MAIN_COURSE_VARIANT_ID!;

    if (!storeId || !variantId) {
        return {
            status: 404,
            message: "Product Credentials not found!",
        };
    }

    const options: NewCheckout = {
        productOptions: {
            redirectUrl: `${process.env.CHECKOUT_REDIRECT_URL}`,
        },
    };

    const { data, error } = await createCheckout(storeId, variantId, options);

    if (error) {
        return NextResponse.json({ error });
    }

    const url = data?.data.attributes.url;

    if (url) {
        return NextResponse.json({ url: url });
    }
}
