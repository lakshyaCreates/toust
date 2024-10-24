import { PricingButton } from "@/components/pricing-button";

import { currentUser } from "@/helpers/current-user";

export default async function HomePage() {
    const user = await currentUser();

    return (
        <div className="flex h-screen items-center justify-center">
            {user?.name}
            <div className="flex items-center gap-x-2">
                <PricingButton plan="APPETIZER" currentPlan={user?.plan!} />
                <PricingButton plan="MAIN_COURSE" currentPlan={user?.plan!} />
            </div>
        </div>
    );
}
