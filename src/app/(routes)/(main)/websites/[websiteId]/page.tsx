import { PlusIcon } from "lucide-react";
import React from "react";
import { use } from "react";

import { revalidatePath } from "next/cache";

import { toast } from "sonner";

import { getDomain } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ToustContainer } from "./tousts-container";
import db from "@/prisma";
import { getWebsiteById } from "@/prisma/queries/get/website";

export default async function WebsitePage({
    params,
}: {
    params: { websiteId: string };
}) {
    const { websiteId } = await params;
    const website = await getWebsiteById(websiteId);

    if (!website) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                Website data not found
            </div>
        );
    }

    const tousts = await db.toust.findMany({
        where: {
            websiteId,
        },
    });

    var lastIndex: number;

    if (tousts.length === 0) {
        lastIndex = -1;
    } else {
        lastIndex = tousts.reduce(
            (max, toust) => (toust.index > max.index ? toust : max),
            tousts[0],
        ).index;
    }

    return (
        <div className="space-y-4 p-8">
            <div className="flex w-full items-center justify-between">
                <h3 className="text-3xl font-semibold tracking-tight">
                    {getDomain(website.url)}
                </h3>
                <form
                    action={async () => {
                        "use server";
                        const res = await db.toust.create({
                            data: {
                                title: "",
                                description: "",
                                time: "",
                                imageUrl: "",
                                websiteId,
                                index: lastIndex + 1,
                            },
                        });

                        if (res.id) {
                            revalidatePath(`/websites/${websiteId}`);
                        }
                    }}
                >
                    <Button type="submit">
                        <PlusIcon className="size-4" />
                    </Button>
                </form>
            </div>
            <Separator />
            <ToustContainer websiteId={website.id} />
        </div>
    );
}
