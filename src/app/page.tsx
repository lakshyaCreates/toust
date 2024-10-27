import Script from "next/script";

import { PricingCard } from "@/components/pricing-card";

import { currentUser } from "@/helpers/current-user";

export default async function HomePage() {
    const user = await currentUser();

    return (
        <div className="screenCenter">
            {user?.name}
            <div className="flex h-full items-center gap-x-2">
                <PricingCard plan="APPETIZER" />
                <PricingCard plan="MAIN_COURSE" />
            </div>
            {/* TODO: Implement this script in the user onboard form, so that this dynamically gets added when needed only. */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    );
}
