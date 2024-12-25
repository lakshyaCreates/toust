import { unstable_cacheTag as cacheTag } from "next/cache";

import db from "@/prisma";

export async function getWebsiteByUserId(userId: string) {
    "use cache";
    cacheTag("user-websites", "websites");

    return await db.website.findMany({
        where: {
            userId,
        },
    });
}
