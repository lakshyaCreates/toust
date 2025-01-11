"use client";

import { PlusIcon } from "lucide-react";

import { useAddWebsite } from "../hooks/use-add-website";
import { Button } from "@workspace/ui/components/button";

import { AddWebsiteDialog } from "./add-website-dialog";

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
