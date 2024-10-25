import Script from "next/script";

import { PricingCard } from "@/components/pricing-card";

export default function HomePage() {
    return (
        <div className="screenCenter">
            <div className="flex h-full items-center gap-x-2">
                <PricingCard plan="APPETIZER" />
                <PricingCard plan="MAIN_COURSE" />
            </div>
            {/* TODO: Implement this script in the user onboard form, so that this dynamically gets added when needed only. */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    );
}
