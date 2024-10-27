"use client";

import { useTransition } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { AddWebsiteForm } from "@/forms/add-website-form";
import { UserOnboardForm } from "@/forms/user-onboard-form";
import { useAddWebsite } from "@/hooks/add-website";

export const AddWebsiteDialog = () => {
    const { isOpen, close } = useAddWebsite();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="w-96">
                <DialogHeader>
                    <DialogTitle>Add Website</DialogTitle>
                    <DialogDescription>
                        Enter your details below to proceed with the payment
                    </DialogDescription>
                </DialogHeader>
                <AddWebsiteForm />
            </DialogContent>
        </Dialog>
    );
};
