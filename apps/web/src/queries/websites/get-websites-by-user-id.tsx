"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "@workspace/db";

export async function getWebsitesByUserId(userId: string) {
    cacheTag("websites", `websites-${userId}`);

    return await db.website.findMany({
        where: {
            userId,
        },
    });
}
