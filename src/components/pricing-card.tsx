"use client";

import { Plan } from "@prisma/client";

import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { usePurchase } from "@/hooks/purchase";

export const PricingCard = ({ plan }: { plan: Exclude<Plan, "GUEST"> }) => {
    const { open } = usePurchase();

    const description =
        plan === "APPETIZER"
            ? "Start with a taste of PoopUp"
            : "Add PoopUps to all your websites, let's go!";

    return (
        <Card className="flex h-80 w-72 flex-col justify-between">
            <CardHeader>
                <CardTitle>{plan}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        open({ plan });
                    }}
                    className="w-full"
                >
                    Purchase
                </Button>
            </CardFooter>
        </Card>
    );
};
