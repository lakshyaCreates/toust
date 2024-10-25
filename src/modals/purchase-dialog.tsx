"use client";

import { useTransition } from "react";

import { Plan } from "@prisma/client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { UserOnboardForm } from "@/forms/user-onboard-form";
import { usePurchase } from "@/hooks/purchase";

export const PurchaseDialog = () => {
    const { isOpen, close, plan } = usePurchase();

    const [isPending, startTransition] = useTransition();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="w-96">
                <DialogHeader>
                    <DialogTitle>Purchase - {plan}</DialogTitle>
                    <DialogDescription>
                        Enter your details below to proceed with the payment
                    </DialogDescription>
                </DialogHeader>
                <UserOnboardForm />
            </DialogContent>
        </Dialog>
    );
};
