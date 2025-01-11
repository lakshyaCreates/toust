"use client";

import { useAddWebsite } from "../hooks/use-add-website";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog";

import { AddWebsiteForm } from "./add-website-form";

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
