"use client";

import { RiAddCircleLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";

import { useAddWebsite } from "@/hooks/add-website";

export const AddWebsiteButton = ({ disabled }: { disabled: boolean }) => {
    const { isOpen, open } = useAddWebsite();

    return (
        <Button
            onClick={open}
            disabled={disabled}
            className="flex items-center gap-x-2"
        >
            <span className="">Add Website</span>
            <RiAddCircleLine className="mb-0.5 size-5 text-muted" />
        </Button>
    );
};
