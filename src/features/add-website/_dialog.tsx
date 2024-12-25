"use client";

import { AddWebsiteForm, useAddWebsite } from ".";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const AddWebsiteDialog = () => {
    const { open, setOpen } = useAddWebsite();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Website</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>
                <AddWebsiteForm />
            </DialogContent>
        </Dialog>
    );
};
