"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "@workspace/db";

export async function getWebsite(domain: string, userId: string) {
    cacheTag(`${domain}`, "website", `website-${userId}`, `website-${domain}`);

    return await db.website.findUnique({
        where: {
            domain,
            userId,
        },
    });
}
