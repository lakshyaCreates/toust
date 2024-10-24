"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Plan } from "@prisma/client";
import axios from "axios";

import { LoadingSpinner } from "./loading-spinner";
import { Button } from "./ui/button";

export const PricingButton = ({
    plan,
    currentPlan,
}: {
    plan: Exclude<Plan, "GUEST">;
    currentPlan: Plan;
}) => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    if (isPending) {
        return <LoadingSpinner />;
    }

    return (
        <Button
            onClick={() => {
                startTransition(async () => {
                    const response = await axios.post(
                        `/api/payment/create-checkout`,
                        {
                            plan: plan,
                        },
                    );

                    console.log(response);

                    const url = response.data.url;
                    if (url) router.push(url);
                });
            }}
            disabled={isPending || plan === currentPlan}
        >
            {plan === "APPETIZER" ? "Buy Appetizer" : "Buy Main Course"}
        </Button>
    );
};
