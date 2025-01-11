"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "@workspace/db";

export async function getToastsByWebsite(websiteId: string) {
    cacheTag("toasts", `toasts-${websiteId}`);

    return await db.toast.findMany({
        where: {
            websiteId,
        },
    });
}
