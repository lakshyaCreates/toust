"use client";

import { PlusIcon } from "lucide-react";

import { AddWebsiteDialog, useAddWebsite } from ".";

import { Button } from "@/components/ui/button";

export const AddWebsiteTrigger = () => {
    const { setOpen } = useAddWebsite();

    return (
        <>
            <Button
                onClick={() => {
                    setOpen(true);
                }}
                size={"sm"}
                variant={"secondary"}
            >
                Add Website
                <PlusIcon className="-ml-1 !size-[14px]" />
            </Button>
            <AddWebsiteDialog />
        </>
    );
};
