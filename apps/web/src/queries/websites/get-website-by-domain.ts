"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "@workspace/db";

export async function getWebsiteByDomain(domain: string) {
    cacheTag("websites", "website", `website-${domain}`);

    return await db.website.findUnique({
        where: {
            domain,
        },
    });
}
